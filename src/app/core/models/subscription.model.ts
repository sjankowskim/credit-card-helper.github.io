export type CadenceUnit = 'day' | 'week' | 'month' | 'year';

/** A recurring charge, entered by the user */
export interface Subscription {
  id: string;
  name: string;
  /** Charged each time it renews */
  cost: number;
  /** Renews every `cadenceValue` `cadenceUnit`s, e.g. every 1 month or every 3 months */
  cadenceValue: number;
  cadenceUnit: CadenceUnit;
  /** ISO date of a known charge; later charges are projected from it */
  paymentDate?: string;
  /** e.g. 'Streaming' or 'Software' */
  category?: string;
  /** Paused or cancelled subscriptions stay listed but don't count toward totals */
  active: boolean;
}
