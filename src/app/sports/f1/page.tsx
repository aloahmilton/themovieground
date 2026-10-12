import Link from "next/link";
import { getCurrentF1Races, getCurrentF1DriverStandings } from "@/lib/sports";

export const revalidate = 3600;

export default async function F1Page() {
  const [races, standings] = await Promise.all([
    getCurrentF1Races().catch(() => []),
    getCurrentF1DriverStandings().catch(() => []),
  ]);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/sports" className="text-red-400 text-sm hover:underline mb-4 inline-block">
          ← All Sports
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Formula 1</h1>
        <p className="text-zinc-400 mb-10">Current season – free data via Jolpica / Ergast</p>

        {standings.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-semibold text-white mb-5">Driver Standings</h2>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 text-left">Pos</th>
                    <th className="px-4 py-3 text-left">Driver</th>
                    <th className="px-4 py-3 text-left">Team</th>
                    <th className="px-4 py-3 text-right">Pts</th>
                    <th className="px-4 py-3 text-right">Wins</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((s) => (
                    <tr key={s.position} className="border-t border-zinc-800 hover:bg-zinc-900/50">
                      <td className="px-4 py-3 text-white font-medium">{s.position}</td>
                      <td className="px-4 py-3 text-white">
                        {s.Driver.givenName} {s.Driver.familyName}
                      </td>
                      <td className="px-4 py-3 text-zinc-400">
                        {s.Constructors?.[0]?.name || "–"}
                      </td>
                      <td className="px-4 py-3 text-right text-white font-semibold">{s.points}</td>
                      <td className="px-4 py-3 text-right text-zinc-400">{s.wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {races.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-5">Race Calendar</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {races.map((r) => (
                <div key={r.round} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-xs text-red-400 mb-1">Round {r.round}</p>
                  <p className="text-white font-semibold">{r.raceName}</p>
                  <p className="text-sm text-zinc-400 mt-1">
                    {r.Circuit.circuitName} · {r.Circuit.Location.locality}, {r.Circuit.Location.country}
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">
                    {r.date} {r.time ? r.time.slice(0, 5) : ""}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {races.length === 0 && standings.length === 0 && (
          <p className="text-zinc-500 py-16 text-center">Could not load F1 data right now.</p>
        )}
      </div>
    </div>
  );
}
