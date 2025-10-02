/**
 * Loading Component for Contest Details Page (SSR)
 */
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-70px)]">
      <LoadingSpinner size="lg" text="Loading contest..." />
    </div>
  );
}
