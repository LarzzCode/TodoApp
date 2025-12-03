import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  // Auto-close setelah 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Tentukan warna berdasarkan tipe
  const styles = 
    type === "danger" 
      ? "border-rose-500 text-rose-400 bg-rose-500/10" // Merah untuk Delete
      : "border-emerald-500 text-emerald-400 bg-emerald-500/10"; // Hijau untuk Success

  const icon = 
    type === "danger" 
    ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

  return (
    <div className={`fixed bottom-10 right-5 md:right-10 flex items-center gap-3 px-6 py-4 rounded-xl border-l-4 shadow-2xl backdrop-blur-md z-50 animate-slide-in ${styles}`}>
      {icon}
      <p className="font-semibold text-sm md:text-base">{message}</p>
      
      {/* Tombol Close Manual (X kecil) */}
      <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}