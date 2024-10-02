export interface TableColumn<T> {
  key: keyof T | "action";
  header: string | HTMLElement;
  sortable?: boolean;
  editable?: boolean;
  width?: number;
  inputType: "number" | "text" | null;
}

export interface BaseTableOptions<T> {
  columns: TableColumn<T>[];
  data: T[];
  itemsPerPage?: number;
  paginationContainer?: string;
  sortable?: boolean;
  editable?: boolean;
  deleteTable?: boolean;
  moveable?: boolean;
}

export interface PersistentTableOptions<T> extends BaseTableOptions<T> {
  persistData: true;
  persistKey: string;
}

export interface NonPersistentTableOptions<T> extends BaseTableOptions<T> {
  persistData?: false;
  persistKey?: never;
}

export type TableOptions<T> =
  | PersistentTableOptions<T>
  | NonPersistentTableOptions<T>;
