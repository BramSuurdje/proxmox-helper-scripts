import Image from "next/image";
import { extractDate } from "@/lib/time";
import CloseButton from "@/components/closeButton";
import { Separator } from "@/components/ui/separator";
import DefaultSettings from "../_components/ScriptItems/DefaultSettings";
import InterFaces from "../_components/ScriptItems/InterFaces";
import Buttons from "../_components/ScriptItems/Buttons";
import Description from "../_components/ScriptItems/Description";
import Alerts from "../_components/ScriptItems/Alerts";
import Tooltips from "../_components/ScriptItems/Tooltips";
import InstallCommand from "../_components/ScriptItems/InstallCommand";
import DefaultPassword from "../_components/ScriptItems/DefaultPassword";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const data = await fetch(`http://localhost:3000/api/scripts/script?title=${id}`).then((res) => res.json());
  const imgURL = `http://localhost:3000/api/og?title=${data.title}?logo=${data.logo}`;

  return {
    title: `${data.title} | Proxmox VE Helper-Scripts`,
    description: `This script will fully install and configure ${data.title} on your Proxmox VE host.`,
    openGraph: {
      title: `${data.title} | Proxmox VE Helper-Scripts`,
      description: `This script will fully install and configure ${data.title} on your Proxmox VE host.`,
      images: [
        {
          url: imgURL,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetch(
    `http://localhost:3000/api/scripts/script?title=${params.id}`,
  ).then((res) => res.json());
  return (
    <div>
      {data && (
        <div className="mr-7 mt-0 flex w-full min-w-fit">
          <div className="flex w-full min-w-fit">
            <div className="flex w-full flex-col">
              <div className="datas-center flex h-[36px] min-w-max justify-between">
                <h2 className="text-lg font-semibold">Selected Script</h2>
                <CloseButton />
              </div>
              <div className="rounded-lg border bg-accent/20 p-4">
                <div className="flex justify-between">
                  <div className="flex">
                    <Image
                      className="h-32 w-32 rounded-lg bg-accent/60 object-contain p-3 shadow-md"
                      src={data.logo}
                      width={400}
                      height={400}
                      alt={data.title}
                      priority
                    />
                    <div className="ml-4 flex flex-col justify-between">
                      <div className="flex h-full w-full flex-col justify-between">
                        <div>
                          <h1 className="text-lg font-semibold">{data.title}</h1>
                          <p className="w-full text-sm text-muted-foreground">
                            Date added: {extractDate(data.created)}
                          </p>
                        </div>
                        <div className="flex gap-5">
                          <DefaultSettings item={data} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden flex-col justify-between gap-2 sm:flex">
                    <InterFaces item={data} />
                    <Buttons item={data} />
                  </div>
                </div>
                <Separator className="mt-4" />
                <div>
                  <div className="mt-4">
                    <Description item={data} />
                    <Alerts item={data} />
                  </div>
                  <div className="mt-4 rounded-lg border bg-accent/50">
                    <div className="flex gap-3 px-4 py-2">
                      <h2 className="text-lg font-semibold">
                        How to {data.data_type ? "install" : "use"}
                      </h2>
                      <Tooltips item={data} />
                    </div>
                    <Separator className="w-full"></Separator>
                    <InstallCommand item={data} />
                  </div>
                </div>
                <DefaultPassword item={data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
