import React, { Suspense } from 'react'
import { LatestScripts, MostViewedScripts } from './_components/ScriptInfoBlocks';
import { Loader2 } from 'lucide-react';

export default function page() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Suspense
        fallback={
          <div>
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        }
      >
        <LatestScripts />
      </Suspense>
      <Suspense
        fallback={
          <div>
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        }
      >
        <MostViewedScripts />
      </Suspense>
    </div>
  );
}
