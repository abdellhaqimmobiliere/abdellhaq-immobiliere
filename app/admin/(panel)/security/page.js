import { getSupabaseAdmin } from "@/lib/supabase";

const eventColors = {
  login_success: "bg-green-100 text-green-700",
  login_failed: "bg-red-100 text-red-700",
  login_blocked: "bg-orange-100 text-orange-700",
  logout: "bg-gray-100 text-gray-600",
  property_added: "bg-blue-100 text-blue-700",
  property_deleted: "bg-red-100 text-red-700",
  settings_changed: "bg-purple-100 text-purple-700",
};

export default async function SecurityPage() {
  const admin = getSupabaseAdmin();
  const logs = admin
    ? (
        await admin
          .from("admin_audit_log")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50)
      ).data
    : [];

  return (
    <div className="max-w-4xl">
      <h1 className="font-heading text-2xl font-bold text-[#0D2340] mb-2">
        Journal de sécurité
      </h1>
      <p className="font-body text-sm text-[#9E9E9E] mb-6">
        Dernières connexions et actions administrateur (50 entrées max).
      </p>

      {!admin && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4">
          Supabase non configuré — exécutez la migration SQL pour activer le
          journal.
        </p>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Événement", "IP", "Navigateur", "Date"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs?.length ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                          eventColors[log.event] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {log.event.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {log.ip}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 max-w-[180px] truncate">
                      {log.user_agent?.split(" ")[0]}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString("fr-MA")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-400">
                    Aucun événement enregistré pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
