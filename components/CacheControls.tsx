import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface CacheControlsProps {
  isCacheEnabled: boolean;
  toggleCache: () => void;
  handleForceUpdate: () => void;
  cacheExpiryTime: Date | null;
}

const CacheControls: React.FC<CacheControlsProps> = ({ isCacheEnabled, toggleCache, handleForceUpdate, cacheExpiryTime }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  if (!initialized) return null;

  return (
    <div className="mt-4 animate-fade-up">
      {isCacheEnabled ? (
        <>
          <p className="text-xs text-muted-foreground">
            The scripts are cached in your browser to optimize performance. Use the button below
            to re-poll the server for changes.
          </p>
          {cacheExpiryTime && (
            <p className="text-xs text-muted-foreground">
              Cache will expire automatically at {cacheExpiryTime.toLocaleTimeString()}
            </p>
          )}
          <div className="flex space-x-2 px-2 py-4">
            <Button variant="outline" onClick={handleForceUpdate}>
              Reload via API
            </Button>
            <Button variant="outline" onClick={toggleCache}>
              Disable Cache
            </Button>
          </div>
        </>
      ) : (
        <div className="mt-4">
          <p className="text-xs text-muted-foreground">
            The cache is disabled. All data will be fetched from the server.
          </p>
          <div className="flex space-x-2 px-2 py-4">
            <Button variant="outline" onClick={toggleCache}>
              Enable Cache
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CacheControls;
