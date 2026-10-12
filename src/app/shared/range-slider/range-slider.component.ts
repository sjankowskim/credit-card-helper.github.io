import { Component, computed, input, output } from '@angular/core';

/**
 * Two-handle range slider built from two native range inputs on one track, so both
 * handles keep native keyboard and screen reader support. The handles can't cross.
 */
@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrl: './range-slider.component.scss'
})
export class RangeSliderComponent {
  readonly min = input.required<number>();
  readonly max = input.required<number>();
  readonly step = input(1);
  readonly low = input.required<number>();
  readonly high = input.required<number>();
  readonly lowLabel = input('Minimum');
  readonly highLabel = input('Maximum');
  /** Formats values for screen readers and the readout */
  readonly format = input<(value: number) => string>(v => String(v));
  readonly rangeChange = output<{ low: number; high: number }>();

  /** Filled band between the handles, as percentages of the track */
  readonly band = computed(() => {
    const span = Math.max(1, this.max() - this.min());
    return {
      left: ((this.low() - this.min()) / span) * 100,
      right: 100 - ((this.high() - this.min()) / span) * 100
    };
  });

  setLow(value: string): void {
    this.rangeChange.emit({ low: Math.min(Number(value), this.high()), high: this.high() });
  }

  setHigh(value: string): void {
    this.rangeChange.emit({ low: this.low(), high: Math.max(Number(value), this.low()) });
  }
}
