import Sidebar from "./_components/Sidebar";

export default async function ScriptLayout({children}: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-3">
        <div className="mt-20 flex sm:px-4 xl:px-0">
          <div className="hidden sm:flex">
            <Sidebar />
          </div>
          <div className="mx-7 w-full sm:mx-0 sm:ml-7">{children}</div>
        </div>
      </div>
    </>
  );
}