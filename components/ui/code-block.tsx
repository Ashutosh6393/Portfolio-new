"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";

// macOS-style window frame around an MDX <pre>, with a copy button that reads
// the rendered code text off the DOM (no need to thread the raw string through).
export function CodeBlock(props: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-block">
      <div className="code-block__bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="code-block__copy"
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>
      <pre ref={preRef} {...props} />
    </div>
  );
}
