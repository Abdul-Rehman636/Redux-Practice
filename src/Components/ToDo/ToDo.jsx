import React from "react";
import "./todo.css";
import { connect } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "../../Actions/index";

class TodoList extends React.Component {
  state = {
    newTodoText: "",
    editingTodoId: null,
  };

  handleInputChange = (e) => {
    this.setState({ newTodoText: e.target.value });
  };

  handleAddTodo = () => {
    const { newTodoText } = this.state;
    if (newTodoText.trim() !== "") {
      this.props.addTodo({
        id: Date.now(),
        text: newTodoText,
      });
      this.setState({ newTodoText: "" });
    }
  };

  handleRemoveTodo = (id) => {
    this.props.removeTodo(id);
  };

  handleUpdateTodo = (id, text) => {
    this.setState({ editingTodoId: id, newTodoText: text });
  };

  handleSaveTodo = () => {
    const { editingTodoId, newTodoText } = this.state;
    if (newTodoText.trim() !== "") {
      this.props.updateTodo(editingTodoId, newTodoText);
      this.setState({ editingTodoId: null, newTodoText: "" });
    }
  };

  render() {
    return (
      <div id="div-1">
        <div id="div-2">
          <p id="text-1">Todo List</p>
          <div id="div-3">
            <div id="div-4">
              <input
                type="text"
                value={this.state.newTodoText}
                onChange={this.handleInputChange}
                placeholder="Title"
                id="input-1"
              />
              <button id="button-1" onClick={this.handleAddTodo}>
                Add
              </button>
            </div>
          </div>
          {this.props.todos.map((todo) => (
            <div id="div-5" key={todo.id}>
              {this.state.editingTodoId === todo.id ? (
                <div id="div-3-2">
                  <div id="div-4-2">
                    <input
                      type="text"
                      value={this.state.newTodoText}
                      onChange={this.handleInputChange}
                      id="input-1"
                    />
                    <button id="button-1" onClick={this.handleSaveTodo}>
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div id="div-5">
                  <p id="text-2">{todo.text}</p>
                  <button
                    id="button-3"
                    onClick={() => this.handleUpdateTodo(todo.id, todo.text)}
                  >
                    Update
                  </button>
                  <button
                    id="button-2"
                    onClick={() => this.handleRemoveTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo, updateTodo })(
  TodoList
);
