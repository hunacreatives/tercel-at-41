"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type RSVP = {
  id: string;
  name: string;
  email: string;
  bringing: string | null;
  guest_count: number | null;
  message: string | null;
  created_at: string;
};

type Filter = "all" | "with-message" | "no-message";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedRsvp, setSelectedRsvp] = useState<RSVP | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  // Validate by asking the server (which checks the password and uses the
  // service-role key). No data is reachable without the correct password.
  const fetchRsvps = async (pw: string) => {
    setLoading(true);
    setError(false);
    const res = await fetch("/api/admin/rsvps", {
      headers: { "x-admin-password": pw },
    });
    if (res.ok) {
      const { rsvps } = await res.json();
      setRsvps(rsvps ?? []);
      setAuthed(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchRsvps(password);
  };

  const deleteRsvp = async (id: string) => {
    setDeleting(true);
    const res = await fetch(`/api/admin/rsvps?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setRsvps((prev) => prev.filter((r) => r.id !== id));
    }
    setConfirmId(null);
    setDeleting(false);
  };

  const withMessageCount = useMemo(
    () => rsvps.filter((r) => r.message).length,
    [rsvps]
  );

  const filteredRsvps = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rsvps.filter((r) => {
      if (filter === "with-message" && !r.message) return false;
      if (filter === "no-message" && r.message) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
      );
    });
  }, [rsvps, search, filter]);

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(180deg, #f5f5f5 0%, #e6e6e6 100%)" }}
      >
        <form
          onSubmit={handleLogin}
          className="bg-white/95 backdrop-blur rounded-3xl p-10 shadow-xl w-full max-w-xs text-center"
        >
          <Image src="/forty-one.webp" alt="" width={48} height={48} className="mx-auto mb-4" />
          <p className="font-header font-bold text-[#333] text-2xl mb-1">Admin Access</p>
          <p className="text-gray-400 text-xs mb-6">Tercel&apos;s 41st</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2.5 text-sm text-[#333] outline-none focus:border-gray-500 mb-3 text-center"
          />
          {error && <p className="text-red-500 text-xs mb-3">Incorrect password</p>}
          <button
            type="submit"
            style={{ background: "linear-gradient(135deg, #5a5a5a 0%, #3a3a3a 100%)" }}
            className="w-full text-white rounded-full py-2.5 text-sm font-bold hover:brightness-110 transition-all cursor-pointer"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "with-message", label: "With Message" },
    { key: "no-message", label: "No Message" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f0] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="font-bold text-gray-900 text-2xl">RSVP Responses</h1>
            <p className="text-gray-400 text-sm mt-1">Tercel&apos;s 41st Birthday</p>
          </div>
          <button
            onClick={() => fetchRsvps(password)}
            className="text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Refresh
          </button>
        </div>

        {!loading && rsvps.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
              <p className="text-2xl font-bold text-gray-900">{rsvps.length}</p>
              <p className="text-gray-400 text-xs mt-1">Total RSVPs</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
              <p className="text-2xl font-bold text-gray-900">{withMessageCount}</p>
              <p className="text-gray-400 text-xs mt-1">With Message</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
              <p className="text-2xl font-bold text-gray-900">
                {rsvps.length - withMessageCount}
              </p>
              <p className="text-gray-400 text-xs mt-1">No Message</p>
            </div>
          </div>
        )}

        {!loading && rsvps.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white"
            />
            <div className="inline-flex bg-white border border-gray-200 rounded-lg p-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`text-sm px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                    filter === f.key
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-xs ml-auto">
              {filteredRsvps.length} {filteredRsvps.length === 1 ? "record" : "records"}
            </p>
          </div>
        )}

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : rsvps.length === 0 ? (
          <p className="text-gray-400">No RSVPs yet.</p>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wide">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wide">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wide whitespace-nowrap">
                    Bringing
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wide">
                    Message
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-gray-400 text-xs uppercase tracking-wide whitespace-nowrap">
                    Submitted
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRsvps.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {r.name}
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{r.email}</td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                      {r.bringing || "—"}
                      {r.guest_count ? ` (${r.guest_count} total)` : ""}
                    </td>
                    <td className="px-5 py-3 text-gray-500 italic max-w-[240px]">
                      {r.message ? (
                        <button
                          onClick={() => setSelectedRsvp(r)}
                          className="truncate block max-w-[240px] text-left hover:text-gray-900 hover:underline cursor-pointer"
                        >
                          {r.message}
                        </button>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-400 whitespace-nowrap">
                      {formatDate(r.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {confirmId === r.id ? (
                        <span className="inline-flex gap-1">
                          <button
                            onClick={() => deleteRsvp(r.id)}
                            disabled={deleting}
                            className="text-xs bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-600 disabled:opacity-50 transition-colors"
                          >
                            {deleting ? "…" : "Confirm"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="text-xs border border-gray-200 text-gray-400 px-2 py-1 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <button
                          onClick={() => setConfirmId(r.id)}
                          className="text-xs text-red-500 hover:text-red-600 hover:underline cursor-pointer transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredRsvps.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                      No matching RSVPs.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedRsvp && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50"
          onClick={() => setSelectedRsvp(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 shadow-md w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-gray-900 text-xl">{selectedRsvp.name}</p>
                <p className="text-gray-400 text-sm">{selectedRsvp.email}</p>
              </div>
              <button
                onClick={() => setSelectedRsvp(null)}
                className="text-gray-400 hover:text-gray-900 cursor-pointer text-xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap">{selectedRsvp.message}</p>
            <p className="text-gray-400 text-xs mt-4">{formatDate(selectedRsvp.created_at)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
