import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Users, Shield, ShieldOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface UserWithRoles {
  id: string;
  email: string;
  created_at: string;
  roles: string[];
}

interface UserManagementProps {
  isAdmin: boolean;
}

const UserManagement = ({ isAdmin }: UserManagementProps) => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-users", {
        body: { action: "list_users" },
      });
      if (error) throw error;
      setUsers(data.users || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin, fetchUsers]);

  const handleToggleRole = async (userId: string, role: string, hasRole: boolean) => {
    try {
      const { error } = await supabase.functions.invoke("manage-users", {
        body: {
          action: hasRole ? "revoke_role" : "assign_role",
          userId,
          role,
        },
      });
      if (error) throw error;
      toast.success(hasRole ? `${role} role revoked` : `${role} role assigned`);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || "Failed to update role");
    }
  };

  if (!isAdmin) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border gradient-card shadow-card overflow-hidden"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">User Management</h3>
        </div>
        <button
          onClick={fetchUsers}
          className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-muted-foreground text-sm">Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium uppercase tracking-wider">Email</th>
                <th className="text-left p-3 text-muted-foreground font-medium uppercase tracking-wider">Joined</th>
                <th className="text-left p-3 text-muted-foreground font-medium uppercase tracking-wider">Roles</th>
                <th className="p-3 text-muted-foreground font-medium uppercase tracking-wider w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const hasAdmin = u.roles.includes("admin");
                const hasMod = u.roles.includes("moderator");
                return (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="p-3 text-foreground">{u.email}</td>
                    <td className="p-3 text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="p-3">
                      <div className="flex gap-1 flex-wrap">
                        {u.roles.length === 0 && <span className="text-muted-foreground">viewer</span>}
                        {u.roles.map((r) => (
                          <span
                            key={r}
                            className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                              r === "admin"
                                ? "bg-primary/10 border-primary/20 text-primary"
                                : r === "moderator"
                                ? "bg-accent/10 border-accent/20 text-accent"
                                : "bg-secondary border-border text-muted-foreground"
                            }`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleToggleRole(u.id, "admin", hasAdmin)}
                          className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
                            hasAdmin
                              ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                              : "bg-primary/10 text-primary hover:bg-primary/20"
                          }`}
                        >
                          {hasAdmin ? <ShieldOff className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                          {hasAdmin ? "Revoke Admin" : "Make Admin"}
                        </button>
                        <button
                          onClick={() => handleToggleRole(u.id, "moderator", hasMod)}
                          className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
                            hasMod
                              ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                              : "bg-accent/10 text-accent hover:bg-accent/20"
                          }`}
                        >
                          {hasMod ? "Revoke Mod" : "Make Mod"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default UserManagement;
