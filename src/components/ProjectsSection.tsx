import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Eye, Folder, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AnimatedTechBackground from "@/components/AnimatedTechBackground";
import agendamentoThumbnail from "@/assets/Agendamento.png";
import reembolsoThumbnail from "@/assets/reembolso.png";

const projects = [
  {
    name: "Luana Nail Design – Agendamentos",
    description:
      "Sistema de agendamento de serviços de unhas, com controle de horários, cadastro de clientes e painel administrativo para gerenciamento de atendimentos.",
    thumbnail: agendamentoThumbnail,
    stack: [
      "React",
      "Javascript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Docker",
      "Oracle Cloud",
    ],
    github: "https://github.com",
    demo: "https://agendamentos.luananaildesign.com.br/",
    details: {
      sections: [
        {
          title: "Planejamento e Prototipação",
          content:
            "Realizei o planejamento inicial do sistema e desenvolvi protótipos e modelos base no Figma, definindo a estrutura visual, fluxo de navegação e experiência do usuário, servindo como referência para o desenvolvimento da aplicação.",
        },
        {
          title: "Desenvolvimento Full Stack",
          content:
            "Desenvolvi uma aplicação web completa utilizando React e Tailwind CSS no front-end, criando interfaces modernas, responsivas e de fácil utilização. No back-end, utilizei Node.js com Express para construção de APIs REST responsáveis pela lógica de negócio, gerenciamento de agendamentos, usuários e serviços.",
        },
        {
          title: "Arquitetura e Organização do Back-end",
          content:
            "Estruturei o back-end seguindo o padrão de arquitetura MVC, organizando a aplicação em Controllers, Services, Models e Routes, garantindo separação de responsabilidades, melhor organização do código e maior facilidade de manutenção e escalabilidade.",
        },
        {
          title: "Modelagem e Gerenciamento de Banco de Dados",
          content:
            "Projetei e implementei o banco de dados utilizando PostgreSQL via Supabase, criando estruturas relacionais e queries otimizadas para armazenamento e gerenciamento eficiente das informações da aplicação.",
        },
        {
          title: "Configuração de Infraestrutura, Deploy e Segurança",
          content:
            "Configurei e gerenciei uma VPS na Oracle Cloud para hospedagem da aplicação, implementando pipeline de CI/CD com Dokploy para automação de deploy. Também configurei uma VPN utilizando WireGuard para acesso seguro à infraestrutura e maior proteção do ambiente.",
        },
      ],
      video: {
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Demonstração do Sistema de Agendamentos",
      },
    },
  },
  {
    name: "Reembolso – Projeto Acadêmico",
    description:
      "Sistema de Reembolso simples e funcional, focado em organização e controle de solicitações.",
    thumbnail: reembolsoThumbnail,
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL"],
    github: "https://github.com/viniciuspigo/reembolso_project",
    demo: "https://demo.com",
    details: {
      sections: [
        {
          title: "Desenvolvimento Front-end",
          content:
            "Desenvolvi a interface da aplicação utilizando HTML, CSS e JavaScript puro, criando páginas responsivas e funcionais para cadastro, listagem e gerenciamento de solicitações de reembolso. O foco foi em criar uma experiência de usuário simples e intuitiva.",
        },
        {
          title: "Desenvolvimento Back-end",
          content:
            "Implementei o back-end utilizando Node.js com Express.js para criação de APIs REST que gerenciam as operações de reembolso. O banco de dados MySQL foi utilizado para armazenamento das informações de solicitações, usuários e aprovações, garantindo persistência e integridade dos dados.",
        },
      ],
    },
  },
];

type Project = (typeof projects)[number];

const ProjectCard = ({
  project,
  index,
  onDetails,
}: {
  project: Project;
  index: number;
  onDetails: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="group flex flex-col rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
  >
    {/* Project Thumbnail */}
    <div className="relative overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        <motion.img
          src={project.thumbnail}
          alt={project.name}
          className="w-full h-full object-cover brightness-[0.4] saturate-50 group-hover:brightness-100 group-hover:saturate-100 transition-all duration-500"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </AspectRatio>
    </div>

    <div className="p-6 flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <Folder className="w-5 h-5 text-primary/40" />
        <span className="text-[10px] font-mono text-muted-foreground/40">
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
        {project.name}
      </h3>
      <p className="text-sm text-muted-foreground mt-2 flex-1 leading-relaxed">
        {project.description}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-mono border border-border/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/30">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground bg-muted/50 border border-border/50 hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
        >
          <Github className="w-3.5 h-3.5" />
          Código
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground bg-muted/50 border border-border/50 hover:text-foreground hover:border-accent/30 hover:bg-accent/5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Demo
          </a>
        )}
        <button
          onClick={onDetails}
          className="ml-auto inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold text-primary-foreground bg-gradient-to-r from-primary via-primary/90 to-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ring-1 ring-primary/20 hover:ring-primary/40"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Ver Detalhes</span>
          <span className="xs:hidden">Detalhes</span>
        </button>
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-6 py-28 overflow-hidden">
      <AnimatedTechBackground variant="particles" opacity={0.25} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-accent/3 blur-[140px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono text-primary/60 tracking-[0.3em] uppercase mb-3">
            Portfólio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Meus <span className="text-gradient">Projetos</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              onDetails={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-3xl max-h-[85vh] bg-card border-border/60 rounded-2xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-xl font-bold text-gradient">
              {selectedProject?.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedProject?.details && (
            <ScrollArea className="h-[calc(85vh-120px)] px-6 pb-6">
              <div className="space-y-6">
                {/* Video Section (Optional) */}
                {selectedProject.details.video && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h4 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-3">
                        {selectedProject.details.video.title}
                      </h4>
                      <AspectRatio
                        ratio={16 / 9}
                        className="bg-muted rounded-lg overflow-hidden"
                      >
                        <video
                          src={selectedProject.details.video.url}
                          controls
                          preload="metadata"
                          className="w-full h-full object-cover"
                        >
                          Seu navegador não suporta a tag de vídeo.
                        </video>
                      </AspectRatio>
                    </div>
                  </>
                )}

                {/* Project Sections */}
                {selectedProject.details.sections.map((section, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="mb-6" />}
                    <div>
                      <h4 className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-2">
                        {section.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;