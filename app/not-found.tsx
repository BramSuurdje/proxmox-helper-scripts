import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="grid h-screen place-content-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black">404</h1>
        <p className="text-2xl font-bold tracking-tight sm:text-4xl">Uh-oh!</p>
        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <Button asChild className="mt-6 text-foreground">
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
