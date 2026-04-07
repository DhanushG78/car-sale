export default function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="aspect-[16/10] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 skeleton" />
        <div className="h-3 w-1/2 skeleton" />
        <div className="flex items-center gap-3 pt-3 border-t border-border">
          <div className="h-3 w-12 skeleton" />
          <div className="h-3 w-12 skeleton" />
          <div className="h-3 w-12 skeleton" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 skeleton" />
          <div className="h-6 w-20 skeleton" />
        </div>
      </div>
    </div>
  );
}
