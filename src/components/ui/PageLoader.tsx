import { Loader2 } from "lucide-react";

const PageLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-background space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-gold" />
            <p className="text-muted-foreground text-sm animate-pulse">Loading experience...</p>
        </div>
    );
};

export default PageLoader;
