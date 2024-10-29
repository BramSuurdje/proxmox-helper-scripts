"use client";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import Particles from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

function CustomArrowRightIcon() {
  return <ArrowRightIcon className="h-4 w-4" width={1} />;
}

export default function Page() {
  const { theme } = useTheme();

  const [color, setColor] = useState("#000000");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="w-full">
      <Particles
        className="absolute inset-0 -z-40"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <div className="container mx-auto">
        <div className="flex h-[80vh] flex-col items-center justify-center gap-4 py-20 lg:py-40">
          <div>
            <AnimatedGradientText>
              <div
                className={cn(
                  `absolute inset-0 block size-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`,
                  `p-px ![mask-composite:subtract]`,
                )}
              />
              🎉 <Separator className="mx-2 h-4" orientation="vertical" />
              <span
                className={cn(
                  `animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                  `inline`,
                )}
              >
                Redesigned Website
              </span>
            </AnimatedGradientText>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-center text-5xl font-semibold tracking-tighter md:text-7xl">
              Make managing your Homelab a breeze
            </h1>
            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              150+ scripts to help you manage your <b>Proxmox VE environment</b>
              . Whether you&apos;re a seasoned user or a newcomer, Proxmox VE
              Helper Scripts has got you covered.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="/scripts">
              <Button
                size="lg"
                variant="expandIcon"
                Icon={CustomArrowRightIcon}
                iconPlacement="right"
                className="hover:"
              >
                View Scripts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
