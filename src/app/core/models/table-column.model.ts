/** A column in a table whose columns the user picks (Wallet and Cards tables) */
export interface TableColumn<Id extends string = string> {
  id: Id;
  label: string;
  /** Fixed width, so a column lines up across tables; a column without one takes the remaining width */
  width?: string;
  /** Amounts are right-aligned; everything else reads left to right */
  align?: 'right';
}
