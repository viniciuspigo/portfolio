import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Brush, DollarSign } from "lucide-react";
import AnimatedTechBackground from "@/components/AnimatedTechBackground";

const timelineItems = [
  {
    year: "2025/2026",
    title: "Luana Nail Design – Agendamentos",
    description:
      "Sistema de agendamento de serviços de unhas, com controle de horários, cadastro de clientes e painel administrativo para gerenciamento de atendimentos.",
    stack: [
      "React",
      "Javascript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Docker",
      "Oracle Cloud",
    ],
    result:
      "Regras de disponibilidade no backend + validação no front para evitar overbooking.",
    icon: <Brush className="w-4 h-4 text-muted-foreground/40" />,
  },
  {
    year: "2025",
    title: "Reembolso – Projeto Acadêmico",
    description:
      "Sistema de Reembolso simples e funcional, focado em organização e controle de solicitações.",
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
    result:
      "Autenticação com JWT do zero e fluxo de solicitações com anexo opcional, com perfis Admin e Usuário.",
    icon: <DollarSign className="w-4 h-4 text-muted-foreground/40" />,
  },
];

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" className="relative px-6 py-28 overflow-hidden">
      <AnimatedTechBackground variant="particles" opacity={0.05} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono text-primary/60 tracking-[0.3em] uppercase mb-3">
            Trajetória
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Linha do <span className="text-gradient">Tempo</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border/30" />
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20"
          />

          <div className="space-y-16">
            {timelineItems.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary glow-blue mt-1.5" />
                </div>

                {/* Card */}
                <div
                  className={`ml-8 md:ml-0 md:w-[calc(50%-2.5rem)] rounded-2xl overflow-hidden group ${
                    i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-accent font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                        {item.year}
                      </span>
                      {item.icon}
                    </div>

                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-mono border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Result */}
                    <div className="mt-4 pt-4 border-t border-border/30 flex items-start gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;