import { useState } from "react";

export default function GroceryList({ items, onDeleteItem, onToggleItem, onClearList, onUpdateItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "name") sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "checked") sortedItems = items.slice().sort((a, b) => Number(a.checked) - Number(b.checked));

  return (
    <div className="bg-slate-900 py-8 px-4 flex-grow overflow-y-auto custom-scrollbar">
      
      {/* Grid Layout Responsif */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedItems.map((item) => (
          <Item 
            item={item} 
            key={item.id} 
            onDeleteItem={onDeleteItem} 
            onToggleItem={onToggleItem} 
            onUpdateItem={onUpdateItem} 
          />
        ))}
      </div>

      {/* State Kosong */}
      {items.length === 0 && (
        <div className="text-center mt-20 opacity-50">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-slate-400 font-light">Belum ada tugas. Tambahkan sesuatu!</p>
        </div>
      )}

      {/* Footer Controls */}
      {items.length > 0 && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12 animate-fade-in">
          <div className="relative">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="appearance-none pl-4 pr-10 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm border border-slate-700 hover:border-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="input">📅 Urutkan: Waktu Input</option>
              <option value="name">🔤 Urutkan: Nama (A-Z)</option>
              <option value="checked">✅ Urutkan: Status Selesai</option>
            </select>
            {/* Custom Arrow Icon for Select */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          <button 
            onClick={onClearList}
            className="text-rose-400 hover:text-rose-300 text-sm font-semibold hover:bg-rose-500/10 px-4 py-2 rounded-lg transition-all"
          >
            Bersihkan Semua
          </button>
        </div>
      )}
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem, onUpdateItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);

  function handleSave() {
    onUpdateItem(item.id, editedName);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedName(item.name); // Reset ke nama asli jika batal
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <div className={`group relative flex items-center justify-between p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
        isEditing 
        ? "bg-indigo-900/20 border-indigo-500 ring-1 ring-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]" 
        : item.checked 
            ? "bg-slate-800/30 border-slate-800 opacity-60 grayscale-[50%]" 
            : "bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1"
    }`}>
      
      <div className="flex items-center gap-3 overflow-hidden flex-grow mr-2">
        {/* Checkbox Custom */}
        {!isEditing && (
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onToggleItem(item.id)}
              className="peer appearance-none w-5 h-5 border-2 border-slate-500 rounded bg-transparent checked:bg-indigo-500 checked:border-indigo-500 cursor-pointer transition-all"
            />
            {/* SVG Checkmark (Hidden by default, shown when checked) */}
            <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none left-1 top-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        
        {/* LOGIKA TAMPILAN: Input vs Text */}
        {isEditing ? (
          <input 
            type="text" 
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full bg-slate-900/50 text-indigo-200 p-1.5 px-3 rounded-lg border border-indigo-500/50 outline-none focus:bg-slate-900 transition-all font-medium"
          />
        ) : (
          <span className={`text-lg font-medium truncate select-none transition-colors duration-300 ${
            item.checked ? "line-through text-slate-500" : "text-slate-200"
          }`}>
            <span className="text-indigo-400 font-bold mr-2 text-sm bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
              {item.quantity}
            </span> 
            {item.name}
          </span>
        )}
      </div>
      
      {/* Action Buttons (Icons) */}
      <div className="flex gap-1 items-center">
        {isEditing ? (
            <>
                {/* Tombol SAVE (Check Icon) */}
                <button onClick={handleSave} className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors" title="Save">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                {/* Tombol CANCEL (X Icon) */}
                <button onClick={handleCancel} className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors" title="Cancel">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </>
        ) : (
            <>
                {/* Tombol EDIT (Pencil Icon) */}
                <button onClick={() => setIsEditing(true)} className="p-2 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
                {/* Tombol DELETE (Trash Icon) */}
                <button onClick={() => onDeleteItem(item.id)} className="p-2 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </>
        )}
      </div>
    </div>
  );
}