import Link from "next/link";
import { getPastEvents, getNextEvents, getLeagueTeams, SportEvent } from "@/lib/sports";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string }>;
};

export const revalidate = 1800;

export default async function LeaguePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { name } = await searchParams;
  const leagueName = name || "League";

  const [past, next, teamsData] = await Promise.all([
    getPastEvents(id).catch(() => ({ events: null })),
    getNextEvents(id).catch(() => ({ events: null })),
    getLeagueTeams(leagueName).catch(() => ({ teams: null })),
  ]);

  const pastEvents = past.events || [];
  const nextEvents = next.events || [];
  const teams = teamsData.teams || [];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/sports" className="text-red-400 text-sm hover:underline mb-4 inline-block">
          ← All Sports
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{leagueName}</h1>

        {nextEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Upcoming</h2>
            <div className="space-y-3">
              {nextEvents.slice(0, 12).map((e) => (
                <EventRow key={e.idEvent} event={e} />
              ))}
            </div>
          </section>
        )}

        {pastEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Results</h2>
            <div className="space-y-3">
              {pastEvents.slice(0, 15).map((e) => (
                <EventRow key={e.idEvent} event={e} />
              ))}
            </div>
          </section>
        )}

        {teams.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Teams</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {teams.map((t) => (
                <div key={t.idTeam} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                  {t.strTeamBadge && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.strTeamBadge} alt={t.strTeam} className="w-16 h-16 mx-auto object-contain mb-2" />
                  )}
                  <p className="text-white text-sm font-medium">{t.strTeam}</p>
                  {t.strStadium && <p className="text-xs text-zinc-500 mt-1 truncate">{t.strStadium}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {pastEvents.length === 0 && nextEvents.length === 0 && teams.length === 0 && (
          <p className="text-zinc-500 py-16 text-center">
            No data available for this league on the free tier. Try another league.
          </p>
        )}
      </div>
    </div>
  );
}

function EventRow({ event }: { event: SportEvent }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-zinc-900/80 border border-zinc-800">
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">
          {event.strHomeTeam} vs {event.strAwayTeam}
        </p>
        <p className="text-xs text-zinc-500 mt-0.5">
          {event.dateEvent} {event.strTime || ""}
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
