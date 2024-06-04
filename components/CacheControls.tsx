import { Button } from "@/components/ui/button";

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
    <div className="mt-4 grid animate-fade-up grid-cols-1 gap-4 px-4">
      <div className="text-center">
        {isCacheEnabled ? (
          <>
            <p className="text-xs text-muted-foreground">
              The scripts are cached in your browser to optimize performance.
              Use the button below to re-poll the server for changes.
            </p>
            {cacheExpiryTime && (
              <p className="text-xs text-muted-foreground">
                Cache will expire automatically at{" "}
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
      <div className="flex justify-center space-x-2 py-4">
        {isCacheEnabled ? (
          <>
            <Button variant="outline" onClick={handleForceUpdate}>
              Reload via API
            </Button>
            <Button variant="outline" onClick={toggleCache}>
              Disable Cache
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={toggleCache}>
            Enable Cache
          </Button>
        )}
      </div>
    </div>
  );
};

export default CacheControls;
