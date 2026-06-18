import { FoundationsNav } from "@/components/FoundationsNav";

export default function FoundationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <FoundationsNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
