import { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import GroceryList from "./components/GroceryList";
import Footer from "./components/Footer";
import Toast from "./components/Toast"; // <--- Import Toast

export default function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shopping-list");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // STATE BARU: Untuk mengontrol Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    localStorage.setItem("shopping-list", JSON.stringify(items));
  }, [items]);

  // FUNGSI HELPER: Memunculkan Toast
  function triggerToast(message, type = "success") {
    setToast({ show: true, message, type });
  }

  // FUNGSI HELPER: Menutup Toast
  function closeToast() {
    setToast((prev) => ({ ...prev, show: false }));
  }

  function handleAddItem(item) {
    setItems([...items, item]);
    triggerToast("Item added successfully!"); // <--- Trigger Toast
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    triggerToast("Item removed.", "danger"); // <--- Trigger Toast (Danger)
  }

  function handleUpdateItem(id, newName) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
    triggerToast("Item updated successfully!");
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleClearList() {
    if (items.length === 0) return;
    const confirmed = window.confirm("Are you sure you want to delete all tasks?");
    if (confirmed) {
        setItems([]);
        triggerToast("All tasks cleared.", "danger"); // <--- Trigger Toast
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-900 text-slate-200">
      <Header />
      <Form onAddItem={handleAddItem} />
      
      <GroceryList 
        items={items} 
        onDeleteItem={handleDeleteItem} 
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
        onUpdateItem={handleUpdateItem}
      />
      
      <Footer items={items} />

      {/* RENDER TOAST JIKA SHOW = TRUE */}
      {toast.show && (
        <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={closeToast} 
        />
      )}
    </div>
  );
}