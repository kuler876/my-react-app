import React, { useState, useEffect } from 'react';
import { v4 as uuid4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable'

import './App.css';

function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuid4(),
        item,
        color: randomColor({
          luminosty: 'light'
        }),
        defaultPos: {
          x: 200,
          y: -200
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('Введите текст...')
      setItem('')
    }
  }

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePos = (date, index) => {
    let newArray = [...items]
    newArray[index].defaultPos = { x: date.x, y: date.y }
    setItems(newArray)
  }

  const keyPress = (e) => {
    const code = e.keyCode || e.which
    if (code === 13) {
      newItem()
    }
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <textarea value={item} type='text' placeholder='Добавить цитату'
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        ></textarea>
        <button className='btn enter' onClick={newItem}>Добавить</button>
      </div>

      {
        items.map((item, index) => {
          return (
            <Draggable key={index} defaultPosition={item.defaultPos}
              onStop={(_, date) => {
                updatePos(date, index)
              }}
            >
              <div className='quote-item' style={{ backgroundColor: item.color }}>
                <p>
                  {`${item.item}`}
                </p>

                <button className='delete' onClick={() => deleteNode(item.id)}>
                  X
                </button>
              </div>
            </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;
