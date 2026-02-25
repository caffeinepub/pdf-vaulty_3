// Kept for reference - JSZip is no longer used; DOCX parsing uses native browser ZIP parser
declare namespace JSZipNS {
  interface JSZipObject {
    async(type: 'string'): Promise<string>;
    async(type: 'arraybuffer'): Promise<ArrayBuffer>;
    async(type: 'uint8array'): Promise<Uint8Array>;
    async(type: 'blob'): Promise<Blob>;
  }
  class JSZip {
    files: { [key: string]: JSZipObject };
    file(name: string): JSZipObject | null;
    loadAsync(
      data: ArrayBuffer | Uint8Array | string | Blob,
      options?: Record<string, unknown>
    ): Promise<JSZip>;
  }
}
