import "server-only";

export interface SearchLogEntry {
  query: string;
  resultCount: number;
  hadClick: boolean;
  timestamp: string;
}

export interface AskLogEntry {
  question: string;
  isEmergency: boolean;
  timestamp: string;
}

/**
 * In-memory log store for local scaffolding (TASK-006 §5 산출물: 검색 로그,
 * 검색 결과 없음 로그). A real deployment persists these to a database and
 * surfaces them in the admin search-analytics screen (TASK-008).
 */
const searchLogs: SearchLogEntry[] = [];
const askLogs: AskLogEntry[] = [];

export function logSearch(query: string, resultCount: number) {
  searchLogs.push({ query, resultCount, hadClick: false, timestamp: new Date().toISOString() });
}

export function logAskQuery(question: string, isEmergency: boolean) {
  askLogs.push({ question, isEmergency, timestamp: new Date().toISOString() });
}

export function getFailedSearches(): SearchLogEntry[] {
  return searchLogs.filter((entry) => entry.resultCount === 0);
}

export function getSearchLogs(): SearchLogEntry[] {
  return searchLogs;
}

export function getAskLogs(): AskLogEntry[] {
  return askLogs;
}
