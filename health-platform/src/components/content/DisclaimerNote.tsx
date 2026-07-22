/** Standing medical disclaimer — appears on every article and AI answer (TASK-006 §3, TASK-009 §6). */
export function DisclaimerNote() {
  return (
    <p className="text-xs text-[var(--text-secondary)] border-t border-[var(--border-default)] pt-4 mt-8">
      이 콘텐츠는 일반적인 건강 정보 제공을 목적으로 하며 의학적 진단이나 처방을 대체하지 않습니다. 개인의 증상에 대해서는
      반드시 의료 전문가와 상담하세요.
    </p>
  );
}
