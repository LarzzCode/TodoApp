import React from 'react'

const List = ({items, onDeleteItem, onToggleItem}) => {
  return (
    <div className="list">
          <ul>
            {items.map((item) =>(
              
              
            <li key={item.id}>
              <input type="checkbox" checked={item.checked} onChange={()=> onToggleItem(item.id)} />

              <span style={ item.checked ? {textDecoration : 'line-through'}: {} } >

              {item.quantity} {item.name}
              </span>
              <button onClick={()=> onDeleteItem(item.id)}>&times;</button>
            </li>
            ))}
            
          </ul>
        </div>

  )
}

export default List