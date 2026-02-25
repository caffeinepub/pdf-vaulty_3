// Type declarations for jsPDF loaded via CDN global (window.jspdf)
declare namespace jspdf {
  interface jsPDFOptions {
    orientation?: 'portrait' | 'landscape' | 'p' | 'l';
    unit?: 'pt' | 'mm' | 'cm' | 'in' | 'px' | 'pc' | 'em' | 'ex';
    format?: string | [number, number];
    hotfixes?: string[];
    compress?: boolean;
  }

  class jsPDF {
    constructor(options?: jsPDFOptions);
    internal: {
      pageSize: {
        width: number;
        height: number;
        getWidth(): number;
        getHeight(): number;
      };
    };
    addPage(format?: string | [number, number], orientation?: string): jsPDF;
    addImage(
      imageData: string | HTMLImageElement | HTMLCanvasElement | Uint8Array,
      format: string,
      x: number,
      y: number,
      width: number,
      height: number,
      alias?: string,
      compression?: string,
      rotation?: number
    ): jsPDF;
    text(
      text: string | string[],
      x: number,
      y: number,
      options?: Record<string, unknown>
    ): jsPDF;
    setFontSize(size: number): jsPDF;
    setFont(fontName: string, fontStyle?: string): jsPDF;
    setFillColor(r: number, g: number, b: number): jsPDF;
    setTextColor(r: number, g: number, b: number): jsPDF;
    rect(x: number, y: number, w: number, h: number, style?: string): jsPDF;
    splitTextToSize(text: string, maxWidth: number): string[];
    save(filename?: string): jsPDF;
    output(type: string, options?: Record<string, unknown>): string | Uint8Array;
  }
}

interface Window {
  jspdf: typeof jspdf;
}
