"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

// Native share sheet where available (mobile), copy-link everywhere else.
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[12px] text-muted transition-colors hover:text-ink"
    >
      {copied ? (
        <Check aria-hidden size={13} strokeWidth={1.5} />
      ) : (
        <Share2 aria-hidden size={13} strokeWidth={1.5} />
      )}
      {copied ? "link copied" : "share"}
    </button>
  );
}
