"use client";

import { KEYBOARD_SHORTCUTS } from "@/lib/dashboard/keyboard-shortcuts";

export function KeyboardHints() {
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-xs text-zinc-500">
      {KEYBOARD_SHORTCUTS.map((item) => (
        <p key={item.keys} className="mt-1 first:mt-0">
          <span className="font-mono text-orange-400">{item.keys}</span> — {item.action}
        </p>
      ))}
    </div>
  );
}
