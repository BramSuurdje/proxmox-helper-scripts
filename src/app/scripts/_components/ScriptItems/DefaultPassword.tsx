import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import handleCopy from "@/lib/handleCopy";
import { Script } from "@/lib/types";

export default function DefaultPassword({ item }: { item: Script }) {
  const hasDefaultLogin = item?.expand?.default_login !== undefined;

  return (
    <div>
      {hasDefaultLogin && (
        <div className="mt-4 rounded-lg border bg-accent/50">
          <div className="flex gap-3 px-4 py-2">
            <h2 className="text-lg font-semibold">Default Login Credentials</h2>
          </div>
          <Separator className="w-full"></Separator>
          <div className="flex flex-col gap-2 p-4">
            <p className="mb-2 text-sm">
              You can use the following credentials to login to the {""}
              {item.title} {item.item_type}.
            </p>
            <div className="text-sm">
              Username:{" "}
              <Button
                variant={"secondary"}
                size={"null"}
                onClick={() =>
                  handleCopy("username", item.expand.default_login.username)
                }
              >
                {item.expand.default_login.username}
              </Button>
            </div>
            <div className="text-sm">
              Password:{" "}
              <Button
                variant={"secondary"}
                size={"null"}
                onClick={() =>
                  handleCopy("password", item.expand.default_login.password)
                }
              >
                {item.expand.default_login.password}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
