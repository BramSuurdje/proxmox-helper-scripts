import { Button } from '@/components/ui/button';
import handleCopy from '@/lib/handleCopy';
import React from 'react';

interface Item {
  interface?: string;
  port?: number;
}

const CopyButton = ({ label, value }: { label: string; value: string | number }) => (
  <Button
    variant="secondary"
    size="sm"
    onClick={() => handleCopy(label, value)}
  >
    {value}
  </Button>
);

export default function InterFaces({ item }: { item: Item }) {
  const { interface: iface, port } = item;

  return (
    <div className="flex flex-col gap-2">
      {iface || (port && port !== 0) ? (
        <div className="flex items-center justify-end">
          <h2 className="mr-2 text-end text-lg font-semibold">
            {iface ? 'Interface:' : 'Default Port:'}
          </h2>{" "}
          <CopyButton label={iface ? 'interface' : 'port'} value={iface || port!} />
        </div>
      ) : null}
    </div>
  );
}
