"use client";

import { KEYBOARD_SHORTCUTS } from "@/lib/dashboard/keyboard-shortcuts";

export function KeyboardHints() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs text-white/45">
      {KEYBOARD_SHORTCUTS.map((item) => (
        <p key={item.keys} className="mt-1 first:mt-0">
          <span className="font-mono text-cyan-200/80">{item.keys}</span> — {item.action}
        </p>
      ))}
    </div>
  );
}
