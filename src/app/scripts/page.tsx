import React from 'react'
import ScriptPage from './_components/ScriptPage'
import { pb } from '@/lib/pocketbase';
import { Script } from '@/lib/types';
import { Metadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const scriptName = searchParams.id;

  if (!scriptName) {
    return {};
  }

  const script: Script = await pb.collection('proxmox_scripts').getFirstListItem(`title="${scriptName}"`);
  const imageurl = `https://proxmox-helper-scripts.vercel.app/api/og?title=${script.title}&logo=${script.logo}`;

  return {
    title: script.title + " | Proxmox VE Helper-Scripts",
    description: `This script is used to install ${script.title} on your Proxmox VE host. | Proxmox VE Helper-Scripts is a collection of scripts to help manage your Proxmox Virtual Environment. with over 150+ scripts, you are sure to find what you need.`,

    openGraph: {
      title: script.title + " | Proxmox VE Helper-Scripts",
      description: `This script is used to install ${script.title} on your Proxmox VE host. | Proxmox VE Helper-Scripts is a collection of scripts to help manage your Proxmox Virtual Environment. with over 150+ scripts, you are sure to find what you need.`,
      url: `https://proxmox-helper-scripts.vercel.app/scripts?id=${script.title}`,
      images: [
        {
          url: imageurl,
        },
      ],
    },
  }
}

export default function page() {

  return (
    <>
      <ScriptPage />
    </>
  )
}
