import { Component, computed, input, signal } from '@angular/core';
import type { OfferPeriod } from '../../core/models/offer-history.model';
import { formatCurrency } from '../../core/utils/card-display.utils';
import { formatDate, parseLocalDate, today } from '../../core/utils/date.utils';

/** One offer period placed on the timeline */
interface Segment {
  period: OfferPeriod;
  index: number;
  from: Date;
  to: Date;
  /** True when the next period starts where this one ends, so the line steps without a gap */
  joinsNext: boolean;
}

interface Tick {
  value: number;
  y: number;
  label: string;
}

const WIDTH = 600;
const LEFT = 52;
const RIGHT = 12;
const PANEL_HEIGHT = 120;
const PANEL_GAP = 34;
const TOP = 22;
const BOTTOM = 26;
const PLOT_WIDTH = WIDTH - LEFT - RIGHT;
/** Top of each panel's plot area */
const BONUS_TOP = TOP;
const SPEND_TOP = TOP + PANEL_HEIGHT + PANEL_GAP;
const HEIGHT = SPEND_TOP + PANEL_HEIGHT + BOTTOM;

/**
 * Sign-up bonus history as two stacked step charts on a shared timeline: the bonus on
 * top and the spend required below (two scales, so two panels rather than a dual axis).
 * Hovering, or arrow keys while focused, shows the offer in effect.
 */
@Component({
  selector: 'app-offer-history-chart',
  templateUrl: './offer-history-chart.component.html',
  styleUrl: './offer-history-chart.component.scss'
})
export class OfferHistoryChartComponent {
  readonly periods = input.required<readonly OfferPeriod[]>();

  readonly width = WIDTH;
  readonly height = HEIGHT;
  readonly left = LEFT;
  readonly plotWidth = PLOT_WIDTH;
  readonly panelHeight = PANEL_HEIGHT;
  readonly bonusTop = BONUS_TOP;
  readonly spendTop = SPEND_TOP;
  readonly formatCurrency = formatCurrency;
  readonly formatIso = formatDate;

  /** Index of the period being inspected */
  readonly active = signal<number | null>(null);

  readonly segments = computed<Segment[]>(() => {
    const periods = this.periods();
    const now = today();
    return periods.map((period, index) => {
      const from = parseLocalDate(period.start)!;
      const next = periods[index + 1];
      const nextStart = next ? parseLocalDate(next.start)! : null;
      const end = parseLocalDate(period.end);
      const to = end ?? nextStart ?? now;
      return { period, index, from, to, joinsNext: !!nextStart && (!end || end.getTime() >= nextStart.getTime()) };
    });
  });

  private readonly domain = computed(() => {
    const segments = this.segments();
    const start = segments[0].from.getTime();
    const end = Math.max(today().getTime(), ...segments.map(s => s.to.getTime()));
    return { start, end: Math.max(end, start + 86_400_000) };
  });

  readonly currency = computed(() => this.periods()[this.periods().length - 1]?.currency ?? '');

  readonly bonusMax = computed(() => niceMax(Math.max(...this.periods().map(p => p.amount))));
  readonly spendMax = computed(() => niceMax(Math.max(...this.periods().map(p => p.spendRequired))));

  readonly bonusTicks = computed(() => this.ticks(this.bonusMax(), BONUS_TOP, v => formatCompact(v)));
  readonly spendTicks = computed(() => this.ticks(this.spendMax(), SPEND_TOP, v => '$' + formatCompact(v)));

  /** Year starts, or half-years for short histories */
  readonly timeTicks = computed(() => {
    const { start, end } = this.domain();
    const first = new Date(start);
    const spanYears = (end - start) / (365 * 86_400_000);
    const stepMonths = spanYears > 2.5 ? 12 : 6;
    const ticks: { x: number; label: string }[] = [];
    const cursor = new Date(first.getFullYear(), stepMonths === 12 ? 0 : first.getMonth() < 6 ? 0 : 6, 1);
    while (cursor.getTime() <= end) {
      if (cursor.getTime() >= start) {
        ticks.push({
          x: this.x(cursor),
          label: stepMonths === 12 ? String(cursor.getFullYear()) : cursor.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        });
      }
      cursor.setMonth(cursor.getMonth() + stepMonths);
    }
    return ticks;
  });

  readonly bonusPath = computed(() => this.stepPath(p => p.amount, this.bonusMax(), BONUS_TOP));
  readonly spendPath = computed(() => this.stepPath(p => p.spendRequired, this.spendMax(), SPEND_TOP));
  /** Area under the bonus line */
  readonly bonusArea = computed(() =>
    this.segments()
      .map(s => {
        const y = this.y(s.period.amount, this.bonusMax(), BONUS_TOP);
        const base = BONUS_TOP + PANEL_HEIGHT;
        return `M ${this.x(s.from)} ${base} V ${y} H ${this.x(s.to)} V ${base} Z`;
      })
      .join(' ')
  );

