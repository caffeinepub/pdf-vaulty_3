import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "pdfvaulty_onboarding_done";

const steps = [
  {
    key: "pick",
    title: "Pick a tool",
    description: "Choose any PDF tool from the grid to get started instantly.",
    emoji: "🛠️",
  },
  {
    key: "languages",
    title: "8 languages",
    description:
      "PDF Vaulty works in English, Arabic, French, Spanish, Hindi, Portuguese, Marathi, and Bengali.",
    emoji: "🌐",
  },
  {
    key: "save",
    title: "Save your work",
    description:
      "Log in to save processed PDFs to My Files and access them anytime.",
    emoji: "💾",
  },
];

export default function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const current = steps[step];

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="onboarding"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          data-ocid="onboarding.dialog"
          aria-label="Quick start guide"
          className="fixed bottom-6 right-4 sm:right-6 z-50 w-72 sm:w-80 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a2e] shadow-xl shadow-black/10 dark:shadow-black/40 p-5"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={dismiss}
            data-ocid="onboarding.close_button"
            aria-label="Close onboarding"
            className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:text-white/40 dark:hover:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Step indicator dots */}
          <div className="flex gap-1.5 mb-4">
            {steps.map((s, i) => (
              <div
                key={s.key}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-5 bg-blue-600 dark:bg-blue-400"
                    : "w-1.5 bg-gray-200 dark:bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
            >
              <div className="text-2xl mb-2">{current.emoji}</div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {current.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-white/55 leading-relaxed">
                {current.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-white/[0.07]">
            <button
              type="button"
              onClick={prev}
              data-ocid="onboarding.pagination_prev"
              disabled={step === 0}
              className="text-sm text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60 disabled:opacity-0 disabled:pointer-events-none transition-all"
            >
              Back
            </button>

            <Button
              size="sm"
              onClick={next}
              data-ocid={
                step === steps.length - 1
                  ? "onboarding.confirm_button"
                  : "onboarding.pagination_next"
              }
              className="h-7 px-4 text-xs bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white border-0"
            >
              {step === steps.length - 1 ? "Got it" : "Next"}
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
