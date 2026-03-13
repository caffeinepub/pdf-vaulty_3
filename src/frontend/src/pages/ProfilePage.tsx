import { FileText, HardDrive, Hash, User } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useGetMyAnalytics,
  useGetMyFiles,
} from "../hooks/useQueries";
import { formatBytes } from "../lib/pdfUtils";

interface ProfilePageProps {
  onNavigateToDashboard: () => void;
}

export default function ProfilePage({
  onNavigateToDashboard,
}: ProfilePageProps) {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } =
    useGetCallerUserProfile();
  const { data: files, isLoading: filesLoading } = useGetMyFiles();
  const { data: analytics, isLoading: analyticsLoading } = useGetMyAnalytics();

  const isLoading = profileLoading || filesLoading || analyticsLoading;

  const principal = identity?.getPrincipal().toText() ?? "—";
  const shortPrincipal =
    principal.length > 20
      ? `${principal.slice(0, 10)}...${principal.slice(-10)}`
      : principal;

  const totalStorageBytes =
    files?.reduce((acc, f) => acc + Number(f.size), 0) ?? 0;
  const totalOps = analytics ? Number(analytics.totalOperations) : 0;

  const stats = [
    {
      icon: FileText,
      label: "Files Stored",
      value: files?.length ?? 0,
      ocid: "profile.files.card",
    },
    {
      icon: HardDrive,
      label: "Storage Used",
      value: formatBytes(totalStorageBytes),
      ocid: "profile.storage.card",
    },
    {
      icon: Hash,
      label: "Total Operations",
      value: totalOps,
      ocid: "profile.operations.card",
    },
  ];

  if (isLoading) {
    return (
      <div
        data-ocid="profile.loading_state"
        className="flex items-center justify-center min-h-[60vh]"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(0.25 0.08 250 / 60%) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-blue-600 to-purple-600">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
            {profile?.name ?? "Your Profile"}
          </h1>
          <p className="text-sm text-gray-400 dark:text-white/30 font-mono">
            {shortPrincipal}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                data-ocid={stat.ocid}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111111] text-center"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-[#1e3a5f]">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Account info card */}
        <div className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111111] overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              Account Details
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-white/[0.04]">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-gray-500 dark:text-white/50">
                Display Name
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {profile?.name ?? "—"}
              </span>
            </div>
            <div className="flex items-start justify-between px-5 py-4 gap-4">
              <span className="text-sm text-gray-500 dark:text-white/50 flex-shrink-0">
                Principal ID
              </span>
              <span className="text-xs font-mono text-gray-700 dark:text-white/70 break-all text-right">
                {principal}
              </span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-gray-500 dark:text-white/50">
                Auth Provider
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Internet Identity
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onNavigateToDashboard}
            data-ocid="profile.secondary_button"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}
