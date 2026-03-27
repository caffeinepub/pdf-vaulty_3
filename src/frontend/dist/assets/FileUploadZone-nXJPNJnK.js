import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, X, F as FileText } from "./index-BqLb9sp7.js";
import { U as Upload } from "./upload-DjDbhMBM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode);
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
function getFileIcon(file) {
  if (file.type.startsWith("image/"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4 text-pink-400" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-vault-amber" });
}
function FileUploadZone({
  accept,
  multiple = false,
  files,
  onFilesChange,
  label = "Drop files here or click to browse",
  hint,
  maxFiles
}) {
  const inputRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const addFiles = reactExports.useCallback(
    (newFiles) => {
      if (!newFiles) return;
      const arr = Array.from(newFiles).map((f) => ({
        file: f,
        id: `${f.name}-${Date.now()}-${Math.random()}`
      }));
      if (multiple) {
        const combined = [...files, ...arr];
        onFilesChange(maxFiles ? combined.slice(0, maxFiles) : combined);
      } else {
        onFilesChange([arr[0]]);
      }
    },
    [files, multiple, onFilesChange, maxFiles]
  );
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const removeFile = (id) => {
    onFilesChange(files.filter((f) => f.id !== id));
  };
  const moveUp = (index) => {
    if (index === 0) return;
    const arr = [...files];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    onFilesChange(arr);
  };
  const moveDown = (index) => {
    if (index === files.length - 1) return;
    const arr = [...files];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    onFilesChange(arr);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        onDrop: handleDrop,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        className: `relative rounded-2xl border-2 border-dashed transition-all duration-200 ${isDragging ? "border-vault-amber bg-vault-amber/10 scale-[1.01]" : "border-vault-border bg-vault-surface hover:border-vault-amber/50 hover:bg-vault-hover"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = inputRef.current) == null ? void 0 : _a.click();
            },
            className: "w-full cursor-pointer p-10 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  type: "file",
                  accept,
                  multiple,
                  className: "hidden",
                  onChange: (e) => addFiles(e.target.files),
                  onClick: (e) => {
                    e.target.value = "";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isDragging ? "bg-vault-amber/20" : "bg-vault-hover"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Upload,
                      {
                        className: `w-7 h-7 transition-colors ${isDragging ? "text-vault-amber" : "text-vault-muted"}`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: label }),
                  hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted mt-1", children: hint })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "border-vault-border text-vault-muted hover:text-foreground hover:border-vault-amber/50 pointer-events-none",
                    children: "Browse Files"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-vault-muted", children: [
        files.length,
        " file",
        files.length !== 1 ? "s" : "",
        " selected"
      ] }),
      files.map((f, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 p-3 rounded-xl bg-vault-surface border border-vault-border",
          children: [
            getFileIcon(f.file),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: f.file.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-vault-muted", children: formatBytes(f.file.size) })
            ] }),
            multiple && files.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    moveUp(index);
                  },
                  disabled: index === 0,
                  className: "w-6 h-6 rounded flex items-center justify-center text-vault-muted hover:text-foreground hover:bg-vault-hover disabled:opacity-30 text-xs",
                  children: "↑"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    moveDown(index);
                  },
                  disabled: index === files.length - 1,
                  className: "w-6 h-6 rounded flex items-center justify-center text-vault-muted hover:text-foreground hover:bg-vault-hover disabled:opacity-30 text-xs",
                  children: "↓"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  removeFile(f.id);
                },
                className: "w-7 h-7 rounded-lg flex items-center justify-center text-vault-muted hover:text-red-400 hover:bg-red-400/10 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ]
        },
        f.id
      ))
    ] })
  ] });
}
export {
  FileUploadZone as F,
  Image as I
};
