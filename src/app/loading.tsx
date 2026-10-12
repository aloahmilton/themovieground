export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
        <p className="text-zinc-400 text-sm">Loading The Movie Ground…</p>
      </div>
    </div>
  );
}
