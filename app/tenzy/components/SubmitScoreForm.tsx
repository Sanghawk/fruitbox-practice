"use client";
import { useState, useEffect } from "react";
import { useGameContext } from "@/app/tenzy/context/GameContext";

export function SubmitScoreForm() {
  const { score } = useGameContext();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  useEffect(() => {
    fetch("/api/session")
      .then((r) => r.json())
      .then((d) => setSessionId(d.sessionId))
      .catch(() => setSessionId(null));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId) return setStatus("error");
    setStatus("sending");
    const res = await fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score: score, sessionId }),
    });
    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done")
    return (
      <div className="flex flex-col gap-2">
        <div className="ring-1 ring-green-500/20 text-green-500 bg-green-500/10 font-semibold rounded-md px-2 py-1">
          Score submitted! 🎉
        </div>
      </div>
    );

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <input
          required
          placeholder="Enter your name"
          value={name}
          maxLength={32}
          onChange={(e) => setName(e.target.value)}
          className="text-input w-full"
        />
        <button
          type="submit"
          disabled={status === "sending" || !sessionId}
          className="btn btn-sm btn-primary"
        >
          {status === "sending" ? "Submitting…" : "Submit"}
        </button>
      </div>

      {}
      {status === "error" && (
        <div className="ring-1 ring-red-500/20 text-red-500 font-semibold bg-red-500/10 rounded-md px-2 py-1">
          Oops, something went wrong.
        </div>
      )}
    </form>
  );
}
