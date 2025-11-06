// src/hooks/usePWAInstallPrompt.ts
import { useEffect, useState } from "react";

export function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  async function promptInstall() {
    if (!deferredPrompt) return;

    // @ts-ignore: browser-specific API
    deferredPrompt.prompt();

    // Wait for user to respond to the prompt
    // @ts-ignore
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("PWA installation accepted");
    } else {
      console.log("PWA installation dismissed");
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  }

  return { isInstallable, promptInstall };
}
