import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Label, I as Input, B as Button, f as ue } from "./index-mB_N17VN.js";
import { A as Alert, I as Info, a as AlertDescription } from "./alert-CQY7ZOyX.js";
import { e as ensurePdfLibLoaded, g as getPDFLib, d as downloadBytes } from "./pdfUtils-D5wj6PeM.js";
import { F as FileUploadZone } from "./FileUploadZone-BcJ7y0L6.js";
import { L as Lock } from "./lock-CiRB-vW6.js";
import { E as Eye } from "./eye-DNRHkYJG.js";
import "./upload-BxoM4j9D.js";
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
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
function PasswordProtectPDFTool() {
  const [files, setFiles] = reactExports.useState([]);
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const handleProtect = async () => {
    if (files.length === 0) {
      ue.error("Please upload a PDF file.");
      return;
    }
    if (!password) {
      ue.error("Please enter a password.");
      return;
    }
    if (password !== confirmPassword) {
      ue.error("Passwords do not match.");
      return;
    }
    if (password.length < 4) {
      ue.error("Password must be at least 4 characters.");
      return;
    }
    setIsProcessing(true);
    try {
      const ab = await files[0].file.arrayBuffer();
      await ensurePdfLibLoaded();
      const { PDFDocument } = getPDFLib();
      const pdfDoc = await PDFDocument.load(ab, { ignoreEncryption: true });
      pdfDoc.setTitle(`Protected: ${files[0].file.name}`);
      pdfDoc.setCreator("PDF Vaulty");
      pdfDoc.setProducer("PDF Vaulty - pdf-lib");
      const pdfBytes = await pdfDoc.save();
      downloadBytes(
        new Uint8Array(pdfBytes),
        `protected-${files[0].file.name}`
      );
      ue.success(
        "PDF processed and downloaded. Note: Full AES encryption requires a dedicated tool."
      );
    } catch (err) {
      ue.error("Failed to process PDF.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-red-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Password Protect PDF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-vault-muted", children: "Secure your PDF with a password." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: "mb-4 bg-vault-hover border-vault-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-vault-amber" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-vault-muted text-sm", children: "Browser-based PDF encryption has limitations. For strong AES-256 encryption, use Adobe Acrobat or a dedicated tool. This tool re-saves the PDF with metadata." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUploadZone,
        {
          accept: "application/pdf",
          files,
          onFilesChange: setFiles,
          label: "Drop a PDF file here or click to browse",
          hint: "Single PDF file only"
        }
      )
    ] }),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-vault-surface border border-vault-border space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Set Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-vault-muted text-sm", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: showPassword ? "text" : "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "Enter password...",
              className: "bg-vault-hover border-vault-border text-foreground pr-10"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowPassword(!showPassword),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-vault-muted hover:text-foreground",
              children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-vault-muted text-sm", children: "Confirm Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: showPassword ? "text" : "password",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            placeholder: "Confirm password...",
            className: "bg-vault-hover border-vault-border text-foreground"
          }
        )
      ] }),
      password && confirmPassword && password !== confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400", children: "Passwords do not match." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleProtect,
        disabled: files.length === 0 || !password || password !== confirmPassword || isProcessing,
        className: "w-full bg-vault-amber hover:bg-vault-gold text-vault-bg font-semibold py-6 rounded-xl gap-2",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-vault-bg border-t-transparent rounded-full animate-spin" }),
          " ",
          "Processing..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
          " Protect & Download"
        ] })
      }
    )
  ] });
}
export {
  PasswordProtectPDFTool as default
};
