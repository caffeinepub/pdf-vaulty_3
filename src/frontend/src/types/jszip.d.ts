// Type declarations for JSZip loaded via CDN global (window.JSZip)
declare namespace JSZipNS {
  interface JSZipObject {
    async(type: "string"): Promise<string>;
    async(type: "arraybuffer"): Promise<ArrayBuffer>;
    async(type: "uint8array"): Promise<Uint8Array>;
    async(type: "blob"): Promise<Blob>;
  }
  interface GenerateOptions {
    type: "blob" | "arraybuffer" | "uint8array" | "base64" | "nodebuffer";
    compression?: string;
    compressionOptions?: { level?: number };
    streamFiles?: boolean;
    platform?: string;
  }
  class JSZip {
    files: { [key: string]: JSZipObject };
    file(name: string): JSZipObject | null;
    file(name: string, data: Blob | Uint8Array | ArrayBuffer | string): JSZip;
    loadAsync(
      data: ArrayBuffer | Uint8Array | string | Blob,
      options?: Record<string, unknown>,
    ): Promise<JSZip>;
    generateAsync(options: GenerateOptions): Promise<Blob>;
  }
}

interface Window {
  JSZip: new () => JSZipNS.JSZip;
}
