import { motion } from "framer-motion";
import profilePhoto from "@/assets/Vinicius_Piras.jfif";
import { Linkedin, ChevronDown } from "lucide-react";
import { MdWhatsapp } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-top" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-float" />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row items-center gap-14">
        {/* Photo with animated ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative shrink-0 group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 scale-110" />
          <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-full p-[2px] bg-gradient-to-br from-primary via-accent/50 to-primary/20">
            <div className="w-full h-full rounded-full overflow-hidden bg-background">
              <img
                src={profilePhoto}
                alt="Vinicius Piras"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-2 w-4 h-4 rounded-full bg-accent animate-pulse-ring" />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center md:text-left space-y-6"
        >
          <div>
            <p className="text-sm font-mono tracking-[0.25em] uppercase mb-3 text-primary/70">
              &lt;Fullstack Developer /&gt;
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
              Vinicius <span className="text-gradient-vivid">Piras</span>
            </h1>
            <div className="mt-3 inline-flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
              <p className="text-primary font-medium text-sm tracking-wide">
                Desenvolvedor Fullstack Júnior • Foco em Frontend
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-lg text-[15px]">
            Olá, sou Vinicius Piras. Desenvolvedor Fullstack Júnior com foco em
            Frontend especializado em TypeScript e React, além de possuir
            conhecimentos sólidos em ferramentas Backend como Node.js, Express,
            Banco de dados e Oracle Cloud.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/in/viniciuspiras/"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-gradient card-glass text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/viniciuspigo"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-gradient card-glass text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              <FaGithub className="w-4 h-4" />
              Github
            </a>
            <a
              href="https://wa.me/5511916625986"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <MdWhatsapp className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
        <span className="text-xs font-mono tracking-wider">scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
