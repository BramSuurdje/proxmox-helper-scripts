import CodeCopyButton from '@/components/ui/code-copy-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Script } from '@/lib/types';
import React from 'react'

export default function InstallCommand({ item }: { item: Script }) {
  const hasAlpineScript = item?.expand?.alpine_script !== undefined;

  return (
    <div className="p-4">
      {hasAlpineScript ? (
        <Tabs defaultValue="default" className="mt-2 w-full max-w-4xl">
          <TabsList>
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="alpine">Alpine Linux</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            {item.item_type && (
              <>
                <p className="text-sm">
                  To create a new Proxmox VE {item.title} {item.item_type}, run
                  the command below in the Proxmox VE Shell.
                </p>
              </>
            )}
            <CodeCopyButton>{item.installCommand}</CodeCopyButton>
          </TabsContent>
          <TabsContent value="alpine">
            {item.expand.alpine_script && (
              <>
                <p className="mt-2 max-w-2xl text-sm">
                  As an alternative option, you can use Alpine Linux and the{" "}
                  {item.title} package to create a {item.title} {item.item_type}{" "}
                  container with faster creation time and minimal system
                  resource usage. You are also obliged to adhere to updates
                  provided by the package maintainer.
                </p>
                <p className="mt-2 flex text-sm">
                  To create a new Proxmox VE Alpine-{item.title}{" "}
                  {item.item_type}, run the command below in the Proxmox VE
                  Shell
                </p>
                <CodeCopyButton>
                  {item.expand.alpine_script.installCommand}
                </CodeCopyButton>
              </>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <>
          {item.item_type ? (
            <>
              <p className="text-sm">
                To create a new Proxmox VE {item.title} {item.item_type}, run
                the command below in the Proxmox VE Shell.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm">
                To use the {item.title} script, run the command below in the
                shell.
              </p>
            </>
          )}
          {item.installCommand && <CodeCopyButton>{item.installCommand}</CodeCopyButton>}
        </>
      )}
    </div>
  );
}
