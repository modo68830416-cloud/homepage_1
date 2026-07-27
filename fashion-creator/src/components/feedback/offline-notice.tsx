"use client";

import { useEffect } from "react";
import { useToast } from "@/components/feedback/toast";

// DEMO offline handling: since almost everything already lives in
// localStorage-backed Repositories, the app keeps working offline — this
// just tells the visitor that, rather than pretending nothing happened.
export function OfflineNotice() {
  const { showToast } = useToast();

  useEffect(() => {
    function handleOffline() {
      showToast("오프라인 상태입니다. 저장된 DEMO 데이터로 계속 이용할 수 있어요.", "info");
    }
    function handleOnline() {
      showToast("다시 온라인 상태가 되었습니다.");
    }
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [showToast]);

  return null;
}
