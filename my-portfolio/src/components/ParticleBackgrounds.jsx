import React, { useEffect, useRef } from 'react';

// Option 1: Floating Particles with Connection Lines (Current)
export const FloatingParticles = () => {
const canvasRef = useRef(null);

useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.originalSize = this.size;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;

        this.size = this.originalSize + Math.sin(Date.now() * 0.003) * 0.5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 180, 0, ${this.opacity})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 180, 0, ${this.opacity * 0.3})`;
        ctx.fill();
    }
    }

    const particles = [];
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));

    for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
    ));
    }

    let mouse = { x: null, y: null, radius: 120 };
    
    canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    });

    canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    });

    const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();

        if (mouse.x !== null) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            particle.x -= directionX * force * 1.5;
            particle.y -= directionY * force * 1.5;
        }
        }
    });

    particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.4;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 180, 0, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        });
    });

    animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
    window.removeEventListener('resize', resizeCanvas);
    cancelAnimationFrame(animationFrameId);
    };
}, []);

return (
    <canvas
    ref={canvasRef}
    style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
    }}
    />
);
};

// Option 2: Starfield with Parallax
export const Starfield = () => {
const canvasRef = useRef(null);

useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.8 + 0.2;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
        this.y = 0;
          this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
    }

    const stars = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(30, 30, 47, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

// Option 3: Geometric Shapes
export const GeometricShapes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Shape {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.type = Math.floor(Math.random() * 3); // 0: triangle, 1: square, 2: circle
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        switch (this.type) {
          case 0: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(-this.size, this.size);
            ctx.lineTo(this.size, this.size);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 180, 0, 0.6)';
            ctx.fill();
            break;
          case 1: // Square
            ctx.fillStyle = 'rgba(127, 219, 255, 0.6)';
            ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
            break;
          case 2: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 180, 0, 0.4)';
            ctx.fill();
            break;
        }
        ctx.restore();
      }
    }

    const shapes = [];
    const shapeCount = 15;

    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new Shape());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        shape.update();
        shape.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

// Option 4: Interactive Bubbles
export const InteractiveBubbles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Bubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 20;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= this.size || this.x >= canvas.width - this.size) this.vx *= -1;
        if (this.y <= this.size || this.y >= canvas.height - this.size) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 180, 0, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const bubbles = [];
    const bubbleCount = 20;

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble());
    }

    let mouse = { x: null, y: null };
    
    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();

        if (mouse.x !== null) {
          const dx = mouse.x - bubble.x;
          const dy = mouse.y - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            bubble.x += dx * force * 0.02;
            bubble.y += dy * force * 0.02;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}; 