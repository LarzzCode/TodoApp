import React, { useState } from 'react'

const Form = ({onAddItem}) => {

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e){
    e.preventDefault()  
    if(!name) return;
    const newItem = {name, quantity, checked: false, id:Date.now()}

    onAddItem(newItem)

    setName('')
    setQuantity(1)
    console.log(newItem);
  }

  const quantityNum = [...Array(20)].map((_, i)=>(
    <option value={i + 1} key={i+1}>
      {i + 1}
    </option>

  ))
  return (
    <form className="add-form" onSubmit={handleSubmit}>

          <div>
            <select value={quantity} onChange={(e)=> setQuantity(Number(e.target.value))}>
              {quantityNum}
            </select>
            <input type="text" placeholder="nama barang..." value={name} onChange={(e) => setName(e.target.value)}/>
          <button className='ms-3'>Add</button>
          </div>
        </form>
  )
}

export default Form