import React from 'react'
import ScriptPage from './_components/ScriptPage'
import { Metadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata | null> {
  const scriptName = searchParams.id;

  if (!scriptName || typeof scriptName !== 'string') {
    return null;
  }

  const imageurl = `https://proxmoxve-scripts.com/api/og?title=${scriptName}`;

  return {
    title: scriptName + " | Proxmox VE Helper-Scripts",
    description: `This script is used to install ${scriptName} on your Proxmox VE host. | Proxmox VE Helper-Scripts is a collection of scripts to help manage your Proxmox Virtual Environment. with over 150+ scripts, you are sure to find what you need.`,

    openGraph: {
      title: scriptName + " | Proxmox VE Helper-Scripts",
      description: `This script is used to install ${scriptName} on your Proxmox VE host. | Proxmox VE Helper-Scripts is a collection of scripts to help manage your Proxmox Virtual Environment. with over 150+ scripts, you are sure to find what you need.`,
      url: `https://proxmoxve-scripts.com/scripts?id=${scriptName}`,
      images: [
        {
          url: imageurl,
        },
      ],
    },
  };
}

export default function page() {

  return (
    <>
      <ScriptPage />
    </>
  )
}
