import React from 'react';

export default class TodosForm extends React.Component {
    handleSubmit = () => {
        let node = this.refs['todo-input'];
        this.props.createTodo(node.value);

        node.value = '';
    };

    render() {
        return (
            <div id="todo-form">
                <h1>Add TODOs</h1>
                <input type="text" placeholder="type todo" ref="todo-input"/>
                <input type="submit" value="Add" onClick={this.handleSubmit}/>
            </div>
        )
    }
}


