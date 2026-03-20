import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class PDFErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message ?? "Unknown error",
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[PDFErrorBoundary]", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          data-ocid="tool.error_state"
          className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 p-6 flex flex-col items-center text-center gap-4"
          role="alert"
        >
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-500 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-red-800 dark:text-red-200 mb-1">
              Something went wrong processing your PDF
            </h3>
            <p className="text-sm text-red-600/80 dark:text-red-300/70 leading-relaxed">
              This might be due to an unsupported file format or a corrupted
              PDF.
            </p>
            {this.state.errorMessage && (
              <p className="mt-2 text-xs text-red-500/60 dark:text-red-400/50 font-mono break-all">
                {this.state.errorMessage}
              </p>
            )}
          </div>
          <Button
            size="sm"
            onClick={this.handleReset}
            data-ocid="tool.error_state.button"
            className="gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white border-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
