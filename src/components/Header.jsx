export default function Header() {
  return (
    <header className="z-10 bg-slate-900/80 backdrop-blur-md py-6 border-b border-slate-800 sticky top-0">
      <div className="flex justify-center items-center gap-3">
        {/* Logo Icon Sederhana */}
        <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">🚀</span>
        
        {/* Gradient Text Effect */}
        <h1 className="text-2xl md:text-3xl font-black tracking-widest uppercase bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text animate-pulse">
          Pro Task Manager
        </h1>
      </div>
    </header>
  );
}