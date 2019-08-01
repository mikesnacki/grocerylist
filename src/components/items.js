import React, { useState, useEffect } from 'react'
import base from "../firebase"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function Item({ item, index, inBasket, removeItem }) {

    const checked = item.inBasketStatus === true ? "checked" : "not-checked"

    return (
        <ul className="row item item-dark">
            <li><input
                type="checkbox"
                className="checkbox"
                onClick={() => inBasket(item.id, item.name, item.inBasketStatus)}
            />
            </li>
            <li
                className={checked}
            >
                {item.name}
            </li>
            <li>
                <button
                    onClick={
                        () => removeItem(index)
                    }
                    index={item.index}
                >
                    x
                </button>
            </li>
        </ul >
    )
}

function CreateItem({ addItem }) {
    const [value, setValue] = useState("")

    const handleSubmit = e => {
        e.preventDefault();

        if (!value) return;

        addItem(value);
        setValue("");
    }

    return (
        <form action="submit"
            className="align-center"
            onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                placeholder="Add new item"
                onChange={e => setValue(e.target.value)}
                className="create-item"
            />
        </form>
    )
}


export default function Items() {

    const [items, setItems] = useState([])

    useEffect(() => {
        const ref = base
            .ref()
            .on('value', snapshot => {
                let itemArray = snapshot.val()
                setItems(itemArray)
            })
        return () => {
            base.removeBinding(ref);
        }
    }, [])

    const addItem = name => {
        const newItem = { name, inBasketStatus: false }
        const newItems = [...items, newItem]
        setItems(newItems)
        base
            .ref()
            .set(newItems)
    }

    const inBasket = (index, itemName, inBasketStatus) => {

        const updatedItem = { name: itemName, inBasketStatus: !inBasketStatus }

        base
            .ref()
            .child(index)
            .set({
                name: itemName,
                inBasketStatus: !inBasketStatus
            })
    }

    const removeItem = index => {
        base
            .ref()
            .child(index)
            .remove()
    }



    return (
        <div className="grocery-list">
            <h2 className="align-center">Grocery List</h2>
            {
                items.map((item, index) => (
                    <Item
                        item={item}
                        inBasketStatus={item.inBasketStatus}
                        index={index}
                        key={index}
                        id={item}
                        removeItem={removeItem}
                        inBasket={inBasket}
                    />
                )
                )
            }
            <CreateItem
                addItem={addItem}
            />
        </div>
    )
}