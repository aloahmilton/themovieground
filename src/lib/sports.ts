const BASE = "https://www.thesportsdb.com/api/v1/json";

function getKey() {
  return process.env.SPORTSDB_API_KEY || "3";
}

async function sportsFetch<T>(endpoint: string): Promise<T> {
  const url = `${BASE}/${getKey()}/${endpoint}`;
  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) throw new Error(`SportsDB error: ${res.status}`);
  return res.json();
}

export type SportTeam = {
  idTeam: string;
  strTeam: string;
  strTeamBadge?: string;
  strStadium?: string;
  strLeague?: string;
  strCountry?: string;
  strDescriptionEN?: string;
};

export type SportEvent = {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore?: string;
  intAwayScore?: string;
  dateEvent: string;
  strTime?: string;
  strLeague?: string;
  strSport?: string;
  strThumb?: string;
  strStatus?: string;
};

export async function searchTeams(query: string) {
  return sportsFetch<{ teams: SportTeam[] | null }>(`searchteams.php?t=${encodeURIComponent(query)}`);
}

export async function getLeagueTeams(league: string) {
  return sportsFetch<{ teams: SportTeam[] | null }>(`search_all_teams.php?l=${encodeURIComponent(league)}`);
}

export async function getNextEvents(leagueId: string) {
  return sportsFetch<{ events: SportEvent[] | null }>(`eventsnextleague.php?id=${leagueId}`);
}

export async function getPastEvents(leagueId: string) {
  return sportsFetch<{ events: SportEvent[] | null }>(`eventspastleague.php?id=${leagueId}`);
}

export async function getAllSports() {
  return sportsFetch<{ sports: { idSport: string; strSport: string; strSportThumb?: string }[] }>("all_sports.php");
}

export const POPULAR_LEAGUES = [
  { id: "4328", name: "English Premier League", sport: "Soccer" },
  { id: "4335", name: "Spanish La Liga", sport: "Soccer" },
  { id: "4332", name: "Italian Serie A", sport: "Soccer" },
  { id: "4331", name: "German Bundesliga", sport: "Soccer" },
  { id: "4334", name: "French Ligue 1", sport: "Soccer" },
  { id: "4380", name: "NBA", sport: "Basketball" },
  { id: "4391", name: "NFL", sport: "American Football" },
  { id: "4424", name: "MLB", sport: "Baseball" },
];

const F1_BASE = "https://api.jolpi.ca/ergast/f1";

export type F1Race = {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time?: string;
  Circuit: {
    circuitName: string;
    Location: { locality: string; country: string };
  };
};

export type F1Standing = {
  position: string;
  points: string;
  wins: string;
  Driver: { givenName: string; familyName: string; nationality: string };
  Constructors: { name: string }[];
};

export async function getCurrentF1Races() {
  const res = await fetch(`${F1_BASE}/current.json`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("F1 API error");
  const data = await res.json();
  return (data.MRData?.RaceTable?.Races || []) as F1Race[];
}

export async function getCurrentF1DriverStandings() {
  const res = await fetch(`${F1_BASE}/current/driverStandings.json`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("F1 API error");
  const data = await res.json();
  return (data.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || []) as F1Standing[];
}
