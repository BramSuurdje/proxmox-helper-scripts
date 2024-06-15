import { Button } from "@/components/ui/button";
import { DatabaseBackup, Database, DatabaseZap } from "lucide-react";
import { Separator } from "./ui/separator";

interface CacheControlsProps {
  isCacheEnabled: boolean;
  toggleCache: () => void;
  handleForceUpdate: () => void;
  cacheExpiryTime: Date | null;
}

const CacheControls: React.FC<CacheControlsProps> = ({
  isCacheEnabled,
  toggleCache,
  handleForceUpdate,
  cacheExpiryTime,
}) => {
  return (
    <div className="flex flex-col">
      <Separator className="w-screen" />
      <div className="mt-6 grid animate-fade-up grid-cols-1 gap-4 px-4">
        <div className="text-center">
          {isCacheEnabled ? (
            <>
              <p className="text-xs text-muted-foreground">
                The scripts are cached in your browser to optimize performance.
                Use the button below to re-poll the server for changes.
              </p>
              {cacheExpiryTime && (
                <p className="text-xs text-muted-foreground">
                  Cache will expire automatically on{" "}
                  {cacheExpiryTime.toLocaleDateString()} at{" "}
                  {cacheExpiryTime.toLocaleTimeString()}
                </p>
              )}
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              The cache is disabled. All data will be fetched from the server.
            </p>
          )}
        </div>
        <div className="flex justify-center gap-2">
          {isCacheEnabled ? (
            <>
              <Button variant="outline" onClick={handleForceUpdate}>
                <span className="flex items-center space-x-2">
                  <DatabaseBackup className="h-4 w-4" />
                  <span>Reload via API</span>
                </span>
              </Button>
              <Button variant="outline" onClick={toggleCache}>
                <span className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Disable Cache</span>
                </span>
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={toggleCache}>
              <span className="flex items-center space-x-2">
                <DatabaseZap className="h-4 w-4" />
                <span>Enable Cache</span>
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CacheControls;
