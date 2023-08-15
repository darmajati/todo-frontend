import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { fetchTodos } from "../redux/actions/todoActions";
import { Table, Container, Button } from "react-bootstrap";
import { deleteTodo } from "../redux/actions/todoActions";
import AddTodo from "./AddTodo";
import { Link } from "react-router-dom"

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteTodo(id));
    dispatch(fetchTodos());
  };

  return (
    <div>
      <Container>
        <h2 style={{ textAlign: "center", margin: "20px 0" }}>Todo List</h2>
        <AddTodo />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <TodoItem key={todo.id} todo={todo} index={index} onDelete={() => handleDelete(todo.id)} />
            ))}
          </tbody>
        </Table>

        <Link to="/"><Button variant="success"> &lt; Kembali</Button></Link>
      </Container>
    </div>
  );
};

export default TodoList;
