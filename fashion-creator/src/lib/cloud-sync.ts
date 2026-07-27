"use client";

import { useEffect, useRef } from "react";

type CloudSyncOptions<T> = {
  isSignedIn: boolean | undefined;
  local: T;
  setLocal: (value: T) => void;
  isEmpty: (value: T) => boolean;
  load: () => Promise<T>;
  save: (value: T) => Promise<void>;
};

// Guest Mode stays exactly as Sprint-02 built it — local Repository only.
// Once signed in, this hydrates local state from the database once (or, if
// the DB is empty and the guest already had local data, migrates that local
// data up instead of discarding it), then keeps pushing local changes to
// the database in the background. Every *-store.ts hook that should persist
// across devices calls this once with its own load/save Server Actions.
export function useCloudSync<T>({ isSignedIn, local, setLocal, isEmpty, load, save }: CloudSyncOptions<T>) {
  const hydratedRef = useRef(false);
  const lastSyncedRef = useRef<T | null>(null);

  useEffect(() => {
    if (!isSignedIn || hydratedRef.current) return;
    hydratedRef.current = true;
    let cancelled = false;

    load()
      .then((remote) => {
        if (cancelled) return;
        if (isEmpty(remote) && !isEmpty(local)) {
          lastSyncedRef.current = local;
          return save(local);
        }
        lastSyncedRef.current = remote;
        setLocal(remote);
      })
      .catch(() => {
        hydratedRef.current = false;
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  useEffect(() => {
    if (!isSignedIn || !hydratedRef.current) return;
    if (lastSyncedRef.current === local) return;
    lastSyncedRef.current = local;
    const timer = setTimeout(() => {
      save(local).catch(() => {});
    }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, local]);
}
