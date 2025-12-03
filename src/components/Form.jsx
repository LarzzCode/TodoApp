import { useState } from "react";

export default function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const newItem = {
      name,
      quantity,
      checked: false,
      id: Date.now(),
    };

    onAddItem(newItem);
    setName("");
    setQuantity(1);
  }

  const quantityNum = [...Array(20)].map((_, i) => i + 1);

  return (
    <form 
      className="bg-slate-900 pt-6 pb-6 px-4 flex flex-col md:flex-row gap-3 justify-center items-center shadow-2xl relative z-0" 
      onSubmit={handleSubmit}
    >
      {/* Input Group - Sedikit lebih compact */}
      <div className="flex gap-2 w-full md:w-auto p-1 bg-slate-800 rounded-lg border border-slate-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all shadow-inner">
        
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="bg-transparent text-indigo-400 font-bold text-center w-14 outline-none cursor-pointer border-r border-slate-700 hover:text-indigo-300 text-sm"
        >
          {quantityNum.map((num) => (
            <option value={num} key={num} className="bg-slate-800 text-slate-200">
              {num}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Apa yang harus dilakukan?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent text-slate-200 placeholder-slate-500 font-medium outline-none px-2 py-1.5 w-full md:w-80 text-sm md:text-base"
        />
      </div>

      {/* Modern Gradient Button - Versi Lebih Kecil/Compact */}
      <button className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group text-sm md:text-base">
        <span>Add</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:rotate-90 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  );
}