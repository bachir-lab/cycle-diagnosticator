
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bike, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 px-4">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Bike className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Button asChild className="diagnostic-button">
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
