import { useEffect } from "react";
import confetti from "canvas-confetti"; // Import library confetti

export default function Footer({ items }) {
  // Hitung statistik
  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const percentage = totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);

  // EFEK CONFETTI: Trigger saat progress mencapai 100%
  useEffect(() => {
    if (percentage === 100 && totalItems > 0) {
      triggerConfetti();
    }
  }, [percentage, totalItems]); // Jalankan setiap kali persentase berubah

  // Fungsi konfigurasi ledakan konfeti
  function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Ledakan dari kiri dan kanan layar
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  // Tampilan UI (Tidak berubah banyak, hanya penyesuaian logika render)
  if (totalItems === 0)
    return (
      <footer className="bg-slate-900 text-slate-500 py-6 text-center text-sm border-t border-slate-800">
        <p className="animate-pulse">Waiting for your first task...</p>
      </footer>
    );

  return (
    <footer className="bg-slate-900 text-slate-400 py-6 px-4 text-center border-t border-slate-800 relative z-10">
      <div className="max-w-xl mx-auto">
        
        {/* Glowing Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 mb-4 rounded-full overflow-hidden shadow-inner border border-slate-700/50">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                percentage === 100 
                  ? "bg-gradient-to-r from-emerald-400 to-green-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" // Hijau neon saat selesai
                  : "bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(99,102,241,0.6)]" // Biru/Ungu saat proses
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
        </div>
        
        <p className="font-medium tracking-wide">
          {percentage === 100 ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold animate-bounce inline-block">
              🎉 Mission Accomplished! All Done.
            </span>
          ) : (
            <>
              Progress: <span className="text-indigo-400 font-bold">{checkedItems}</span> / {totalItems} tasks completed ({percentage}%)
            </>
          )}
        </p>
      </div>
    </footer>
  );
}