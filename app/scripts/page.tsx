import ScriptItem from "@/components/Script";
import ScriptBrowser from "@/components/ScriptBrowser";
import Particles from "@/components/ui/particles";

export default function Page() {
  return (
    <>
      <Particles
        className="animate-fade-in absolute  inset-0 -z-10"
        quantity={100}
      />
      <div className="min-h-screen mb-3">
        <div className="mt-20 flex  sm:px-7 xl:px-0">
          <div className="hidden sm:flex">
            <ScriptBrowser />
          </div>
          <div className="mx-7 w-full sm:mx-0 sm:ml-7">
            <ScriptItem />
          </div>
        </div>
      </div>
    </>
  );
}
