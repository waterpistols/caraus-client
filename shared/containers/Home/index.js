import React                  from 'react';
import TodosView              from 'components/TodosView';
import TodosForm              from 'components/TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import { connect }            from 'react-redux';

@connect(state => ({ todos: state.todos }))
export default class Home extends React.Component {
    constructor() {
        super();
        this.text = 'List';
    }

    static needs = [
        TodoActions.getTodos
    ];

    render() {
        const { todos, dispatch } = this.props;
        return (
            <div id="todo-list">
                <TodosForm {...bindActionCreators(TodoActions, dispatch)} />
                <br/>
                <p>{this.text}</p>
                <TodosView todos={todos} {...bindActionCreators(TodoActions, dispatch)} />
            </div>
        );
    }
}
