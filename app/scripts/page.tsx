import ScriptItem from "@/components/Script";
import ScriptBrowser from "@/components/ScriptBrowser";
import Particles from "@/components/ui/particles";



export default function Page() {
  return (
    <>
      <Particles
        className="animate-fade-in absolute inset-0 -z-10"
        quantity={100}
      />
      <div className="mt-20 flex max-w-screen sm:max-w-full">
        <div className="hidden sm:flex">
          <ScriptBrowser />
        </div>
        <div className="flex">
          <div className="h-screen w-full">
            <ScriptItem />
          </div>
        </div>
      </div>
    </>
  );
}
