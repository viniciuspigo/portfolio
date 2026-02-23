import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechSection from "@/components/TechSection";

const Index = () => {
  const actualYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <div className="w-full max-w-5xl mx-auto h-px bg-border" />
      <TimelineSection />
      <div className="w-full max-w-5xl mx-auto h-px bg-border" />
      <ProjectsSection />
      <div className="w-full max-w-5xl mx-auto h-px bg-border" />
      <TechSection />
      <footer className="py-12 text-center text-sm text-muted-foreground border-t border-border">
        <p>© {actualYear} Vinicius Piras. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
