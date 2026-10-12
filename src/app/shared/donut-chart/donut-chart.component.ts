import { Component, computed, input, signal } from '@angular/core';

export interface DonutSlice {
  key: string;
  label: string;
  value: number;
  /** CSS color for the slice */
  color: string;
}

interface Arc extends DonutSlice {
  path: string;
  percent: number;
}

const SIZE = 220;
const OUTER = 104;
const INNER = 64;

/**
 * Donut chart drawn as SVG arcs. Slices are separated by a 2px surface-colored gap;
 * hovering or focusing a slice shows its label, value, and share.
 */
@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss'
})
export class DonutChartComponent {
  readonly slices = input.required<DonutSlice[]>();
  /** Formats slice values and the total, e.g. as currency */
  readonly format = input<(value: number) => string>(v => v.toLocaleString('en-US'));
  readonly centerLabel = input('Total');
  readonly ariaLabel = input('Breakdown');

  readonly size = SIZE;
  readonly hovered = signal<string | null>(null);

  readonly total = computed(() => this.slices().reduce((sum, s) => sum + Math.max(0, s.value), 0));

  readonly arcs = computed<Arc[]>(() => {
    const total = this.total();
    if (total <= 0) return [];
    const slices = this.slices().filter(s => s.value > 0);
    let angle = -Math.PI / 2;
    return slices.map(slice => {
      const sweep = (slice.value / total) * Math.PI * 2;
      const path = slices.length === 1 ? fullRing() : arcPath(angle, angle + sweep);
      angle += sweep;
      return { ...slice, path, percent: (slice.value / total) * 100 };
    });
  });

  readonly active = computed(() => this.arcs().find(a => a.key === this.hovered()) ?? null);
}

function point(radius: number, angle: number): string {
  const c = SIZE / 2;
  return `${(c + radius * Math.cos(angle)).toFixed(3)} ${(c + radius * Math.sin(angle)).toFixed(3)}`;
}

/** Ring segment from angle a0 to a1 (radians, clockwise from 12 o'clock offset applied by caller) */
function arcPath(a0: number, a1: number): string {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return [
    `M ${point(OUTER, a0)}`,
    `A ${OUTER} ${OUTER} 0 ${large} 1 ${point(OUTER, a1)}`,
    `L ${point(INNER, a1)}`,
    `A ${INNER} ${INNER} 0 ${large} 0 ${point(INNER, a0)}`,
    'Z'
  ].join(' ');
}

/** A whole ring, for a single slice (an arc can't start and end at the same point) */
function fullRing(): string {
  const c = SIZE / 2;
  return [
    `M ${c - OUTER} ${c}`,
    `A ${OUTER} ${OUTER} 0 1 1 ${c + OUTER} ${c}`,
    `A ${OUTER} ${OUTER} 0 1 1 ${c - OUTER} ${c}`,
    `M ${c - INNER} ${c}`,
    `A ${INNER} ${INNER} 0 1 0 ${c + INNER} ${c}`,
    `A ${INNER} ${INNER} 0 1 0 ${c - INNER} ${c}`,
    'Z'
  ].join(' ');
}
