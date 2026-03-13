import { c as createLucideIcon, r as reactExports, d as useGetMyFiles, e as useSaveFile, f as useDeleteFile, j as jsxRuntimeExports, F as FileText, X, g as ue, E as ExternalBlob, h as useRenameFile } from "./index-B4iaYbj_.js";
import { f as formatBytes } from "./pdfUtils-D5wj6PeM.js";
import { L as LoaderCircle } from "./loader-circle-Ctv80KCo.js";
import { U as Upload } from "./upload-TM74lQ_b.js";
import { C as CircleAlert } from "./circle-alert-Cwl8jZkJ.js";
import { S as Shield } from "./shield-CKkmSgKU.js";
import { L as Lock } from "./lock-C5JR-RCX.js";
import { E as Eye } from "./eye-B-Z0aQBl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function formatDate(uploadedAt) {
  const ms = Number(uploadedAt / 1000000n);
  return new Date(ms).toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function PdfViewerModal({ fileName, fileUrl, onClose }) {
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      "data-ocid": "files.modal",
      open: true,
      className: "fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm w-screen h-screen max-w-none max-h-none m-0 p-0 border-0",
      "aria-label": `Viewing ${fileName}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-white/10 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center bg-blue-950/60 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-blue-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white truncate max-w-xs sm:max-w-md", children: fileName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              "data-ocid": "files.close_button",
              className: "flex-shrink-0 ml-4 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              "aria-label": "Close PDF viewer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            src: fileUrl,
            className: "w-full h-full border-0",
            title: fileName,
            "aria-label": `PDF viewer for ${fileName}`
          }
        ) })
      ]
    }
  );
}
function RenameInput({ fileId, currentName, onDone }) {
  const [value, setValue] = reactExports.useState(currentName);
  const inputRef = reactExports.useRef(null);
  const renameFile = useRenameFile();
  reactExports.useEffect(() => {
    var _a, _b;
    (_a = inputRef.current) == null ? void 0 : _a.focus();
    (_b = inputRef.current) == null ? void 0 : _b.select();
  }, []);
  const handleConfirm = async () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === currentName) {
      onDone();
      return;
    }
    try {
      await renameFile.mutateAsync({ fileId, newName: trimmed });
      ue.success(`Renamed to "${trimmed}"`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Rename failed";
      ue.error(message);
    } finally {
      onDone();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleConfirm();
    } else if (e.key === "Escape") {
      onDone();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-1 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "text",
        value,
        onChange: (e) => setValue(e.target.value),
        onKeyDown: handleKeyDown,
        "data-ocid": "files.input",
        className: "flex-1 min-w-0 text-sm font-semibold text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
        placeholder: "Enter file name…",
        "aria-label": "Rename file",
        disabled: renameFile.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleConfirm,
        disabled: renameFile.isPending,
        "data-ocid": "files.save_button",
        className: "flex-shrink-0 p-1.5 rounded-md text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        "aria-label": "Confirm rename",
        title: "Confirm rename",
        children: renameFile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onDone,
        disabled: renameFile.isPending,
        "data-ocid": "files.cancel_button",
        className: "flex-shrink-0 p-1.5 rounded-md text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
        "aria-label": "Cancel rename",
        title: "Cancel rename",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
      }
    )
  ] });
}
function MyFilesPage({
  onNavigateToDashboard
}) {
  var _a;
  const fileInputRef = reactExports.useRef(null);
  const [uploadingFileName, setUploadingFileName] = reactExports.useState(
    null
  );
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [renamingId, setRenamingId] = reactExports.useState(null);
  const [viewerFile, setViewerFile] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const { data: files, isLoading, isError } = useGetMyFiles();
  const saveFile = useSaveFile();
  const deleteFile = useDeleteFile();
  const handleUploadClick = () => {
    var _a2;
    return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
  };
  const handleFileChange = async (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    e.target.value = "";
    setUploadingFileName(file.name);
    setUploadProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      await saveFile.mutateAsync({
        name: file.name,
        size: BigInt(file.size),
        blob
      });
      ue.success(`"${file.name}" uploaded successfully`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      ue.error(message);
    } finally {
      setUploadingFileName(null);
      setUploadProgress(0);
    }
  };
  const handleDelete = async (fileId, fileName) => {
    setDeletingId(fileId);
    try {
      await deleteFile.mutateAsync(fileId);
      ue.success(`"${fileName}" deleted`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      ue.error(message);
    } finally {
      setDeletingId(null);
    }
  };
  const handleViewPdf = async (fileName, fileUrl) => {
    try {
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      setViewerFile({ name: fileName, url: objectUrl });
    } catch {
      setViewerFile({ name: fileName, url: fileUrl });
    }
  };
  const handleCloseViewer = () => {
    if (viewerFile == null ? void 0 : viewerFile.url.startsWith("blob:")) {
      URL.revokeObjectURL(viewerFile.url);
    }
    setViewerFile(null);
  };
  const isUploading = !!uploadingFileName;
  const fileCount = (files == null ? void 0 : files.length) ?? 0;
  const filteredFiles = files == null ? void 0 : files.filter(
    (f) => f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const hasSearchResults = ((filteredFiles == null ? void 0 : filteredFiles.length) ?? 0) > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white dark:bg-[#0a0a0a]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: ".pdf,application/pdf",
        className: "hidden",
        onChange: handleFileChange
      }
    ),
    viewerFile && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PdfViewerModal,
      {
        fileName: viewerFile.name,
        fileUrl: viewerFile.url,
        onClose: handleCloseViewer
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden bg-gradient-to-b from-blue-50/80 to-white dark:from-transparent dark:to-transparent dark:bg-[#0a0a0a]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none hidden dark:block",
          style: {
            background: "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-blue-600 to-purple-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight", children: "My Files" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-gray-500 dark:text-white/60 max-w-md mx-auto leading-relaxed", children: "Your private PDF vault — encrypted and accessible only to you, stored securely on the Internet Computer." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white", children: [
          "Stored Files",
          !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-sm font-normal text-gray-400 dark:text-white/30", children: [
            fileCount,
            " ",
            fileCount === 1 ? "file" : "files"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleUploadClick,
            disabled: isUploading,
            "data-ocid": "files.upload_button",
            className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-blue-600/20",
            children: isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              uploadProgress > 0 ? `${uploadProgress}%` : "Uploading…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
              "Upload PDF"
            ] })
          }
        )
      ] }),
      isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "files.loading_state",
          className: "mb-4 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 px-4 py-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-blue-700 dark:text-blue-300 font-medium truncate max-w-xs", children: uploadingFileName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-blue-500 dark:text-blue-400 ml-2 flex-shrink-0", children: [
                uploadProgress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-blue-500 rounded-full transition-all duration-300",
                style: { width: `${uploadProgress}%` }
              }
            ) })
          ]
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "files.loading_state",
          className: "flex flex-col items-center justify-center py-20 gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-blue-500 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 dark:text-white/30 text-sm", children: "Loading your files…" })
          ]
        }
      ),
      isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "files.error_state",
          className: "flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-center px-6 gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-red-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600 dark:text-red-400 font-semibold", children: "Failed to load files" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 dark:text-red-500/70 text-sm", children: "Please try refreshing the page." })
          ]
        }
      ),
      !isLoading && !isError && fileCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "files.empty_state",
          className: "flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#111111] text-center px-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 border border-blue-100 dark:border-blue-900/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-blue-400 dark:text-blue-500" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-white" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-800 dark:text-white/80 text-xl font-bold mb-2", children: "No files uploaded yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-white/40 text-sm mb-3 max-w-xs leading-relaxed", children: "Upload your first PDF to get started, or use a PDF tool and save the result here." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-8 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-blue-600 dark:text-blue-400 font-medium", children: "Files are private — only you can access them" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleUploadClick,
                  disabled: isUploading,
                  "data-ocid": "files.primary_button",
                  className: "inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-blue-600/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                    "Upload PDF"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: onNavigateToDashboard,
                  "data-ocid": "files.secondary_button",
                  className: "inline-flex items-center gap-2 px-6 py-2.5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white/70 font-semibold rounded-lg transition-colors text-sm",
                  children: [
                    "Go to PDF Tools",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              )
            ] })
          ]
        }
      ),
      !isLoading && !isError && fileCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "search",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: "Search files…",
              "data-ocid": "files.search_input",
              className: "w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 dark:text-white bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl placeholder:text-gray-400 dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
              "aria-label": "Search files"
            }
          ),
          searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearchQuery(""),
              className: "absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:text-white/30 dark:hover:text-white/60 transition-colors",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        searchQuery && !hasSearchResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "files.empty_state",
            className: "flex flex-col items-center justify-center py-12 rounded-xl border border-dashed border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#111111] text-center px-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8 text-gray-300 dark:text-white/20 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 dark:text-white/50 text-sm font-medium", children: [
                "No files match “",
                searchQuery,
                "”"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSearchQuery(""),
                  className: "mt-3 text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                  children: "Clear search"
                }
              )
            ]
          }
        ),
        (_a = searchQuery ? filteredFiles : files) == null ? void 0 : _a.map((file, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `files.item.${idx + 1}`,
            className: "flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111111] hover:border-blue-300 dark:hover:border-blue-800/60 transition-colors group mb-3 last:mb-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: renamingId === file.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                RenameInput,
                {
                  fileId: file.id,
                  currentName: file.name,
                  onDone: () => setRenamingId(null)
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white truncate", children: file.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 dark:text-white/30 mt-0.5", children: [
                  formatBytes(Number(file.size)),
                  " · Uploaded",
                  " ",
                  formatDate(file.uploadedAt)
                ] })
              ] }) }),
              renamingId !== file.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      navigator.clipboard.writeText(file.blob.getDirectURL()).then(() => {
                        ue.success("Link copied to clipboard");
                      }).catch(() => {
                        ue.error("Failed to copy link");
                      });
                    },
                    "data-ocid": `files.share_button.${idx + 1}`,
                    className: "p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/40 transition-colors",
                    title: "Copy shareable link",
                    "aria-label": `Copy link for ${file.name}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleViewPdf(file.name, file.blob.getDirectURL()),
                    "data-ocid": `files.secondary_button.${idx + 1}`,
                    className: "p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors",
                    title: "View PDF",
                    "aria-label": `View ${file.name}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: file.blob.getDirectURL(),
                    download: file.name,
                    "data-ocid": `files.button.${idx + 1}`,
                    className: "p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors",
                    title: "Download",
                    "aria-label": `Download ${file.name}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "w-4 h-4",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Download" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "7 10 12 15 17 10" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setRenamingId(file.id),
                    "data-ocid": `files.edit_button.${idx + 1}`,
                    className: "p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors",
                    title: "Rename file",
                    "aria-label": `Rename ${file.name}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleDelete(file.id, file.name),
                    disabled: deletingId === file.id,
                    "data-ocid": `files.delete_button.${idx + 1}`,
                    className: "p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                    title: "Delete file",
                    "aria-label": `Delete ${file.name}`,
                    children: deletingId === file.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ]
          },
          file.id
        ))
      ] }),
      !isLoading && fileCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-gray-400 dark:text-white/25 mt-8", children: "Files are stored privately on the Internet Computer — only you can access them." })
    ] })
  ] });
}
export {
  MyFilesPage as default
};
