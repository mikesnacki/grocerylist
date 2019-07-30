import React, { Component } from 'react'

export default class AddItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            index: "",
            checked: "",
            itemName: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        var newItem = {
            itemName: this.refs.itemName.value,
        }

        if (newItem) {
            this.props.addItem(newItem)
            this.setState({
                index: "",
                checked: "",
                itemName: "",
            })
        }
    }

    render() {
        return (
            <form action="submit" onSubmit={this.onSubmit}>
                <div className="item-adder">
                    <input type="text"
                        ref="itemName"
                        placeholder="item"
                        name="itemName"
                        value={this.state.itemName}
                        onChange={this.handleInputChange} />
                    <button type="submit">Add</button>
                </div >
            </form>
        )
    }
}