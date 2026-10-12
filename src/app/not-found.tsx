import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-black text-white">404</h1>
        <p className="text-xl text-zinc-400">This page doesn’t exist on The Movie Ground.</p>
        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
