import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Script } from '@/lib/types';
import React from 'react'

export default function Tooltips({ item }: { item: Script }) {
  return (
    <div className="flex items-center gap-2">
      {item.privileged && (
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger className="flex items-center">
              <Badge variant={"warning"}>Privileged</Badge>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-sm">
              This script will be run in a privileged LXC
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {item.isUpdateable && (
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger className="flex items-center">
              <Badge variant={"success"}>Updateable</Badge>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-sm">
              To Update {item.title}, run the command below (or type update) in
              the LXC Console.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
