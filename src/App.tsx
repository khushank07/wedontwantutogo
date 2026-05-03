import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Heart, 
  MapPin, 
  BookOpen, 
  Users, 
  Gamepad2, 
  Camera, 
  MessageCircle, 
  Printer, 
  AlertCircle,
  Play,
  Volume2,
  VolumeX,
  ChevronRight,
  GraduationCap,
  Maximize2,
  Minimize2,
  ArrowUp,
  ArrowLeft
} from 'lucide-react';

// --- Types ---
type Scene = 'landing' | 'journey';

// --- Sub-components ---

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#1a0a1a]">
      {/* Dynamic Radial Gradients from theme */}
      <div className="absolute inset-0">
        <div className="absolute top-[30%] left-[20%] w-[80%] h-[80%] rounded-full bg-[#ec4899]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[70%] h-[70%] rounded-full bg-[#f43f5e]/20 blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-[#0f172a]/40 blur-[100px] pointer-events-none" />
      </div>
      
      {/* Particles from theme */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-30 pointer-events-none"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Landing = ({ onStart }: { onStart: () => void; key?: string }) => {
  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="text-pink-400 text-xs font-bold tracking-[0.4em] uppercase mb-4 block animate-pulse">Dedicated to Our Favorites</span>
        <h1 className="text-5xl md:text-9xl font-bold text-white tracking-tighter leading-none mb-12 glow-text uppercase italic">
          Farewell<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300 text-6xl md:text-9xl block">
            Chronicles
          </span>
        </h1>
        <p className="text-white/40 mb-12 max-w-xl mx-auto italic font-serif text-lg">
          "A small tribute to the ones who made the chaos bearable. We will miss you."
        </p>
      </motion.div>

      <motion.button
        onClick={onStart}
        className="group relative px-10 py-4 btn-primary-gradient rounded-full text-white font-bold tracking-widest uppercase text-sm transition-all hover:scale-105 flex items-center gap-3 shadow-[0_0_30px_rgba(236,72,153,0.4)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Enter Memories</span>
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
};

const JourneyTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const events = [
    { title: "First Meeting", date: "aug 2025(TB101)", msg: "The day it all started. Awkward hellos turned into endless memories with Diksha, Sargam and Komal Dii.", icon: Users, color: "bg-pink-500", detail: "We didn't know then that these three would become our backbone in college." },
    { title: "Taana Sessions", date: "january-infinity", msg: "Those 'friendly roasts' that made our bond stronger and laughter louder.", icon: MessageCircle, color: "bg-rose-500", detail: "Komal Dii's wisdom mixed with Sargam and Diksha's roasts made the best memories." },
    { title: "CSM Lab Moments", date: "2nd sem", msg: "Debug sessions that turned into life discussions .", icon: BookOpen, color: "bg-pink-400", detail: "The lab wasn't about the code, it was about the tea and talk during slow compilations." },
    { title: "Dissertation Struggles", date: "Jan 2024", msg: "Coffee, tears, and 'Why are we doing this?' collectively during the final stretch.", icon: AlertCircle, color: "bg-rose-400", detail: "Standing by each other when the deadlines felt impossible to meet." },
    { title: "Fun Chaos", date: " 1st year", msg: "the unfiltered laughter that echoed in the halls.", icon: Gamepad2, color: "bg-pink-300", detail: "Every outing with you guys was a masterclass in having fun despite the stress." },
    { title: "Farewell Day", date: "Today", msg: "Not an end, just a new chapter for Diksha, Sargam and Komal Dii. We will miss you!", icon: GraduationCap, color: "bg-white", detail: "The college feels empty already. Go conquer the world, we are cheering for you!" },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative group/timeline text-white" id="road">
      <div className="mb-16 text-center">
        <span className="text-pink-400 text-xs font-bold tracking-[0.4em] uppercase mb-4 block">To our Stars</span>
        <h2 className="text-5xl font-bold tracking-tight text-white mb-6 glow-text">Diksha, Sargam & Komal Dii</h2>
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto" />
      </div>

      <div className="relative">
        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full glass text-white/50 hover:text-white transition-all -ml-4 md:-ml-8"
        >
          <motion.div animate={{ x: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronRight size={24} className="rotate-180" />
          </motion.div>
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full glass text-white/50 hover:text-white transition-all -mr-4 md:-mr-8"
        >
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronRight size={24} />
          </motion.div>
        </button>

        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-pink-500/20 -translate-y-1/2 hidden md:block" />
        
        <div 
          ref={scrollRef}
          className="flex flex-row gap-8 overflow-x-auto pb-12 no-scrollbar px-12 snap-x snap-mandatory"
        >
          {events.map((event, i) => (
            <motion.div 
              key={i}
              className="min-w-[300px] md:min-w-[400px] flex-shrink-0 relative group cursor-pointer snap-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedEvent(i)}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                <motion.div 
                  className={`w-4 h-4 rounded-full ${event.color} shadow-[0_0_15px_rgba(244,63,94,0.5)] border-4 border-[#1a0a1a] relative`}
                  whileHover={{ scale: 1.8 }}
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    scale: selectedEvent === i ? 1.8 : 1,
                    boxShadow: selectedEvent === i 
                      ? "0 0 25px rgba(236,72,153,0.8)" 
                      : "0 0 15px rgba(236,72,153,0.3)"
                  }}
                >
                  {selectedEvent === i && (
                    <motion.div 
                      layoutId="pulse"
                      className="absolute inset-0 rounded-full bg-current opacity-40"
                      animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.div>
              </div>

              <div className={`glass p-8 rounded-[32px] transition-all relative overflow-hidden ${selectedEvent === i ? 'ring-2 ring-pink-500/50 bg-pink-500/10' : 'group-hover:border-pink-500/50 group-hover:bg-pink-500/5'}`}>
                {selectedEvent === i && (
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent"
                  />
                )}
                <div className={`w-14 h-14 rounded-2xl ${event.color} flex items-center justify-center mb-6 text-[#1a0a1a] shadow-lg`}>
                  <event.icon size={28} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-pink-400 mb-2">{event.date}</p>
                <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-sans">{event.msg}</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-pink-400 uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  <Heart size={12} className="fill-current" /> Tap for detailed memory
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#1a0a1a]/95 backdrop-blur-xl"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, rotateX: 20 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, y: 20, rotateX: 20 }}
              className="glass max-w-lg w-full p-12 rounded-[48px] relative overflow-hidden border-pink-500/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-pink-500 to-rose-500" />
              <div className={`w-20 h-20 rounded-[2rem] ${events[selectedEvent].color} flex items-center justify-center mb-8 text-[#1a0a1a] mx-auto shadow-2xl scale-110`}>
                {React.createElement(events[selectedEvent].icon, { size: 40 })}
              </div>
              <h3 className="text-3xl font-bold text-white text-center mb-2 glow-text tracking-tight">{events[selectedEvent].title}</h3>
              <p className="text-xs font-bold text-center text-pink-400 uppercase tracking-[0.3em] mb-8">{events[selectedEvent].date}</p>
              <div className="relative">
                <p className="text-white/90 text-center text-xl italic font-serif leading-relaxed mb-10 px-4">
                  "{events[selectedEvent].detail}"
                </p>
                <div className="absolute -top-4 -left-2 text-pink-500/20 text-6xl font-serif">"</div>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="w-full py-5 btn-primary-gradient rounded-full text-xs font-bold uppercase tracking-[0.4em] text-white shadow-xl hover:scale-[1.02] transition-transform"
              >
                Close Moment
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ThesisRunner = () => {
  const [gameState, setGameState] = useState<'select' | 'playing' | 'gameover' | 'win'>('select');
  const [selectedChar, setSelectedChar] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [evidence, setEvidence] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [msgPopup, setMsgPopup] = useState<{ text: string, color: string } | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    player: { x: 80, y: 180, vy: 0, onGround: true, animFrame: 0 },
    obstacles: [] as any[],
    collectibles: [] as any[],
    particles: [] as any[],
    frame: 0,
    gameSpeed: 3,
    invincible: 0,
    cheers: [] as any[]
  });

  const chars = {
    komal: { emoji: '👩‍🔬', name: 'KOMAL', color: '#ec4899', jumpPower: 12, shield: false, role: 'forensic Expert' },
    diksha: { emoji: '🕵️‍♀️', name: 'DIKSHA', color: '#f43f5e', jumpPower: 14, shield: false, role: 'forensic Analyst' },
    sargam: { emoji: '👩‍🔬', name: 'SARGAM', color: '#ff7eb9', jumpPower: 12, shield: true, role: 'forensic Specialist' },
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const obstacleTypes = [
    { label: 'THESIS', emoji: '📋', w: 28, h: 36, color: '#f43f5e', msg: 'THESIS DEADLINE!' },
    { label: 'PROF', emoji: '👨‍🏫', w: 26, h: 42, color: '#ec4899', msg: 'FACULTY SPOTTED!' },
    { label: 'MONKEY', emoji: '🐒', w: 30, h: 32, color: '#e11d48', msg: 'CAMPUS MONKEY ATTACK!' },
    { label: 'DAL CHAWAL', emoji: '🍛', w: 28, h: 28, color: '#db2777', msg: 'SOGGY DAL CHAWAL!' },
    { label: 'MESS SABZI', emoji: '🍲', w: 28, h: 28, color: '#f472b6', msg: 'WATERY MESS SABZI!' },
  ];

  const collectTypes = [
    { label: '❤️', pts: 10, color: '#f43f5e', msg: '+10 Love Received!' },
    { label: '🔍', pts: 5, color: '#00ff88', msg: '+5 Evidence Collected!' },
    { label: '📸', pts: 15, color: '#ffdd57', msg: '+15 Scene Photographed!' },
  ];

  const cheerPool = [
    { who: 'KHUSHANK', text: 'U CAN DO THIS DIII!!!' },
    { who: 'ISHA', text: 'MISS ME MOREEEE' },
    { who: 'KHUSHANK', text: 'JUMP THE MONKEY! 🐒' },
    { who: 'ISHA', text: 'DODGE THE MESS FOOD! 🍛' },
  ];

  const showMsg = (text: string, color: string) => {
    setMsgPopup({ text, color });
    setTimeout(() => setMsgPopup(null), 2000);
  };

  const startGame = (charKey: string) => {
    const char = (chars as any)[charKey];
    setSelectedChar(char);
    setGameState('playing');
    toggleFullScreen();
    setScore(0);
    setEvidence(0);
    setLives(3);
    stateRef.current = {
      player: { x: 80, y: 180, vy: 0, onGround: true, animFrame: 0 },
      obstacles: [],
      collectibles: [],
      particles: [],
      frame: 0,
      gameSpeed: 3,
      invincible: 0,
      cheers: []
    };
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const GROUND = H - 32;

    let animId: number;

    const spawnParticles = (x: number, y: number, color: string) => {
      for (let i = 0; i < 6; i++) {
        stateRef.current.particles.push({
          x, y, vx: (Math.random() - 0.5) * 5, vy: -(Math.random() * 4 + 1),
          color, life: 30, size: Math.random() * 3 + 2
        });
      }
    };

    const loop = () => {
      const s = stateRef.current;
      s.frame++;
      s.gameSpeed = Math.min(8, 3 + s.frame * 0.0005);

      // Physics
      if (!s.player.onGround) {
        s.player.vy += 0.6;
        s.player.y += s.player.vy;
        if (s.player.y >= GROUND) {
          s.player.y = GROUND;
          s.player.vy = 0;
          s.player.onGround = true;
        }
      }
      if (s.invincible > 0) s.invincible--;

      // Obstacle Spawning
      if (s.frame % Math.max(40, Math.floor(100 - s.frame * 0.01)) === 0) {
        const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        s.obstacles.push({ ...type, x: W + 50, y: GROUND - type.h + 8 });
      }

      // Collectible Spawning
      if (s.frame % 120 === 0) {
        const type = collectTypes[Math.floor(Math.random() * collectTypes.length)];
        s.collectibles.push({ ...type, x: W + 50, y: Math.random() < 0.5 ? GROUND - 40 : GROUND - 80 });
      }

      // Cheer Spawning
      if (Math.random() < 0.005) {
        const cheer = cheerPool[Math.floor(Math.random() * cheerPool.length)];
        s.cheers.push({ ...cheer, x: W + 20, y: 50 + Math.random() * 40, life: 180 });
      }

      // Update State
      s.obstacles.forEach((o, i) => {
        o.x -= s.gameSpeed;
        if (o.x < -60) s.obstacles.splice(i, 1);
        
        // Collision
        if (s.invincible === 0 && o.x < s.player.x + 20 && o.x + o.w > s.player.x - 20 && s.player.y > GROUND - o.h) {
          if (selectedChar.shield && evidence >= 20) {
            setEvidence(e => e - 20);
            showMsg('🛡️ SHIELD SAVED YOU!', '#00ff88');
          } else {
            setLives(l => {
              if (l <= 1) {
                setGameState('gameover');
                setHighScore(h => Math.max(h, s.frame));
                return 0;
              }
              return l - 1;
            });
            s.invincible = 60;
            showMsg(o.msg, '#ff6b6b');
          }
          s.obstacles.splice(i, 1);
          spawnParticles(s.player.x, s.player.y, '#ff4444');
        }
      });

      s.collectibles.forEach((c, i) => {
        c.x -= s.gameSpeed;
        if (c.x < -60) s.collectibles.splice(i, 1);
        if (Math.abs(c.x - s.player.x) < 30 && Math.abs(c.y - (s.player.y - 20)) < 30) {
          setScore(sc => sc + c.pts);
          setEvidence(e => e + c.pts);
          showMsg(c.msg, c.color);
          s.collectibles.splice(i, 1);
          spawnParticles(s.player.x, s.player.y, c.color);
        }
      });

      s.cheers.forEach((c, i) => {
        c.x -= 2;
        c.life--;
        if (c.life <= 0) s.cheers.splice(i, 1);
      });

      s.particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life--;
        if (p.life <= 0) s.particles.splice(i, 1);
      });

      setScore(s.frame);

      // Draw
      ctx.clearRect(0, 0, W, H);
      
      // Ground
      ctx.strokeStyle = '#ec489933';
      ctx.beginPath(); ctx.moveTo(0, GROUND + 8); ctx.lineTo(W, GROUND + 8); ctx.stroke();

      // Cheers
      ctx.font = '10px sans-serif';
      s.cheers.forEach(c => {
        ctx.fillStyle = '#ffdd57';
        ctx.fillText(`📣 ${c.who}: ${c.text}`, c.x, c.y);
      });

      // Obstacles
      ctx.font = '24px sans-serif';
      s.obstacles.forEach(o => {
        ctx.fillText(o.emoji, o.x, o.y + o.h);
      });

      // Collectibles
      ctx.font = '20px sans-serif';
      s.collectibles.forEach(c => {
        ctx.fillText(c.label, c.x, c.y);
      });

      // Particles
      s.particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 30;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Player
      if (s.invincible > 0 && Math.floor(s.frame / 5) % 2 === 0) ctx.globalAlpha = 0.3;
      ctx.font = '32px sans-serif';
      ctx.fillText(selectedChar.emoji, s.player.x - 16, s.player.y + 4);
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, selectedChar, evidence]);

  const jump = () => {
    if (stateRef.current.player.onGround) {
      stateRef.current.player.vy = -selectedChar.jumpPower;
      stateRef.current.player.onGround = false;
    }
  };

  return (
    <section className="py-24 px-4 overflow-hidden" id="game">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <div className="mb-12 flex items-end justify-between px-4">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-white mb-2 glow-text tracking-widest uppercase">Forensic Runners</h2>
            <p className="text-pink-300 font-bold text-[10px] uppercase tracking-widest">Survive the Campus & Submit the Thesis</p>
          </div>
          <button 
            onClick={toggleFullScreen}
            className="p-3 glass rounded-2xl text-pink-400 hover:text-white transition-colors"
            title="Toggle View Mode"
          >
            {isFullScreen ? <Users size={18} /> : <Gamepad2 size={18} />}
          </button>
        </div>

        <div className="relative aspect-[21/9] bg-[#1a0a1a]/60 rounded-[32px] glass overflow-hidden shadow-2xl flex items-center justify-center">
          {gameState === 'select' && (
            <div className="p-8 text-center w-full max-w-2xl bg-gradient-to-b from-pink-500/5 to-transparent">
              <h3 className="text-xl font-bold text-white mb-8 tracking-widest uppercase glow-text">Select Your Runner</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(chars).map(([key, char]) => (
                  <button 
                    key={key}
                    onClick={() => startGame(key)}
                    className="glass p-6 rounded-3xl border-pink-500/10 hover:border-pink-500/50 transition-all group hover:bg-pink-500/10 active:scale-95"
                  >
                    <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">{char.emoji}</span>
                    <div className="text-white font-bold text-sm mb-1">{char.name}</div>
                    <div className="text-pink-400 text-[9px] uppercase tracking-wider mb-2">{char.role}</div>
                    <div className="text-white/40 text-[8px] uppercase">Jump: {char.jumpPower}</div>
                    {char.shield && <div className="text-teal-400 text-[8px] uppercase mt-1">Shield Tech Unlocked</div>}
                  </button>
                ))}
              </div>
              <div className="mt-8 text-[9px] text-white/30 uppercase tracking-[0.3em]">Click a runner to start</div>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="w-full h-full relative cursor-pointer" onClick={jump}>
              <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
              <div className="absolute top-4 left-4 flex gap-4">
                <div className="px-4 py-2 glass rounded-full font-mono text-[10px] text-white border-pink-500/20 shadow-lg">SCORE: {score}</div>
                <div className="px-4 py-2 glass rounded-full font-mono text-[10px] text-teal-400 border-teal-500/20 shadow-lg">EVIDENCE: {evidence}</div>
                <div className="px-4 py-2 glass rounded-full font-mono text-[10px] text-pink-500 border-pink-500/20 shadow-lg">LIVES: {lives}</div>
              </div>
              <AnimatePresence>
                {msgPopup && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0, y: -20 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4 glass rounded-[2rem] pointer-events-none shadow-[0_0_40px_rgba(236,72,153,0.3)] z-50 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: msgPopup.color }} />
                    <div className="text-white text-xs font-bold uppercase tracking-widest">{msgPopup.text}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {(gameState === 'gameover' || gameState === 'win') && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-xl p-8 text-center z-40">
              <div className="mb-6 p-4 glass rounded-full border-pink-500/20">
                 {gameState === 'gameover' ? <AlertCircle size={48} className="text-red-500" /> : <GraduationCap size={48} className="text-teal-400" />}
              </div>
              <h3 className={`text-4xl font-bold mb-4 glow-text uppercase tracking-tighter ${gameState === 'gameover' ? 'text-red-500' : 'text-teal-400'}`}>
                {gameState === 'gameover' ? 'THESIS CAUGHT YOU!' : 'ESCAPED! 🎓'}
              </h3>
              <div className="glass px-8 py-4 rounded-3xl mb-8">
                <p className="text-white/60 text-sm italic font-serif">"You survived {score} points of campus chaos!"</p>
              </div>
              <button 
                onClick={() => setGameState('select')}
                className="px-10 py-4 btn-primary-gradient text-white font-bold rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-xs"
              >
                Return to Campus
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
const MakeAWish = () => {
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState<string[]>([]);
  
  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;
    setWishes(p => [...p, wish]);
    setWish("");
  };

  return (
    <section className="py-24 px-4 overflow-hidden" id="wishes">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6 glow-text tracking-[0.2em] uppercase">Make A Wish</h2>
        <p className="text-pink-300 font-bold text-[10px] uppercase tracking-[0.3em] mb-12">Send a blessing into the universe for them</p>
        
        <form onSubmit={handleSendWish} className="relative mb-20 group">
          <input 
            type="text"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="Write your wish for the seniors..."
            className="w-full bg-[#1a0a1a]/40 border border-pink-500/30 p-6 rounded-full text-white placeholder:text-white/20 focus:outline-none focus:border-pink-500/60 focus:shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-all"
          />
          <button className="absolute right-2 top-2 bottom-2 px-8 btn-primary-gradient rounded-full text-white font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
            Send Wish
          </button>
        </form>

        <div className="relative h-60">
          <AnimatePresence>
            {wishes.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, scale: 1 }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  y: -300, 
                  x: (Math.random() - 0.5) * 400,
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ duration: 10, ease: "linear" }}
                className="absolute left-1/2 bottom-0 pointer-events-none"
              >
                <div className="bg-pink-500/20 backdrop-blur-md border border-pink-500/40 p-4 rounded-2xl">
                  <Heart size={12} className="text-pink-500 fill-pink-500 mb-2 mx-auto" />
                  <p className="text-white text-xs whitespace-nowrap italic">"{w}"</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] text-white/10 uppercase tracking-[1em]">Wishes in the sky</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const BalloonGame = () => {
  const [balloons, setBalloons] = useState<{ id: number, x: number }[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalloons(p => [...p, { id: Date.now(), x: Math.random() * 90 + 5 }]);
    }, 2800); // Slower spawn rate
    return () => clearInterval(interval);
  }, []);

  const pop = (id: number) => {
    setBalloons(p => p.filter(b => b.id !== id));
    setPoppedCount(c => c + 1);
  };

  return (
    <section className="py-24 px-4 overflow-hidden relative min-h-[600px] bg-gradient-to-t from-pink-500/5 to-transparent" id="balloons">
      <div className="max-w-4xl mx-auto text-center relative z-20">
        <h2 className="text-3xl font-bold text-white mb-6 glow-text tracking-[0.2em] uppercase">Goodbye Balloons</h2>
        <p className="text-pink-300 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Pop a balloon to send a goodbye message!</p>
        <div className="text-white/40 text-[10px] font-mono mb-12">BALLOONS POPPED: {poppedCount}</div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {balloons.map((b) => (
            <motion.div
              key={b.id}
              initial={{ y: 800, opacity: 1 }}
              animate={{ y: -400 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 18, ease: "linear" }} // Significantly slower float speed
              onAnimationComplete={() => setBalloons(p => p.filter(ba => ba.id !== b.id))}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{ left: `${b.x}%` }}
              onClick={() => pop(b.id)}
            >
              <div className="relative">
                <div className="w-16 h-20 bg-pink-500 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.2),0_0_20px_rgba(236,72,153,0.3)] border-pink-400/40 relative">
                   <div className="absolute top-4 left-4 w-4 h-6 rounded-full bg-white/20 blur-[1px] rotate-[20deg]" />
                </div>
                <div className="w-[1px] h-20 bg-white/20 mx-auto" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
                  {["Good Luck!", "Miss You!", "Best Senior!", "Legend!", "Forever Home"][Math.floor(Math.random() * 5)]}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
const MemoryReveal = () => {
  const memories = [
    { text: "Even 2 minutes with you made stressful days lighter", img: "https://lh3.googleusercontent.com/d/1FiIMlJUArQ65FwmGIdI_XA93LRdhe_ll?auto=format&fit=crop&q=80&w=800" },
    { text: "Your taanas felt like blessings in disguise", img: "https://lh3.googleusercontent.com/d/1ueAfzxCbLnDX1OePGzBGUU7VpYT9ntUb?auto=format&fit=crop&q=80&w=800" },
    { text: "You made college feel like home for all of us", img: "https://lh3.googleusercontent.com/d/1H3QMhT8rnDG7ylpxn4jiGM9vbjF49QgH?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto" id="memories">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-2 glow-text">Hidden Secrets</h2>
        <p className="text-pink-300 font-bold text-[10px] uppercase tracking-widest">Hover to reveal the visual memory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memo, i) => (
          <div key={i} className="h-[300px] perspective-1000 cursor-pointer">
            <motion.div 
              className="relative w-full h-full transform-style-preserve-3d transition-all duration-700"
              whileHover={{ rotateY: 180 }}
            >
              {/* Front */}
              <div className="absolute inset-0 glass rounded-[32px] flex flex-col items-center justify-center p-6 backface-hidden shadow-xl border-white/10">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform mb-4">
                  <Heart size={32} className="opacity-40" />
                </div>
                <span className="text-[10px] font-bold text-white opacity-40 uppercase tracking-[0.3em]">Locked Secret</span>
              </div>
              {/* Back - Directly showing image */}
              <div className="absolute inset-0 glass rounded-[32px] overflow-hidden rotate-y-180 backface-hidden shadow-2xl">
                <img src={memo.img} className="w-full h-full object-cover" alt="Memory" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-white font-serif italic text-lg leading-snug">"{memo.text}"</p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

const QuoteGame = () => {
  const seniors = ["Diksha", "Sargam", "Komal Dii"];
  const quotes = [
    { text: "GUDDI NAAP DUNGI", options: seniors, answer: "Diksha dii" },
    { text: "BHAI KAHA HAI ? BHAI YAHA HAI", options: seniors, answer: "Sargam dii" },
    { text: "AISA KYU HOTA HAI HMARE SATH...", options: seniors, answer: "Komal Dii" },
  ];
  
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (opt: string) => {
    setSelected(opt);
    const correct = opt === quotes[current].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setTimeout(() => {
        if (current < quotes.length - 1) {
          setCurrent(c => c + 1);
          setSelected(null);
          setIsCorrect(null);
        } else {
          setIsFinished(true);
        }
      }, 1500);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setIsCorrect(null);
    setIsFinished(false);
  };

  return (
    <section className="py-24 px-4" id="quotes">
      <div className="max-w-3xl mx-auto glass p-12 rounded-[40px] text-center shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div key="game">
              <h2 className="text-2xl font-bold text-white mb-8 glow-text tracking-widest uppercase">Guess Who Said This?</h2>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="mb-12"
                >
                  <blockquote className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300 mb-8 leading-tight glow-text min-h-[120px] flex items-center justify-center">
                    "{quotes[current].text}"
                  </blockquote>
                  
                  <div className="grid gap-4 mt-8">
                    {quotes[current].options.map((opt, i) => (
                      <button
                        key={i}
                        disabled={selected !== null}
                        onClick={() => handleSelect(opt)}
                        className={`py-4 px-6 rounded-2xl border transition-all uppercase tracking-widest text-xs font-bold ${
                          selected === opt 
                            ? isCorrect ? 'bg-pink-500/40 border-pink-500 text-white' : 'bg-red-500/40 border-red-500 text-white'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {isCorrect && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center gap-2 text-pink-300 font-bold text-[10px] uppercase tracking-widest mt-4"
                >
                  <ChevronRight size={16} /> Spot On! Moving next...
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12"
            >
              <div className="w-20 h-20 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-8 border border-pink-500/40">
                <Heart size={40} className="text-pink-500 fill-pink-500" />
              </div>
              <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter glow-text italic">Legendary Memory!</h2>
              <p className="text-white/60 font-serif italic text-xl mb-12">"You know our legends better than anyone else."</p>
              <button 
                onClick={restart}
                className="px-10 py-4 btn-primary-gradient rounded-full text-white font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-3 mx-auto"
              >
                <ArrowLeft size={16} /> Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const PhotoWall = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryImages = [
    "https://lh3.googleusercontent.com/d/1EudLPNy5zVOOCKX1H_s--xaQxgmTyYIN",
    "https://lh3.googleusercontent.com/d/1DlXVpODiqlch7dEK9G2gVpTiEsDrpeHg",
    "https://lh3.googleusercontent.com/d/1OwuW56nkkhrSqGEPPfRNWd9EsQebojbD",
    "https://lh3.googleusercontent.com/d/1ddEYDEvbN7JkdbHhVH3qZJpmrVfho4_K",
    "https://lh3.googleusercontent.com/d/1Zii6_ICc2wAMLWZAa4xRLIdlh4IDP8rv",
    "https://lh3.googleusercontent.com/d/1Ok88GwZW_MLAkFjNlnuw3Exol-46YK7R",
  ];

  return (
    <section className="py-24 px-4 overflow-hidden" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 glow-text">Visions of Us</h2>
          <p className="text-pink-400 font-bold text-[10px] tracking-[0.4em] uppercase">Click memory to zoom</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryImages.map((url, i) => (
            <motion.div 
              key={i}
              className="glass p-3 photo-card group overflow-hidden rounded-[24px] cursor-pointer"
              style={{ rotate: i % 2 === 0 ? '-3deg' : '3deg' }}
              whileHover={{ rotate: 0, scale: 1.02, zIndex: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setSelectedImage(url)}
            >
              <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-rose-900/20">
                <img 
                  src={url} 
                  alt="Memory"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">Memory Unlocked</p>
                  <div className="h-1 w-full bg-pink-500/30 rounded mt-2"></div>
                  <div className="h-1 w-2/3 bg-pink-500/20 rounded mt-1"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
            >
               <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 z-[70] w-14 h-14 bg-white/10 text-white rounded-full flex flex-col items-center justify-center hover:bg-white/20 transition-all backdrop-blur-md gap-1 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[8px] font-bold uppercase">Back</span>
              </button>

              <img 
                src={selectedImage} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
                alt="Enlarged Memory"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TarotSection = () => {
  const [revealed, setRevealed] = useState<string | null>(null);

  const cards = [
    { id: 'komal', name: 'Sargam dii', arcana: 'The priestess', icon: '👑', desc: 'The sovereign of wisdom and nurturing. You made college feel like a sanctuary.', color: 'from-pink-500 to-rose-600', img: "https://lh3.googleusercontent.com/d/16yGNFtWpQ4lwdWetQcBpPWfaMV5wHnSq" },
    { id: 'diksha', name: 'komal dii;', arcana: 'The chariot', icon: '✨', desc: 'The light of guidance and hope. Your presence turned every struggle into a story.', color: 'from-rose-400 to-pink-400', img: "https://lh3.googleusercontent.com/d/1BmqhbF6MzftMR1zJaTv7gGumUcBVzkgZ" },
    { id: 'sargam', name: 'Diksha dii', arcana: 'The saviour', icon: '☀️', desc: 'The source of vitality and joy. Your energy was the caffeine we actually needed.', color: 'from-fuchsia-500 to-pink-500', img: "https://lh3.googleusercontent.com/d/1BR56Njd1uSz6SBfBzlF5UuTLkiZ0Pw2C" }
  ];

  return (
    <section className="py-24 px-4 overflow-hidden relative" id="tarot">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-2 glow-text uppercase tracking-[0.2em]">The Arcana of Us</h2>
          <p className="text-pink-400 font-bold text-[10px] uppercase tracking-widest">Flip to reveal their Arcana Visual</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
          {cards.map((card) => (
            <div key={card.id} className="relative group cursor-pointer h-[500px] perspective-1000">
              <motion.div 
                className="w-full h-full relative transform-style-preserve-3d transition-all duration-700"
                animate={{ rotateY: revealed === card.id ? 180 : 0 }}
                onClick={() => setRevealed(revealed === card.id ? null : card.id)}
              >
                {/* Back (The "Cover") */}
                <div className="absolute inset-0 glass rounded-[40px] border-pink-500/30 flex flex-col items-center justify-center backface-hidden shadow-2xl overflow-hidden group-hover:border-pink-500/60 transition-colors">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)] bg-[length:16px_16px]" />
                  <div className="w-20 h-20 rounded-full border-2 border-pink-500/20 flex items-center justify-center mb-6">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                      <Heart size={32} className="text-pink-500/40" />
                    </motion.div>
                  </div>
                  <span className="text-white font-bold text-sm tracking-[0.3em] uppercase opacity-60 italic">The {card.name}</span>
                </div>

                {/* Front (Directly showing image) */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-[40px] overflow-hidden glass border-pink-500/40 shadow-[0_0_50px_rgba(236,72,153,0.3)]">
                  <img src={card.img} className="w-full h-full object-cover" alt={card.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                    <div className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.4em] mb-2">{card.arcana}</div>
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest glow-text">{card.name}</h3>
                    <p className="text-sm font-serif italic text-white/80 leading-relaxed">
                      "{card.desc}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SendAHug = () => {
  const [hugsSent, setHugsSent] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const hugOptions = [
    { text: "A warm goodbye: May your next chapter be as bright as your smile.", icon: "🌅" },
    { text: "A proud moment: We've watched you grow, and we couldn't be prouder.", icon: "🎓" },
    { text: "A thank-you: For all the times you guided us without even trying.", icon: "🙏" },
    { text: "A memory: That one time we all laughed until we cried—it stays with us.", icon: "✨" },
    { text: "A promise: Distance won't fade this bond. We're just a call away.", icon: "📱" }
  ];

  const handleHug = () => {
    if (hugsSent < hugOptions.length) {
      setMessages(prev => [...prev, hugOptions[hugsSent].text]);
      setHugsSent(prev => prev + 1);
      if (hugsSent === hugOptions.length - 1) {
        setTimeout(() => setShowSuccess(true), 1200);
      }
    }
  };

  return (
    <section className="py-24 px-4 overflow-hidden relative" id="hugs">
      <div className="max-w-4xl mx-auto text-center relative z-20">
        <h2 className="text-3xl font-bold text-white mb-6 glow-text tracking-[0.2em] uppercase">Send a Hug</h2>
        <p className="text-pink-300 font-bold text-[10px] uppercase tracking-[0.3em] mb-12">Click the floating hugs to send your warmth</p>
        
        {!showSuccess ? (
          <div className="relative h-[450px] w-full glass rounded-[40px] overflow-hidden flex items-center justify-center border border-white/5">
             <div className="absolute inset-0 pointer-events-none opacity-20">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#ec4899_1px,transparent_1px)] bg-[length:24px_24px]" />
             </div>

             {/* Floating Hugs */}
             <AnimatePresence>
               {[...Array(3)].map((_, i) => (
                 <motion.button
                   key={`hug-${i}-${hugsSent}`}
                   initial={{ 
                     x: (Math.random() - 0.5) * 300, 
                     y: 300, 
                     opacity: 0,
                     scale: 0.5 
                   }}
                   animate={{ 
                     y: -350, 
                     opacity: [0, 1, 1, 0],
                     x: (Math.random() - 0.5) * 400,
                     scale: [0.5, 1.3, 0.5],
                     rotate: [0, 15, -15, 0]
                   }}
                   exit={{ opacity: 0 }}
                   transition={{ 
                     duration: 7, 
                     repeat: Infinity, 
                     delay: i * 2.3,
                     ease: "easeInOut"
                   }}
                   onClick={handleHug}
                   className="absolute text-7xl cursor-pointer hover:scale-125 transition-transform drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-30 pointer-events-auto"
                 >
                   🤗
                 </motion.button>
               ))}
             </AnimatePresence>

             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-12 z-20">
                <AnimatePresence mode="wait">
                  {messages.length > 0 && (
                    <motion.div
                      key={messages.length}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[32px] max-w-sm shadow-2xl relative"
                    >
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl">✨</div>
                      <p className="text-white text-xl font-serif italic leading-relaxed text-center">"{messages[messages.length - 1]}"</p>
                      <div className="mt-4 flex justify-center gap-1">
                        {[...Array(hugsSent)].map((_, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            className="w-1.5 h-1.5 rounded-full bg-pink-500" 
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mt-12 text-white/20 text-[10px] uppercase tracking-[0.6em] font-bold">
                  Progress: {hugsSent} / {hugOptions.length}
                </div>
             </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-20 rounded-[56px] border border-pink-500/20 shadow-[0_0_80px_rgba(236,72,153,0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0],
                filter: ["drop-shadow(0 0 10px #facc15)", "drop-shadow(0 0 30px #facc15)", "drop-shadow(0 0 10px #facc15)"]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-9xl mb-10 relative z-10"
            >
              💛
            </motion.div>
            <h3 className="text-3xl font-bold text-white uppercase tracking-[0.2em] mb-6 glow-text">Hug delivered successfully</h3>
            <p className="text-white/40 text-[10px] italic font-serif uppercase tracking-[0.4em] mb-12">Your warmth has been etched into the timeline.</p>
            <button 
              onClick={() => {
                setHugsSent(0);
                setMessages([]);
                setShowSuccess(false);
              }}
              className="relative z-10 px-8 py-3 rounded-full border border-pink-500/30 text-[10px] font-bold text-pink-400 uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95"
            >
              Send More Love
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const AlwaysConnected = () => {
  const contacts = [
    { name: "Isha", phone: "919335606478", color: "from-pink-500 to-rose-500" },
    { name: "Khushank", phone: "919897447469", color: "from-blue-500 to-indigo-500" }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="connect">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4 glow-text tracking-[0.2em] uppercase">Whenever you need us, just click here 💛</h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-12">We’ll always be just one message away 🤍</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contacts.map((contact, i) => (
            <motion.a
              key={i}
              href={`https://wa.me/${contact.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[40px] flex flex-col items-center justify-center border border-white/5 relative group overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-pink-400 group-hover:text-white transition-colors">
                 <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Chat with {contact.name}</h3>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-pink-400 uppercase tracking-widest">
                 Open WhatsApp <ChevronRight size={12} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const KnowOurLegends = () => {
  const legends = [
    { 
      name: "Komal Dii", 
      role: "The Wise Mentor", 
      img: "https://lh3.googleusercontent.com/d/1io_BYShp0FsWzRAJ_K-CGTY0fDI7bhTv?auto=format&fit=crop&q=80&w=800",
    },
    { 
      name: "Diksha dii", 
      role: "The Guiding Light", 
      img: "https://lh3.googleusercontent.com/d/1uh4ZERdQGhG85TKTeqrj5QLBeySMW7Ci?auto=format&fit=crop&q=80&w=800",
    },
    { 
      name: "Sargam dii ", 
      role: "The Joy Bringer", 
      img: "https://lh3.googleusercontent.com/d/1A2b5BvbZtBLue1BPczKtTwwYmiMgW_8a?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="legends">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white mb-4 glow-text tracking-[0.3em] uppercase italic">Know Our Legends</h2>
          <p className="text-pink-400 font-bold text-[10px] uppercase tracking-[0.5em] mb-12">The pillars of our college journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {legends.map((legend, i) => (
            <div key={i} className="relative group">
              <div className="relative h-[450px] rounded-[40px] overflow-hidden border border-white/10 glass shadow-2xl">
                <img src={legend.img} className="w-full h-full object-cover grayscale transition-all duration-700" alt={legend.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a1a] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-left">
                  <div className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-2">{legend.role}</div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{legend.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsFlash = () => {
  const [selectedLegend, setSelectedLegend] = useState<null | { name: string, img: string }>(null);
  const [showNames, setShowNames] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      photoRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const legends = [
    { 
      name: "Komal Dii", 
      img: "https://lh3.googleusercontent.com/d/1dJw8mNzDg1BEaYoxH5lptUymFuF6X8d2",
    },
    { 
      name: "Diksha", 
      img: "https://lh3.googleusercontent.com/d/1toQpBD2sFTfBddKPhZeCohn30TOuZb_K",
    },
    { 
      name: "Sargam", 
      img: "https://lh3.googleusercontent.com/d/1Q8p0pAvewukqc3eI1Xg3YO5HXBNLDR_Z",
    }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-white/5 backdrop-blur-sm border-y border-white/5" id="news">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!showNames ? (
              <motion.button
                key="newsflash"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                onClick={() => setShowNames(true)}
                className="group relative px-16 py-12 glass rounded-[48px] border border-pink-500/30 overflow-hidden shadow-[0_0_80px_rgba(236,72,153,0.3)] transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-transparent group-hover:opacity-100 opacity-60 transition-opacity" />
                <div className="relative z-10">
                   <div className="flex items-center justify-center gap-4 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-500 animate-[pulse_1s_infinite]" />
                     <span className="text-white text-xs font-bold tracking-[0.5em] uppercase">Breaking News</span>
                   </div>
                   <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter shadow-text">Open Newsflash</h3>
                   <div className="mt-8 text-pink-400 text-[10px] uppercase tracking-[0.6em] font-bold opacity-60 group-hover:opacity-100 transition-opacity">Click to reveal legends</div>
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="names"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-wrap justify-center gap-8"
              >
                {legends.map((legend, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedLegend(legend)}
                    className="px-12 py-8 glass rounded-[40px] border border-white/10 hover:border-pink-500/50 text-white font-black uppercase tracking-widest italic text-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all bg-gradient-to-b from-white/5 to-transparent hover:from-pink-500/10"
                  >
                    {legend.name}
                  </motion.button>
                ))}
                
                <motion.button 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setShowNames(false)}
                  className="w-full mt-12 flex flex-col items-center gap-3 group"
                >
                  <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 group-hover:text-pink-400 group-hover:border-pink-400/50 transition-all">
                    <ArrowLeft size={20} />
                  </div>
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.8em] font-bold group-hover:text-white transition-colors">
                    Back to Cover
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedLegend && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-black/98 backdrop-blur-xl"
            onClick={() => setSelectedLegend(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full h-full md:w-[95vw] md:h-[95vh] bg-white shadow-[0_0_100px_rgba(0,0,0,1)] rounded-sm overflow-hidden flex flex-col items-center justify-center p-2 md:p-6"
              ref={photoRef}
            >
              <div className="absolute top-6 right-6 z-[70] flex gap-3">
                <button 
                  onClick={toggleFullscreen}
                  className="w-14 h-14 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors backdrop-blur-md border border-white/20"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 size={28} /> : <Maximize2 size={28} />}
                </button>
                <button 
                  onClick={() => setSelectedLegend(null)}
                  className="w-14 h-14 bg-black/50 text-white rounded-full flex items-center justify-center text-3xl hover:bg-black transition-colors backdrop-blur-md border border-white/20 font-sans"
                >
                  ✕
                </button>
              </div>
              
              <div className="w-full h-full relative group flex items-center justify-center overflow-hidden cursor-zoom-in" onClick={toggleFullscreen}>
                <img 
                  src={selectedLegend.img} 
                  className="max-w-full max-h-full object-contain contrast-110" 
                  alt={selectedLegend.name} 
                />
                {!isFullscreen && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                     <div className="bg-black/40 p-4 rounded-full backdrop-blur-md">
                        <Maximize2 className="text-white" size={32} />
                     </div>
                  </div>
                )}
                {!isFullscreen && (
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-12 py-5 glass border border-white/20 rounded-full text-white font-black italic uppercase tracking-[0.4em] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl">
                    {selectedLegend.name}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const SecretEnding = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="py-32 flex flex-col items-center justify-center relative">
      {!unlocked ? (
        <motion.div 
          onClick={() => setUnlocked(true)}
          className="group relative cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <div className="absolute inset-0 bg-pink-500/20 blur-3xl group-hover:bg-pink-500/40 transition-colors rounded-full" />
          <motion.button 
            className="relative w-16 h-16 rounded-full glass flex items-center justify-center text-white/20 group-hover:text-red-400 transition-colors"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart size={24} className="fill-current" />
          </motion.button>
          <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold text-pink-400 uppercase tracking-[0.4em] group-hover:opacity-100 opacity-20 transition-opacity">Discover Secret</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl px-8 text-center glass py-16 rounded-[48px] shadow-[0_0_100px_rgba(236,72,153,0.2)] border-white/5"
        >
          <div className="mb-8 flex justify-center">
             <motion.div 
               animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
               transition={{ repeat: Infinity, duration: 2 }}
             >
               <Heart size={64} className="text-red-500 fill-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)]" />
             </motion.div>
          </div>
          <h2 className="text-4xl font-bold text-pink-300 mb-8 glow-text tracking-tight uppercase">Dear Diksha, Sargam & Komal Dii,</h2>
          <div className="space-y-6 text-xl text-white/80 leading-relaxed font-serif italic">
            <p>"You three didn’t just guide us. You made college feel like home."</p>
            <p>"Thank you for every memory, every laugh, and every moment that made this year unforgettable."</p>
            <p>"Wherever life takes you, remember the chaos we shared here. You'll always be our legends."</p>
          </div>
          <motion.div 
            className="mt-16 text-[10px] font-bold text-pink-400 uppercase tracking-[0.8em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            With Love, The Juniors
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const EasterEggs = () => {
  const [activeEgg, setActiveEgg] = useState<string | null>(null);

  const eggs = [
    { icon: Printer, label: "printer", msg: "Paper jam detected! Please call the IT guy who never comes." },
    { icon: AlertCircle, label: "attendance", msg: "Attendance short by 2%. Time to write another application." },
    { icon: MapPin, label: "faculty", msg: "Where is your thesis? My office, 10 minutes." }
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {eggs.map((egg, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveEgg(egg.msg)}
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-pink-300/40 hover:text-white transition-colors"
          >
            <egg.icon size={18} />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeEgg && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 left-6 md:left-auto md:w-80 glass p-6 rounded-3xl z-50 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-bold text-pink-400 uppercase tracking-widest">Notification</span>
              <button onClick={() => setActiveEgg(null)} className="text-white/40 hover:text-white">&times;</button>
            </div>
            <p className="text-white text-sm italic font-serif leading-relaxed">"{activeEgg}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main App ---

export default function App() {
  const [scene, setScene] = useState<Scene>('landing');
  const [isMuted, setIsMuted] = useState(true);
  const [heartParticles, setHeartParticles] = useState<{ id: number, x: number, y: number }[]>([]);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGlobalClick = (e: React.MouseEvent) => {
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setHeartParticles(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHeartParticles(prev => prev.filter(p => p.id !== newHeart.id));
    }, 1000);
  };

  return (
    <div 
      className="selection:bg-pink-500 selection:text-white bg-[#1a0a1a]"
      onClick={handleGlobalClick}
    >
      <Background />
      
      {/* Heart Particles */}
      {heartParticles.map(p => (
        <div key={p.id} className="heart-particle text-pink-500" style={{ left: p.x, top: p.y }}>
          <Heart size={24} className="fill-current" />
        </div>
      ))}

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-4 md:p-6 flex flex-col md:flex-row justify-between items-center z-[100] bg-[#1a0a1a]/80 backdrop-blur-lg border-b border-pink-500/10 transition-all duration-300">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(236,72,153,0.5)]">S</div>
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-white opacity-90">Our Seniors</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 pointer-events-auto items-center">
          {[
            { name: 'Road', id: 'road' },
            { name: 'Legends', id: 'legends' },
            { name: 'News', id: 'news' },
            { name: 'Memories', id: 'memories' },
            { name: 'Quotes', id: 'quotes' },
            { name: 'Gallery', id: 'gallery' },
            { name: 'Tarot', id: 'tarot' },
            { name: 'Game', id: 'game' },
            { name: 'Legends', id: 'legends' },
            { name: 'Wish', id: 'wishes' },
            { name: 'Hug', id: 'hugs' },
            { name: 'Balloon', id: 'balloons' },
            { name: 'Connect', id: 'connect' }
          ].map(link => (
            <button 
              key={link.id}
              onClick={() => {
                if (scene !== 'journey') {
                  setScene('journey');
                  setTimeout(() => {
                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  }, 500);
                } else {
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[10px] uppercase tracking-[0.2em] text-pink-400/60 hover:text-pink-400 font-bold transition-all hover:scale-110 active:scale-95"
            >
              {link.name}
            </button>
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block" />
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMuted(prev => !prev); }}
            className="text-[10px] uppercase tracking-[0.2em] text-white opacity-40 hover:opacity-100 transition whitespace-nowrap flex items-center gap-2"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />} {isMuted ? 'Muted' : 'Sound'}
          </button>
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      {scene === 'journey' && (
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-pink-500/50 origin-left z-[100]" style={{ scaleX }} />
      )}

      {/* Back to Top */}
      <AnimatePresence>
        {scene === 'journey' && showScrollTop && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 left-6 z-[100] w-14 h-14 rounded-full glass border border-pink-500/30 flex flex-col items-center justify-center text-pink-400 hover:text-white hover:border-pink-500 transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)] group"
            title="Back to Top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            <span className="text-[8px] font-bold uppercase tracking-tighter mt-1">Top</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {scene === 'landing' ? (
          <Landing key="landing" onStart={() => setScene('journey')} />
        ) : (
          <motion.main 
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <JourneyTimeline />
            <KnowOurLegends />
            <NewsFlash />
            <ThesisRunner />
            <MemoryReveal />
            <MakeAWish />
            <QuoteGame />
            <PhotoWall />
            <TarotSection />
            <BalloonGame />
            <SendAHug />
            <AlwaysConnected />
            <SecretEnding />
            <EasterEggs />
            
            <footer className="py-12 border-t border-white/5 text-center">
              <p className="text-xs font-mono text-white/20 uppercase tracking-[0.3em]">
                Crafted with love by Isha and khushank for cutie seniors
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
