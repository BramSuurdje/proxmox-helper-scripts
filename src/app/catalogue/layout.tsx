import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center">
      <div className="max-w-8xl mx-6 w-full flex">
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>
        {children}
      </div>
    </section>
  );
}
