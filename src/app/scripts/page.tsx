// import { Metadata } from "next";
import ScriptPage from "./_components/ScriptPage";

export const dynamic = "force-static";

// type Props = {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// };

// export async function generateMetadata(props: Props): Promise<Metadata | null> {
//   const searchParams = await props.searchParams;
//   const scriptName = searchParams.id;

//   if (!scriptName || typeof scriptName !== "string") {
//     return null;
//   }


//   return {
//     title: scriptName + " | Proxmox VE Helper-Scripts",
//     description: `This script is used to install ${scriptName} on your Proxmox VE host. | Proxmox VE Helper-Scripts is a collection of scripts to help manage your Proxmox Virtual Environment. with over 150+ scripts, you are sure to find what you need.`,

//     openGraph: {
//       title: scriptName + " | Proxmox VE Helper-Scripts",
//       description: `This script is used to install ${scriptName} on your Proxmox VE host. | Proxmox VE Helper-Scripts is a collection of scripts to help manage your Proxmox Virtual Environment. with over 150+ scripts, you are sure to find what you need.`,
//       url: `https://proxmoxve-scripts.com/scripts?id=${scriptName}`,
//     },
//   };
// }

export default function page() {
  return (
    <>
      <ScriptPage />
    </>
  );
}
