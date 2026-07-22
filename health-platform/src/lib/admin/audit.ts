import "server-only";
import type { AdminRole } from "./roles";

export interface AuditEntry {
  id: string;
  actorRole: AdminRole;
  action: string;
  target: string;
  timestamp: string;
}

/** In-memory audit trail for this server process (TASK-008 §6 완료조건: 모든 중요 변경이 기록된다). */
const entries: AuditEntry[] = [];

export function logAuditEvent(actorRole: AdminRole, action: string, target: string) {
  entries.push({
    id: `audit_${Date.now()}_${Math.round(Math.random() * 1000)}`,
    actorRole,
    action,
    target,
    timestamp: new Date().toISOString(),
  });
}

export function getAuditLog(): AuditEntry[] {
  return [...entries].reverse();
}
