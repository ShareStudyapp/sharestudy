import React, { Component } from "react";

class TodoListBox extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todo !== nextProps.todo;
  }
  render() {
    const { todo, onToggle, onRemove } = this.props;
    console.log(todo)
    ///console.log(todo);
    // const todoMap = this.props.todo.map((todolist) => (
    //   <div>{todolist.todolist}</div>
    // ))
    const todoMap = todo.map(({ id, todoContent, fontColor, checked }) => (
      <div className="item-frame" key={id} onClick={() => onToggle(id)}>
        <div
          className="remove-mark"
          onClick={e => {
            e.stopPropagation();
            onRemove(id);
          }}
        >
          &times;
        </div>
        <div
          className={`item-name ${checked && "checked"}`}
          style={{ color: fontColor }}
        >
          {todoContent}
        </div>
        <div className={checked ? "check-mark" : "check-mark-none"}>✓</div>
      </div>
    ));

    return <div>{todoMap}</div>;
  }
}

export default TodoListBox;
 