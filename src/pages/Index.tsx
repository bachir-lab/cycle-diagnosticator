
import { DiagnosticForm } from "@/components/diagnostic-form";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border shadow-sm py-4">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/6e76aa05-4dab-4b0a-8fc5-036599ea3ce1.png" 
                alt="Vélocampus Nantes" 
                className="h-10 w-auto"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Un outil pour les ateliers de réparation de vélos
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl py-8 px-4 md:py-12">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Outil d'Évaluation des Dons de Vélos
          </h1>
          <p className="text-xl text-muted-foreground">
            Répondez à quelques questions pour déterminer si un vélo donné doit être
            remis à neuf, récupéré pour ses pièces, ou recyclé.
          </p>
        </div>

        <DiagnosticForm />
      </main>

      <footer className="border-t border-border py-6 bg-white/80 backdrop-blur-md">
        <div className="container max-w-7xl text-center text-sm text-muted-foreground">
          <p>
            Développé pour Vélocampus pour soutenir les initiatives de cyclisme durable
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
