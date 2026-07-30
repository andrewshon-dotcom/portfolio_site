"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyCredentialButton({
  credentialId,
}: {
  credentialId: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCredentialId() {
    try {
      await navigator.clipboard.writeText(credentialId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className="copy-credential"
      type="button"
      onClick={copyCredentialId}
      aria-label={`Copy credential ID ${credentialId}`}
    >
      <span>{credentialId}</span>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Credential ID copied." : ""}
      </span>
    </button>
  );
}
