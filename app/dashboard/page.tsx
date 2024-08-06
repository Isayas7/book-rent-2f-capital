import AdminDashboard from "@/components/dashboard/admin-dashboard";
import OwnerDashboard from "@/components/dashboard/owner-dashboard";


export default function Dashboard() {
  const role = "owner";
  return (
    <>
      {role !== "owner" ? (
        <AdminDashboard />
      ) : role === "owner" ? (
        <OwnerDashboard />
      ) : (
        ""
      )}
    </>
  );
}
