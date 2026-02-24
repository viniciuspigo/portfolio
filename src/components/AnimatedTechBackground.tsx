import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number;
  baseY: number;
}

interface AnimatedTechBackgroundProps {
  variant?: "dots" | "grid" | "particles";
  opacity?: number;
}

const AnimatedTechBackground = ({ 
  variant = "particles",
  opacity = 0.15 
}: AnimatedTechBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000);
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.offsetWidth;
        const y = Math.random() * canvas.offsetHeight;
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      if (variant === "grid") {
        drawGrid(ctx, canvas.offsetWidth, canvas.offsetHeight);
      } else if (variant === "dots") {
        drawDots(ctx, canvas.offsetWidth, canvas.offsetHeight);
      } else {
        drawConnectedParticles(ctx, canvas.offsetWidth, canvas.offsetHeight);
      }
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const gridSize = 60;
      const primaryColor = `rgba(59, 130, 246, ${opacity * 0.4})`;
      const accentColor = `rgba(56, 189, 248, ${opacity * 0.2})`;
      const mouse = mouseRef.current;
      const mouseRadius = 150;

      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 0.5;

      // Linhas verticais com deformação do mouse
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 10) {
          const distToMouse = Math.sqrt(Math.pow(x - mouse.x, 2) + Math.pow(y - mouse.y, 2));
          const mouseEffect = Math.max(0, 1 - distToMouse / mouseRadius);
          const offsetX = Math.sin(Date.now() / 1000 + x / 100) * 3 + mouseEffect * 20;
          const offsetY = mouseEffect * 15;
          
          if (y === 0) {
            ctx.moveTo(x + offsetX, y + offsetY);
          } else {
            ctx.lineTo(x + offsetX, y + offsetY);
          }
        }
        ctx.stroke();
      }

      // Linhas horizontais com deformação do mouse
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const distToMouse = Math.sqrt(Math.pow(x - mouse.x, 2) + Math.pow(y - mouse.y, 2));
          const mouseEffect = Math.max(0, 1 - distToMouse / mouseRadius);
          const offsetY = Math.cos(Date.now() / 1000 + y / 100) * 3 + mouseEffect * 20;
          const offsetX = mouseEffect * 15;
          
          if (x === 0) {
            ctx.moveTo(x + offsetX, y + offsetY);
          } else {
            ctx.lineTo(x + offsetX, y + offsetY);
          }
        }
        ctx.stroke();
      }

      // Pontos de intersecção com efeito de mouse
      ctx.fillStyle = accentColor;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const distToMouse = Math.sqrt(Math.pow(x - mouse.x, 2) + Math.pow(y - mouse.y, 2));
          const mouseEffect = Math.max(0, 1 - distToMouse / mouseRadius);
          const pulse = Math.sin(Date.now() / 800 + x / 50 + y / 50) * 0.5 + 0.5;
          const size = 1.5 + mouseEffect * 3;
          
          ctx.globalAlpha = (pulse + mouseEffect * 0.8) * opacity;
          ctx.fillStyle = mouseEffect > 0.3 
            ? `rgba(56, 189, 248, ${opacity})` 
            : accentColor;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const drawDots = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const spacing = 40;
      const time = Date.now() / 1000;
      const mouse = mouseRef.current;
      const mouseRadius = 120;

      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          const distance = Math.sqrt(
            Math.pow(x - width / 2, 2) + Math.pow(y - height / 2, 2)
          );
          const distToMouse = Math.sqrt(
            Math.pow(x - mouse.x, 2) + Math.pow(y - mouse.y, 2)
          );
          const mouseEffect = Math.max(0, 1 - distToMouse / mouseRadius);
          
          const wave = Math.sin(time + distance / 100) * 0.5 + 0.5;
          const size = (1 + wave * 1.5) * (1 + mouseEffect * 2);
          const alpha = ((0.3 + wave * 0.4) + mouseEffect * 0.6) * opacity;

          // Ripple effect ao redor do mouse
          if (mouseEffect > 0.1) {
            const ripple = Math.sin(time * 5 - distToMouse / 10) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(56, 189, 248, ${alpha * ripple})`;
            ctx.beginPath();
            ctx.arc(x, y, size + ripple * 2, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawConnectedParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const particles = particlesRef.current;
      const maxDistance = 150;
      const mouse = mouseRef.current;
      const mouseRadius = 100;

      // Atualizar posições com efeito de repulsão do mouse
      particles.forEach((p) => {
        // Distância ao mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        if (distToMouse < mouseRadius && distToMouse > 0) {
          // Repelir partículas
          const force = (mouseRadius - distToMouse) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.5;
          p.vy += Math.sin(angle) * force * 0.5;
        }

        // Aplicar velocidade
        p.x += p.vx;
        p.y += p.vy;

        // Retornar suavemente à posição base
        const dxBase = p.baseX - p.x;
        const dyBase = p.baseY - p.y;
        p.vx += dxBase * 0.01;
        p.vy += dyBase * 0.01;

        // Adicionar fricção
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Manter dentro dos limites
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      });

      // Desenhar conexões
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Verificar se a linha está próxima do mouse
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const distMidToMouse = Math.sqrt(
              Math.pow(midX - mouse.x, 2) + Math.pow(midY - mouse.y, 2)
            );
            const mouseEffect = Math.max(0, 1 - distMidToMouse / mouseRadius);
            
            const alpha = (1 - distance / maxDistance) * opacity * (0.4 + mouseEffect * 0.6);
            ctx.strokeStyle = mouseEffect > 0.3
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(59, 130, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Desenhar partículas
      particles.forEach((p) => {
        const distToMouse = Math.sqrt(
          Math.pow(p.x - mouse.x, 2) + Math.pow(p.y - mouse.y, 2)
        );
        const mouseEffect = Math.max(0, 1 - distToMouse / mouseRadius);
        const enhancedSize = p.size * (1 + mouseEffect * 1.5);
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, enhancedSize * 2);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * (0.8 + mouseEffect * 0.4)})`);
        gradient.addColorStop(0.5, `rgba(56, 189, 248, ${opacity * (0.4 + mouseEffect * 0.4)})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, enhancedSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo da partícula
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * (0.6 + mouseEffect * 0.4)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, enhancedSize / 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      drawParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [variant, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default AnimatedTechBackground;