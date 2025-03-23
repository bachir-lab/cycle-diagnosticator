
import { DiagnosticForm } from "@/components/diagnostic-form";
import { Bike } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border shadow-sm py-4">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bike className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-medium">Vélo Diagnostic</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              A tool for bicycle repair workshops
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl py-8 px-4 md:py-12">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Bicycle Donation Assessment Tool
          </h1>
          <p className="text-xl text-muted-foreground">
            Answer a few questions to determine whether a donated bicycle should be
            refurbished, salvaged for parts, or recycled.
          </p>
        </div>

        <DiagnosticForm />
      </main>

      <footer className="border-t border-border py-6 bg-white/80 backdrop-blur-md">
        <div className="container max-w-7xl text-center text-sm text-muted-foreground">
          <p>
            Developed for Vélocampus to support sustainable cycling initiatives
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
