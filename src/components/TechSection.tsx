import { motion } from "framer-motion";
import AnimatedTechBackground from "@/components/AnimatedTechBackground";

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Tailwind", category: "Frontend" },
  { name: "JavaScript", category: "Linguagem" },
  { name: "TypeScript", category: "Linguagem" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Git", category: "DevOps" },
  { name: "GitHub", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "Oracle Cloud", category: "Cloud" },
  { name: "Figma", category: "Ferramentas" },
  { name: "Postman", category: "Ferramentas" },
];

const categoryColors: Record<string, string> = {
  Frontend: "from-primary to-accent",
  Linguagem: "from-yellow-500 to-orange-500",
  Backend: "from-green-500 to-emerald-500",
  Database: "from-violet-500 to-purple-500",
  DevOps: "from-rose-500 to-pink-500",
  Cloud: "from-red-500 to-orange-500",
  Ferramentas: "from-gray-500 to-gray-700",
};

const TechSection = () => {
  return (
    <section id="skills" className="relative px-6 py-28 overflow-hidden">
      <AnimatedTechBackground variant="particles" opacity={0.05} />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/4 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono text-primary/60 tracking-[0.3em] uppercase mb-3">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Tech <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group card-glass border-gradient rounded-2xl p-5 flex flex-col items-center gap-3 hover:scale-105 transition-all duration-300 cursor-default"
            >
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[tech.category]} opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all`}
              />
              <p className="font-semibold text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </p>
              <p className="text-[10px] font-mono text-muted-foreground/50 tracking-wider uppercase">
                {tech.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSection;
