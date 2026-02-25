// Type declarations for pdf-lib loaded via CDN global (window.PDFLib)
declare namespace PDFLib {
  class PDFDocument {
    static create(): Promise<PDFDocument>;
    static load(
      data: ArrayBuffer | Uint8Array | string,
      options?: { ignoreEncryption?: boolean }
    ): Promise<PDFDocument>;
    addPage(page?: PDFPage | [number, number]): PDFPage;
    getPages(): PDFPage[];
    getPageCount(): number;
    getPageIndices(): number[];
    copyPages(srcDoc: PDFDocument, indices: number[]): Promise<PDFPage[]>;
    save(options?: { useObjectStreams?: boolean }): Promise<Uint8Array>;
    setTitle(title: string): void;
    setAuthor(author: string): void;
    setCreator(creator: string): void;
    setProducer(producer: string): void;
    setCreationDate(date: Date): void;
    setModificationDate(date: Date): void;
  }

  class PDFPage {
    getSize(): { width: number; height: number };
    getWidth(): number;
    getHeight(): number;
    getRotation(): { angle: number; type: string };
    setRotation(rotation: Rotation): void;
    drawText(text: string, options?: Record<string, unknown>): void;
    drawImage(image: PDFImage, options?: Record<string, unknown>): void;
    setSize(width: number, height: number): void;
  }

  class PDFImage {
    width: number;
    height: number;
    scale(factor: number): { width: number; height: number };
  }

  type Rotation = { angle: number; type: string };

  function degrees(angle: number): Rotation;
  function rgb(r: number, g: number, b: number): unknown;
  function grayscale(gray: number): unknown;

  enum StandardFonts {
    Helvetica = 'Helvetica',
    TimesRoman = 'Times-Roman',
    Courier = 'Courier',
  }
}

interface Window {
  PDFLib: typeof PDFLib;
}
