import { useState } from "react";
import Action from "./components/Action";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import List from "./components/List";

const App = () => {
  const groceryItems = [
    {
      id: 1,
      name: 'Kopi Bubuk',
      quantity: 2,
      checked: true,
    },
    {
      id: 2,
      name: 'Gula Pasir',
      quantity: 5,
      checked: false,
    },
    {
      id: 3,
      name: 'Air Mineral',
      quantity: 3,
      checked: false,
    },
  ];

  const [items, setItems] = useState(groceryItems)

  function handleAddItem(item){
    setItems([...items, item])
  }

  function handleDelete(id){
    setItems((items)=> items.filter((item)=> item.id !== id))
  }
  
  function handleToggle(id){
    setItems((items)=> items.map((item)=> (item.id === id) ? { ...item, checked: !item.checked} : item))
    
  }
  function handleClearItem(){
    setItems([])
  }
  
  return (
    <> 
      <div className="app">
        <Header/>
        <Form onAddItem={handleAddItem}/>
        <List items={items} onDeleteItem={handleDelete} onToggleItem={handleToggle} />
        <Action onClearItem={handleClearItem}/>
        <Footer />
      </div>  
    </>
  )
}

export default App