  /** Shaded bands behind elevated, limited-time offers */
  readonly elevatedBands = computed(() =>
    this.segments()
      .filter(s => s.period.elevated)
      .map(s => ({ x: this.x(s.from), width: Math.max(1, this.x(s.to) - this.x(s.from)) }))
  );

  readonly activeSegment = computed(() => {
    const i = this.active();
    return i === null ? null : (this.segments()[i] ?? null);
  });

  readonly crosshair = computed(() => {
    const s = this.activeSegment();
    if (!s) return null;
    const x = Math.min(this.x(s.to), Math.max(this.x(s.from), this.hoverX() ?? (this.x(s.from) + this.x(s.to)) / 2));
    return {
      x,
      bonusY: this.y(s.period.amount, this.bonusMax(), BONUS_TOP),
      spendY: this.y(s.period.spendRequired, this.spendMax(), SPEND_TOP),
      /** Tooltip on the side with more room */
      alignRight: x > LEFT + PLOT_WIDTH / 2
    };
  });

  /** Pointer x in chart units while hovering */
  private readonly hoverX = signal<number | null>(null);

  onPointerMove(event: PointerEvent, svg: Element): void {
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * WIDTH;
    if (x < LEFT || x > LEFT + PLOT_WIDTH) {
      this.clear();
      return;
    }
    const time = this.domain().start + ((x - LEFT) / PLOT_WIDTH) * (this.domain().end - this.domain().start);
    const segment = this.segments().find(s => time >= s.from.getTime() && time <= s.to.getTime());
    this.hoverX.set(x);
    this.active.set(segment ? segment.index : null);
  }

  clear(): void {
    this.hoverX.set(null);
    this.active.set(null);
  }

  onKeydown(event: KeyboardEvent): void {
    const count = this.segments().length;
    const current = this.active();
    let next: number | null = null;
    if (event.key === 'ArrowRight') next = current === null ? 0 : Math.min(count - 1, current + 1);
    else if (event.key === 'ArrowLeft') next = current === null ? count - 1 : Math.max(0, current - 1);
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else if (event.key === 'Escape') next = null;
    else return;
    event.preventDefault();
    this.hoverX.set(null);
    this.active.set(next);
  }

  describe(period: OfferPeriod): string {
    return `${period.amount.toLocaleString('en-US')} ${period.currency} after ${formatCurrency(period.spendRequired)} in ${period.windowMonths} months`;
  }

  /** e.g. 'Mar 2022' for month-precision dates, 'Mar 9, 2022' otherwise */
  formatStart(period: OfferPeriod): string {
    const date = parseLocalDate(period.start)!;
    return period.startPrecision === 'month'
      ? date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : formatDate(period.start);
  }

  formatEnd(segment: Segment): string {
    if (segment.period.end) return formatDate(segment.period.end);
    return segment.index === this.segments().length - 1 ? 'Present' : '';
  }

  formatDay(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  /** Readable host name for a source link */
  sourceHost(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }

  private x(date: Date): number {
    const { start, end } = this.domain();
    return LEFT + ((date.getTime() - start) / (end - start)) * PLOT_WIDTH;
  }

  private y(value: number, max: number, top: number): number {
    return top + PANEL_HEIGHT - (value / max) * PANEL_HEIGHT;
  }

  private ticks(max: number, top: number, format: (v: number) => string): Tick[] {
    return [0, 0.25, 0.5, 0.75, 1].map(f => ({ value: max * f, y: this.y(max * f, max, top), label: format(max * f) }));
  }

  /** One path: a level for each period, with steps between periods that touch and gaps where they don't */
  private stepPath(value: (p: OfferPeriod) => number, max: number, top: number): string {
    let path = '';
    let joined = false;
    for (const s of this.segments()) {
      const y = this.y(value(s.period), max, top);
      path += joined ? ` V ${y} H ${this.x(s.to)}` : ` M ${this.x(s.from)} ${y} H ${this.x(s.to)}`;
      joined = s.joinsNext;
    }
    return path.trim();
  }
}

/** Rounds up to a tidy axis maximum (1, 2, 2.5, or 5 times a power of ten), with headroom */
function niceMax(value: number): number {
  const target = value * 1.15;
  const power = 10 ** Math.floor(Math.log10(Math.max(1, target)));
  for (const step of [1, 2, 2.5, 5, 10]) {
    if (step * power >= target) return step * power;
  }
  return 10 * power;
}

/** 75000 -> '75k', 4000 -> '4k', 1500 -> '1.5k' */
function formatCompact(value: number): string {
  if (value >= 1000) return `${Number((value / 1000).toFixed(1))}k`;
  return String(Math.round(value));
}
