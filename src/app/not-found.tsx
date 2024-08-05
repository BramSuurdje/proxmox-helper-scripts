"use client";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-background px-4 md:px-6">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          404
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Oops, the page you are looking for could not be found.
        </p>
      </div>
      <Button onClick={() => window.history.back()} variant="secondary">
        Go Back
      </Button>
    </div>
  );
}
