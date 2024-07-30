import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center">
      <div className="max-w-7xl w-full flex">
        <Sidebar />
        {children}
      </div>
    </section>
  );
}
