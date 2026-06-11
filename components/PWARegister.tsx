"use client";

import { useEffect } from "react";

const SW_VERSION = "duncan-v5";

export function PWARegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    (async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) {
        await reg.unregister();
      }
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await navigator.serviceWorker.register(`/sw.js?v=${SW_VERSION}`);
    })().catch(() => {});
  }, []);

  return null;
}
