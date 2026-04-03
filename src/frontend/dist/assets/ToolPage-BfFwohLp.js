const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AddPageNumbersTool-BNEnncnE.js","assets/index-IHpCzH5x.js","assets/index-I-DkM24X.css","assets/pdfUtils-D5wj6PeM.js","assets/FileUploadZone-Ccoo04hN.js","assets/upload-DhY97ycc.js","assets/hash-DGuaTlTz.js","assets/loader-circle-CfULriSo.js","assets/circle-alert-hVkTVtCE.js","assets/circle-check-big-CmYIaIm-.js","assets/download-DgVGQUnf.js","assets/AddWatermarkTool-86ABgovu.js","assets/stamp-BaqW1Wey.js","assets/CompressPDFTool-CBNGjKwL.js","assets/usePdfWorker-CBvwThGZ.js","assets/ExcelToPDFTool-CoW5trtc.js","assets/alert-6jurCUmY.js","assets/ExtractTextTool-DhPnnT9g.js","assets/file-search-DrSxJ1Xe.js","assets/copy-CtaMaqPe.js","assets/ImageToPDFTool-CcCrVqoU.js","assets/MergePDFTool-B9NOhLs2.js","assets/PDFConverterTool-B6QH6sgV.js","assets/arrow-right-left-DGBoiC4C.js","assets/PDFToWordTool-BEyDOX8s.js","assets/PasswordProtectPDFTool-BjOae5g3.js","assets/lock-vsPyGA1_.js","assets/eye-DDtCSpes.js","assets/RotatePDFTool-DeOW6Gxn.js","assets/rotate-cw-CNyMYe90.js","assets/SplitPDFTool-BqjE49EE.js","assets/WordToPDFTool-DakPLD5A.js","assets/CropPDFTool-b3hv3BM1.js","assets/FlattenPDFTool-BDLHVGSs.js","assets/file-check-CYOW4qtD.js","assets/PDFMetadataTool-BCYfYxxR.js","assets/file-pen-Dary90HZ.js","assets/BatchCompressTool-Cg8N1nO7.js","assets/package-ownyDvuz.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, f as ue, S as Share2, X, _ as __vitePreload } from "./index-IHpCzH5x.js";
import { a as useAnalytics } from "./useAnalytics-ByOU9UHz.js";
import { A as AnimatePresence, m as motion } from "./proxy-DkM8l6H3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }],
  ["line", { x1: "12", x2: "12", y1: "7", y2: "13", key: "1cppfj" }],
  ["line", { x1: "15", x2: "9", y1: "10", y2: "10", key: "1gty7f" }]
];
const BookmarkPlus = createLucideIcon("bookmark-plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
class PDFErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    __publicField(this, "handleReset", () => {
      this.setState({ hasError: false, errorMessage: "" });
    });
    this.state = { hasError: false, errorMessage: "" };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: (error == null ? void 0 : error.message) ?? "Unknown error"
    };
  }
  componentDidCatch(error, info) {
    console.error("[PDFErrorBoundary]", error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "tool.error_state",
          className: "rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 p-6 flex flex-col items-center text-center gap-4",
          role: "alert",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6 text-red-500 dark:text-red-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-red-800 dark:text-red-200 mb-1", children: "Something went wrong processing your PDF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-600/80 dark:text-red-300/70 leading-relaxed", children: "This might be due to an unsupported file format or a corrupted PDF." }),
              this.state.errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-red-500/60 dark:text-red-400/50 font-mono break-all", children: this.state.errorMessage })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: this.handleReset,
                "data-ocid": "tool.error_state.button",
                className: "gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                  "Try again"
                ]
              }
            )
          ]
        }
      );
    }
    return this.props.children;
  }
}
const AddPageNumbersTool = reactExports.lazy(
  () => __vitePreload(() => import("./AddPageNumbersTool-BNEnncnE.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]) : void 0)
);
const AddWatermarkTool = reactExports.lazy(
  () => __vitePreload(() => import("./AddWatermarkTool-86ABgovu.js"), true ? __vite__mapDeps([11,1,2,3,4,5,12,7,8,9,10]) : void 0)
);
const CompressPDFTool = reactExports.lazy(
  () => __vitePreload(() => import("./CompressPDFTool-CBNGjKwL.js"), true ? __vite__mapDeps([13,1,2,4,5,14,3,7,8,9,10]) : void 0)
);
const ExcelToPDFTool = reactExports.lazy(() => __vitePreload(() => import("./ExcelToPDFTool-CoW5trtc.js"), true ? __vite__mapDeps([15,1,2,16,3,4,5,10]) : void 0));
const ExtractTextTool = reactExports.lazy(
  () => __vitePreload(() => import("./ExtractTextTool-DhPnnT9g.js"), true ? __vite__mapDeps([17,1,2,3,18,5,19,10]) : void 0)
);
const ImageToPDFTool = reactExports.lazy(() => __vitePreload(() => import("./ImageToPDFTool-CcCrVqoU.js"), true ? __vite__mapDeps([20,1,2,3,4,5,10]) : void 0));
const MergePDFTool = reactExports.lazy(() => __vitePreload(() => import("./MergePDFTool-B9NOhLs2.js"), true ? __vite__mapDeps([21,1,2,14,3,4,5,10]) : void 0));
const PDFConverterTool = reactExports.lazy(
  () => __vitePreload(() => import("./PDFConverterTool-B6QH6sgV.js"), true ? __vite__mapDeps([22,1,2,16,3,4,5,23,7,8,9,10]) : void 0)
);
const PDFToWordTool = reactExports.lazy(() => __vitePreload(() => import("./PDFToWordTool-BEyDOX8s.js"), true ? __vite__mapDeps([24,1,2,16,3,4,5,10]) : void 0));
const PasswordProtectPDFTool = reactExports.lazy(
  () => __vitePreload(() => import("./PasswordProtectPDFTool-BjOae5g3.js"), true ? __vite__mapDeps([25,1,2,16,3,4,5,26,27]) : void 0)
);
const RotatePDFTool = reactExports.lazy(() => __vitePreload(() => import("./RotatePDFTool-DeOW6Gxn.js"), true ? __vite__mapDeps([28,1,2,14,3,4,5,29,10]) : void 0));
const SplitPDFTool = reactExports.lazy(() => __vitePreload(() => import("./SplitPDFTool-BqjE49EE.js"), true ? __vite__mapDeps([30,1,2,3,4,5,8,10]) : void 0));
const WordToPDFTool = reactExports.lazy(() => __vitePreload(() => import("./WordToPDFTool-DakPLD5A.js"), true ? __vite__mapDeps([31,1,2,16,3,4,5,10]) : void 0));
const CropPDFTool = reactExports.lazy(() => __vitePreload(() => import("./CropPDFTool-b3hv3BM1.js"), true ? __vite__mapDeps([32,1,2,14,3,5,7]) : void 0));
const FlattenPDFTool = reactExports.lazy(() => __vitePreload(() => import("./FlattenPDFTool-BDLHVGSs.js"), true ? __vite__mapDeps([33,1,2,14,3,5,34,7]) : void 0));
const PDFMetadataTool = reactExports.lazy(
  () => __vitePreload(() => import("./PDFMetadataTool-BCYfYxxR.js"), true ? __vite__mapDeps([35,1,2,4,5,3,7,8,36,9,10]) : void 0)
);
const BatchCompressTool = reactExports.lazy(
  () => __vitePreload(() => import("./BatchCompressTool-Cg8N1nO7.js"), true ? __vite__mapDeps([37,1,2,4,5,3,7,38,8,9]) : void 0)
);
const toolMeta = {
  merge: {
    title: "Merge PDF",
    description: "Combine multiple PDF files into a single document instantly. Perfect for merging reports, contracts, and presentations without losing formatting."
  },
  split: {
    title: "Split PDF",
    description: "Extract specific pages or split a PDF into multiple separate files. Choose exactly which pages to detach or how many pages per file."
  },
  compress: {
    title: "Compress PDF",
    description: "Reduce PDF file size for faster sharing and uploading. Maintains readable quality while significantly shrinking the file."
  },
  "image-to-pdf": {
    title: "Image to PDF",
    description: "Convert JPG, PNG, and other image formats into a professional PDF document. Combine multiple images into one PDF in seconds."
  },
  "pdf-to-word": {
    title: "PDF to Word",
    description: "Convert your PDF into an editable Word document. Extracts text content so you can edit and reformat it freely."
  },
  "word-to-pdf": {
    title: "Word to PDF",
    description: "Turn Word documents into universally compatible PDF files. Preserves formatting and layout across all devices."
  },
  "excel-to-pdf": {
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets into clean, printable PDF files. Ideal for sharing data without requiring Excel on the recipient's device."
  },
  rotate: {
    title: "Rotate PDF",
    description: "Fix the orientation of PDF pages in seconds. Rotate individual pages or the entire document to portrait or landscape."
  },
  "password-protect": {
    title: "Password Protect PDF",
    description: "Add a password to your PDF to prevent unauthorized access. Keep sensitive documents secure with encryption."
  },
  "pdf-converter": {
    title: "PDF Converter",
    description: "Convert your PDF to Excel spreadsheet or export pages as JPG or PNG images. One tool, multiple output formats."
  },
  "add-page-numbers": {
    title: "Add Page Numbers",
    description: "Automatically stamp page numbers onto your PDF. Choose position (top/bottom, left/center/right) and starting number."
  },
  "add-watermark": {
    title: "Add Watermark",
    description: "Overlay custom text watermarks on your PDF pages. Mark documents as Confidential, Draft, or any text you choose."
  },
  "crop-pdf": {
    title: "Crop PDF",
    description: "Trim and adjust page margins on every page of your PDF. Remove unwanted whitespace or narrow the visible area precisely."
  },
  "flatten-pdf": {
    title: "Flatten PDF Forms",
    description: "Convert interactive form fields into static, non-editable content. Useful for archiving completed forms."
  },
  "extract-text": {
    title: "Extract PDF Text",
    description: "Extract all readable text from a PDF file. Copy it to your clipboard or download as a .txt file."
  },
  "edit-metadata": {
    title: "Edit PDF Metadata",
    description: "View and edit the embedded metadata of any PDF file — including title, author, subject, and keywords. Useful for organizing documents and improving searchability."
  },
  "batch-compress": {
    title: "Batch Compress PDF",
    description: "Compress multiple PDF files at once and download them all in a single ZIP archive. Perfect for processing large batches of documents quickly."
  }
};
const faqSchema = {
  merge: [
    {
      q: "How do I merge PDF files online?",
      a: "Upload your PDF files using the Merge PDF tool, arrange them in your preferred order, and click Download to get a single combined PDF."
    },
    {
      q: "Is there a limit to how many PDFs I can merge?",
      a: "You can merge multiple PDF files at once. For best performance, keep total file size under 50MB."
    },
    {
      q: "Will merging PDFs reduce quality?",
      a: "No. PDF Vaulty merges files without re-encoding content, so the original quality is preserved."
    }
  ],
  split: [
    {
      q: "How do I split a PDF into separate pages?",
      a: "Upload your PDF, choose which pages to extract or how to split, then download the resulting files."
    },
    {
      q: "Can I extract specific pages from a PDF?",
      a: "Yes. Use the Split PDF tool to select individual pages or page ranges to extract."
    },
    {
      q: "Does splitting a PDF change the content?",
      a: "No. Splitting only separates pages; all text, images, and formatting remain unchanged."
    }
  ],
  compress: [
    {
      q: "How much can I compress a PDF?",
      a: "Compression results vary by content, but typical PDFs can be reduced by 20–60% without noticeable quality loss."
    },
    {
      q: "Does compressing a PDF affect text quality?",
      a: "Text quality is preserved. Compression primarily reduces embedded image sizes."
    },
    {
      q: "Is the compressed PDF still readable?",
      a: "Yes. The Compress PDF tool maintains readability while shrinking the file for easier sharing."
    }
  ],
  "image-to-pdf": [
    {
      q: "Which image formats can I convert to PDF?",
      a: "PDF Vaulty supports JPG, PNG, and other common image formats."
    },
    {
      q: "Can I combine multiple images into one PDF?",
      a: "Yes. Upload multiple images and they will be combined into a single PDF document."
    },
    {
      q: "Will the image quality be preserved?",
      a: "Images are embedded at their original resolution."
    }
  ],
  "pdf-to-word": [
    {
      q: "Can I edit a PDF after converting to Word?",
      a: "Yes. Converting to Word produces an editable .docx file you can open in Microsoft Word or Google Docs."
    },
    {
      q: "Does PDF to Word conversion preserve formatting?",
      a: "Basic formatting is preserved. Complex layouts may require minor adjustments after conversion."
    },
    {
      q: "Is my PDF data safe during conversion?",
      a: "Yes. Processing happens in your browser; your files are never uploaded to external servers."
    }
  ],
  "word-to-pdf": [
    {
      q: "How do I convert a Word document to PDF?",
      a: "Upload your .docx or .doc file and click Convert. Your PDF will be ready to download instantly."
    },
    {
      q: "Does the Word to PDF converter preserve formatting?",
      a: "Yes. Fonts, images, tables, and layout are preserved in the output PDF."
    },
    {
      q: "What Word file formats are supported?",
      a: "Both .docx and .doc formats are supported."
    }
  ],
  "excel-to-pdf": [
    {
      q: "How do I convert an Excel spreadsheet to PDF?",
      a: "Upload your Excel file and click Convert. The tool generates a clean PDF preserving your data."
    },
    {
      q: "Does the Excel to PDF tool support multiple sheets?",
      a: "All sheets in the workbook are included in the output PDF."
    },
    {
      q: "Will my data be safe?",
      a: "Yes. Conversion is handled locally in your browser; data is not sent to any server."
    }
  ],
  rotate: [
    {
      q: "How do I rotate pages in a PDF?",
      a: "Upload your PDF, select the rotation angle (90°, 180°, or 270°), and download the corrected file."
    },
    {
      q: "Can I rotate individual pages or the whole document?",
      a: "You can rotate all pages at once or choose specific pages to rotate."
    },
    {
      q: "Does rotating a PDF affect its content?",
      a: "No. Only the page orientation changes; all content remains intact."
    }
  ],
  "password-protect": [
    {
      q: "How do I add a password to a PDF?",
      a: "Upload your PDF, set a password, and download the encrypted file. Anyone opening it will need to enter the password."
    },
    {
      q: "Is password-protected PDF encryption strong?",
      a: "Yes. PDF Vaulty uses standard AES PDF encryption for password protection."
    },
    {
      q: "Can I remove the password later?",
      a: "You would need the original password to unlock and remove protection from the file."
    }
  ],
  "pdf-converter": [
    {
      q: "What formats can I convert a PDF to?",
      a: "Use the PDF Converter tool to convert PDFs to Excel spreadsheets or export pages as JPG or PNG images."
    },
    {
      q: "Can I export all pages as images at once?",
      a: "Yes. The tool exports all pages as a ZIP archive of individual images."
    },
    {
      q: "Will the Excel conversion include all my PDF data?",
      a: "The tool extracts tabular data from your PDF into an Excel-compatible format."
    }
  ],
  "add-page-numbers": [
    {
      q: "How do I add page numbers to a PDF?",
      a: "Upload your PDF, choose the position and starting number, then download the numbered document."
    },
    {
      q: "Can I choose where page numbers appear?",
      a: "Yes. You can place numbers at the top or bottom, and left, center, or right of each page."
    },
    {
      q: "Does adding page numbers change the PDF layout?",
      a: "Page numbers are added as a small overlay; the rest of the content remains unchanged."
    }
  ],
  "crop-pdf": [
    {
      q: "What does cropping a PDF do?",
      a: "Cropping removes visible margins from each page by adjusting the PDF's crop box. The original content is preserved; only the visible area changes."
    },
    {
      q: "Will cropping reduce file size?",
      a: "Cropping adjusts the visible page area but does not remove underlying content, so file size remains similar."
    }
  ],
  "flatten-pdf": [
    {
      q: "What does flattening a PDF mean?",
      a: "Flattening converts all interactive form fields (text inputs, checkboxes, signatures) into static content so they can no longer be edited."
    },
    {
      q: "Is the appearance preserved after flattening?",
      a: "Yes. The visual appearance of the filled-in form is preserved exactly; only interactivity is removed."
    }
  ],
  "add-watermark": [
    {
      q: "How do I add a watermark to a PDF?",
      a: "Upload your PDF, type your watermark text (e.g. Confidential), choose size and opacity, then download."
    },
    {
      q: "Can I customize the watermark text?",
      a: "Yes. You can enter any text and adjust its size, opacity, and angle."
    },
    {
      q: "Does the watermark affect the original content?",
      a: "The watermark is overlaid on top of existing content without altering it."
    }
  ],
  "extract-text": [
    {
      q: "How do I extract text from a PDF?",
      a: "Upload your PDF to the Extract PDF Text tool. The tool reads all pages and extracts readable text, which you can copy to clipboard or download as a .txt file."
    },
    {
      q: "Does text extraction work on scanned PDFs?",
      a: "Text extraction works on PDFs with embedded text layers. Scanned image-only PDFs will not return readable text — they would require OCR software."
    }
  ],
  "edit-metadata": [
    {
      q: "What is PDF metadata?",
      a: "PDF metadata includes embedded fields like title, author, subject, and keywords. These fields help with document organization, searchability, and identification."
    },
    {
      q: "Can I edit the metadata of any PDF?",
      a: "Yes. Upload any PDF to the Edit PDF Metadata tool, modify the fields, and download the updated file. Works on most standard PDFs."
    },
    {
      q: "Does editing metadata change the PDF content?",
      a: "No. Only the metadata fields are updated; all pages, text, images, and formatting remain exactly the same."
    }
  ],
  "batch-compress": [
    {
      q: "How many PDFs can I compress at once?",
      a: "You can upload and compress up to 10 PDF files at once using the Batch Compress tool."
    },
    {
      q: "How do I download all compressed PDFs?",
      a: "After compression is complete, click the Download All as ZIP button to receive all compressed files in a single archive."
    },
    {
      q: "What if one file fails to compress?",
      a: "If a single file fails, the others continue processing. Successfully compressed files are still included in the final ZIP download."
    }
  ]
};
const SESSION_KEY = "pdfvaulty_save_prompt_shown";
const SESSION_HISTORY_KEY = "pdfvaulty_session_history";
const LARGE_FILE_THRESHOLD_MB = 10;
const toolSpinner = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) });
function ToolPage({
  toolId,
  onBack,
  isAuthenticated = false,
  onRequestLogin
}) {
  const meta = toolMeta[toolId];
  const { trackToolUse } = useAnalytics();
  const [bannerVisible, setBannerVisible] = reactExports.useState(false);
  const [_isProcessing, setIsProcessing] = reactExports.useState(false);
  const [sizeWarning, setSizeWarning] = reactExports.useState({ visible: false, sizeMb: 0 });
  const toolAreaRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    document.title = `${meta.title} – PDF Vaulty`;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "tool-jsonld";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${meta.title} – PDF Vaulty`,
      description: meta.description,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
    });
    document.head.appendChild(script);
    const faqItems = faqSchema[toolId];
    if (faqItems) {
      const faqScript = document.createElement("script");
      faqScript.type = "application/ld+json";
      faqScript.id = "tool-faq-jsonld";
      faqScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a }
        }))
      });
      document.head.appendChild(faqScript);
    }
    return () => {
      var _a, _b;
      document.title = "PDF Vaulty – Your Secure PDF Toolkit";
      (_a = document.getElementById("tool-jsonld")) == null ? void 0 : _a.remove();
      (_b = document.getElementById("tool-faq-jsonld")) == null ? void 0 : _b.remove();
    };
  }, [meta.title, meta.description, toolId]);
  reactExports.useEffect(() => {
    const el = toolAreaRef.current;
    if (!el) return;
    const onFileChange = (e) => {
      const target = e.target;
      if (target.tagName === "INPUT" && target.type === "file") {
        setIsProcessing(true);
        const input = target;
        const files = input.files;
        if (files && files.length > 0) {
          let totalBytes = 0;
          for (let i = 0; i < files.length; i++) {
            totalBytes += files[i].size;
          }
          const totalMb = totalBytes / (1024 * 1024);
          if (totalMb > LARGE_FILE_THRESHOLD_MB) {
            setSizeWarning({
              visible: true,
              sizeMb: Math.round(totalMb * 10) / 10
            });
          } else {
            setSizeWarning(
              (prev) => prev.visible ? { visible: false, sizeMb: 0 } : prev
            );
          }
        }
      }
    };
    el.addEventListener("change", onFileChange, true);
    return () => el.removeEventListener("change", onFileChange, true);
  }, []);
  const handleShareTool = reactExports.useCallback(() => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        ue.success("Tool link copied!");
      }).catch(() => {
        ue.error("Could not copy link");
      });
    } else {
      ue.error("Clipboard not available");
    }
  }, []);
  reactExports.useEffect(() => {
    trackToolUse(toolId);
    try {
      const raw = sessionStorage.getItem(SESSION_HISTORY_KEY);
      const history = raw ? JSON.parse(raw) : [];
      const meta2 = toolMeta[toolId];
      const newEntry = {
        toolId,
        toolLabel: (meta2 == null ? void 0 : meta2.title) ?? toolId,
        timestamp: Date.now()
      };
      const filtered = history.filter(
        (e) => e.toolId !== toolId
      );
      sessionStorage.setItem(
        SESSION_HISTORY_KEY,
        JSON.stringify([newEntry, ...filtered].slice(0, 10))
      );
    } catch {
    }
  }, [toolId, trackToolUse]);
  reactExports.useEffect(() => {
    if (!isAuthenticated) {
      const shown = sessionStorage.getItem(SESSION_KEY);
      if (!shown) {
        const timer = setTimeout(() => {
          setBannerVisible(true);
          sessionStorage.setItem(SESSION_KEY, "1");
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated]);
  const renderTool = () => {
    switch (toolId) {
      case "merge":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MergePDFTool, {});
      case "split":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SplitPDFTool, {});
      case "compress":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CompressPDFTool, {});
      case "image-to-pdf":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ImageToPDFTool, {});
      case "pdf-to-word":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PDFToWordTool, {});
      case "word-to-pdf":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(WordToPDFTool, {});
      case "excel-to-pdf":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ExcelToPDFTool, {});
      case "rotate":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(RotatePDFTool, {});
      case "password-protect":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordProtectPDFTool, {});
      case "pdf-converter":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PDFConverterTool, {});
      case "add-page-numbers":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AddPageNumbersTool, {});
      case "add-watermark":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AddWatermarkTool, {});
      case "crop-pdf":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CropPDFTool, {});
      case "flatten-pdf":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FlattenPDFTool, {});
      case "extract-text":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ExtractTextTool, {});
      case "edit-metadata":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PDFMetadataTool, {});
      case "batch-compress":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BatchCompressTool, {});
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: onBack,
          "data-ocid": "tool.back.button",
          className: "text-vault-muted hover:text-foreground hover:bg-vault-hover gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-px bg-vault-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground flex-1", children: meta.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleShareTool,
          "data-ocid": "tool.share.button",
          className: "gap-1.5 text-xs text-vault-muted border-vault-border hover:text-foreground hover:border-foreground/30 hover:bg-vault-hover shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
            "Share"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-2xl leading-relaxed", children: meta.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: sizeWarning.visible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -6, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -4, scale: 0.97 },
        transition: { duration: 0.18, ease: "easeOut" },
        "data-ocid": "tool.size_warning.card",
        className: "mb-6 rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 flex items-start gap-3",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none mt-0.5 shrink-0", children: "⚠️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex-1 text-sm text-amber-800 dark:text-amber-200 leading-snug", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Large file detected" }),
            " —",
            " ",
            sizeWarning.sizeMb,
            " MB. Processing may take a moment."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSizeWarning({ visible: false, sizeMb: 0 }),
              className: "shrink-0 text-amber-500 hover:text-amber-700 dark:hover:text-amber-300",
              "aria-label": "Dismiss warning",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ]
      },
      "size-warning"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: toolAreaRef, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PDFErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: toolSpinner, children: renderTool() }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: bannerVisible && !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.25 },
        "data-ocid": "tool.save_banner.card",
        className: "fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm z-50 px-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-blue-200 dark:border-blue-800/60 bg-white dark:bg-[#1a1a2e] shadow-xl shadow-blue-900/10 px-5 py-4 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-5 h-5 text-blue-500 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-gray-900 dark:text-white mb-0.5", children: "Save files to My Vault" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-white/50 leading-relaxed", children: "Sign in to save, revisit, and share your processed files from any device." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setBannerVisible(false);
                  onRequestLogin == null ? void 0 : onRequestLogin();
                },
                "data-ocid": "tool.save_banner.primary_button",
                className: "text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors",
                children: "Sign in"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setBannerVisible(false),
                "data-ocid": "tool.save_banner.close_button",
                className: "text-xs text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 text-center",
                children: "Dismiss"
              }
            )
          ] })
        ] })
      },
      "save-banner"
    ) }),
    faqSchema[toolId] && faqSchema[toolId].length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "mt-12 pt-8 border-t border-border",
        "data-ocid": "tool.faq.section",
        "aria-label": "Frequently asked questions",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground mb-5", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0 divide-y divide-border", children: faqSchema[toolId].map(({ q, a }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "group", open: i === 0, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "summary",
              {
                className: "flex items-center justify-between py-4 cursor-pointer list-none gap-3",
                "data-ocid": `tool.faq.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground group-hover:text-primary transition-colors", children: q }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-muted-foreground group-open:rotate-180 transition-transform duration-200", children: "▾" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pb-4 text-sm text-muted-foreground leading-relaxed", children: a })
          ] }, q)) })
        ]
      }
    )
  ] });
}
export {
  ToolPage as default
};
