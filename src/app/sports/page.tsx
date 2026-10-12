import Link from "next/link";
import { POPULAR_LEAGUES, getPastEvents, getNextEvents, SportEvent } from "@/lib/sports";

export const revalidate = 1800;

async function safeEvents(leagueId: string, type: "next" | "past") {
  try {
    const data = type === "next" ? await getNextEvents(leagueId) : await getPastEvents(leagueId);
    return data.events || [];
  } catch {
    return [];
  }
}

export default async function SportsPage() {
  const [eplPast, nbaPast] = await Promise.all([
    safeEvents("4328", "past"),
    safeEvents("4380", "past"),
  ]);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Sports</h1>
        <p className="text-zinc-400 mb-10">
          Scores, teams & schedules powered by TheSportsDB + free F1 data
        </p>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-white mb-5">Popular Leagues</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/sports/f1"
              className="block p-5 rounded-xl bg-gradient-to-br from-red-900/40 to-zinc-900 border border-red-800/50 hover:border-red-500 transition hover:scale-[1.02]"
            >
              <p className="text-xs text-red-400 uppercase tracking-wider mb-1">Motorsport</p>
              <p className="text-white font-semibold">Formula 1</p>
              <p className="text-xs text-zinc-400 mt-1">Standings & Calendar</p>
            </Link>
            {POPULAR_LEAGUES.map((l) => (
              <Link
                key={l.id}
                href={`/sports/${l.id}?name=${encodeURIComponent(l.name)}`}
                className="block p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-600/50 transition hover:scale-[1.02]"
              >
                <p className="text-xs text-red-400 uppercase tracking-wider mb-1">{l.sport}</p>
                <p className="text-white font-semibold">{l.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {eplPast.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-5">Recent – Premier League</h2>
            <div className="space-y-3">
              {eplPast.slice(0, 8).map((e) => (
                <EventCard key={e.idEvent} event={e} />
              ))}
            </div>
          </section>
        )}

        {nbaPast.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-5">Recent – NBA</h2>
            <div className="space-y-3">
              {nbaPast.slice(0, 8).map((e) => (
                <EventCard key={e.idEvent} event={e} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: SportEvent }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-zinc-900/80 border border-zinc-800">
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">
          {event.strHomeTeam} vs {event.strAwayTeam}
        </p>
        <p className="text-xs text-zinc-500 mt-0.5">
          {event.dateEvent} {event.strTime || ""} · {event.strLeague}
        </p>
      </div>
      <div className="text-right shrink-0">
        {event.intHomeScore != null && event.intAwayScore != null ? (
          <p className="text-lg font-bold text-white">
            {event.intHomeScore} – {event.intAwayScore}
          </p>
        ) : (
          <p className="text-sm text-zinc-400">Upcoming</p>
        )}
      </div>
    </div>
  );
}
