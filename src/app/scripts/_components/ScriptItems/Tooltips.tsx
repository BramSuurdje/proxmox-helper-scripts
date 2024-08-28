import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Script } from '@/lib/types';
import React from 'react'

interface TooltipProps {
  variant: "warning" | "success";
  label: string;
  content: string;
}

const TooltipBadge: React.FC<TooltipProps> = ({ variant, label, content }) => (
  <TooltipProvider>
    <Tooltip delayDuration={100}>
      <TooltipTrigger className="flex items-center">
        <Badge variant={variant}>{label}</Badge>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-sm">
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function Tooltips({ item }: { item: Script }) {
  return (
    <div className="flex items-center gap-2">
      {item.privileged && 
        <TooltipBadge
          variant="warning"
          label="Privileged"
          content="This script will be run in a privileged LXC"
        />
      }
      {item.isUpdateable && (
        <TooltipBadge
          variant="success"
          label="Updateable"
          content={`To Update ${item.title}, run the command below (or type update) in the LXC Console.`}
        />
      )}
    </div>
  );
}
