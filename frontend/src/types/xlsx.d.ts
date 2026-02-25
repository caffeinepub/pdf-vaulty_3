// Type declarations for xlsx loaded via CDN global (window.XLSX)
declare namespace XLSXLib {
  interface WorkBook {
    SheetNames: string[];
    Sheets: { [key: string]: WorkSheet };
  }
  interface WorkSheet {
    [key: string]: unknown;
  }
  interface ReadOptions {
    type?: 'base64' | 'binary' | 'buffer' | 'file' | 'array' | 'string';
    cellDates?: boolean;
    cellNF?: boolean;
    cellText?: boolean;
    defval?: unknown;
  }
  interface SheetToJsonOptions {
    header?: number | string | string[];
    defval?: unknown;
    raw?: boolean;
    range?: unknown;
    blankrows?: boolean;
  }
  function read(data: ArrayBuffer | Uint8Array | string, opts?: ReadOptions): WorkBook;
  const utils: {
    sheet_to_json<T = unknown>(worksheet: WorkSheet, opts?: SheetToJsonOptions): T[];
    sheet_to_csv(worksheet: WorkSheet, opts?: Record<string, unknown>): string;
    book_new(): WorkBook;
    book_append_sheet(workbook: WorkBook, worksheet: WorkSheet, name?: string): void;
    aoa_to_sheet<T = unknown>(data: T[][]): WorkSheet;
  };
}

interface Window {
  XLSX: typeof XLSXLib;
}
