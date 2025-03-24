
import { DiagnosticForm } from "@/components/diagnostic-form";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50/50 via-green-50/30 to-green-100/20">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-border/70 shadow-sm py-4">
        <div className="container max-w-7xl">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/lovable-uploads/6e76aa05-4dab-4b0a-8fc5-036599ea3ce1.png" 
                alt="Vélocampus Nantes" 
                className="h-12 w-auto drop-shadow-sm"
              />
            </motion.div>
            <motion.div 
              className="text-sm font-medium px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-100 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Un outil pour les ateliers vélo
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl py-8 px-4 md:py-12">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-green-800 drop-shadow-sm">
            Outil d'Évaluation des Dons de Vélos
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Répondez à quelques questions pour déterminer si un vélo donné doit être
            remis à neuf, récupéré pour ses pièces, ou recyclé.
          </p>
        </motion.div>

        <DiagnosticForm />
      </main>

      <footer className="border-t border-border/70 py-6 bg-white/90 backdrop-blur-md mt-8">
        <div className="container max-w-7xl text-center">
          <p className="text-sm text-muted-foreground">
            Développé pour <span className="font-medium text-green-700">Vélocampus</span> pour soutenir les initiatives de cyclisme durable
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            © {new Date().getFullYear()} Vélocampus Nantes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
