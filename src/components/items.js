import React, { useState, useEffect } from 'react'
import base from "../firebase"
import { FaTrash, FaArrowUp } from 'react-icons/fa'

export function Item({ item, index, inBasket, removeItem, shuffleUp }) {

    const checked = item.inBasketStatus === true ? "checked" : "not-checked"

    const handleChange=(e)=>{
        const updatedItem = { name: e.target.value }

        base
            .ref()
            .child(index)
            .update(
                updatedItem
            )
    }

    return (
        <ul className="row item item-dark">
            <li>
                <label className="switch">
                    <input
                        index={item.index}
                        type="checkbox"
                        className={`checkbox-${checked}`}
                        onClick={() => inBasket(index, item.name, item.inBasketStatus)}
                    />
                    <span className={`slider slide-${checked} round`}></span>
                </label>
            </li>
                <li
                >
                <input
                className={checked}
                value={item.name}
                onChange={handleChange}
                />
            </li>
            <li>
                <button
                    onClick={() => shuffleUp(index)}
                    index={item.index}
                    className="button-clear">
                    <FaArrowUp/>
                </button>
            </li>
            <li>
                <button
                    onClick={() => removeItem(index)}
                    index={item.index}
                    className="button-clear trash"
                >
                    <FaTrash
                    />
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

        base
            .ref()
            .set(newItems)

        setItems(newItems)
    }

    const inBasket = (index, itemName, inBasketStatus) => {

        const updatedItem = { name: itemName, inBasketStatus: !inBasketStatus }

        base
            .ref()
            .child(index)
            .update(
                updatedItem
            )
    }

    const removeItem = (index) => {

        if (items.length > 1) {
            items.splice(index, 1)

            base.ref().set(items)
        } else {
            window.alert("You don't want to do that")
        }
    }

    const shuffleUp = (index) => {

        const newArray = items
        const moveUp = items[index]

        if (items.length > 1 && index !== 0) {
            newArray[index] = items[index - 1]
            newArray[index - 1] = moveUp

            setItems(newArray)
            base
                .ref()
                .set(newArray)
        }
    }


    return (
        <div className="grocery-list">
            <h2 className="align-center">Grocery List</h2>
            {
                items.length > 0 || items.length != null ?
                    items.map((item, index) => (
                        <Item
                            item={item}
                            inBasketStatus={item.inBasketStatus}
                            index={index}
                            key={index}
                            id={item}
                            removeItem={removeItem}
                            inBasket={inBasket}
                            shuffleUp={shuffleUp}
                        />
                    )
                    )
                    : null
            }
            <CreateItem
                addItem={addItem}
            />
        </div>
    )
}