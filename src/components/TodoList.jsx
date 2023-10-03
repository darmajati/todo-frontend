import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { fetchTodos } from "../redux/actions/todoActions";
import { Table, Container, Button } from "react-bootstrap";
import { deleteTodo } from "../redux/actions/todoActions";
import AddTodo from "./AddTodo";
import { BarLoader } from "react-spinners";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Set initially to true

  useEffect(() => {
    // Fetch todos and set isLoading to false when data is loaded
    dispatch(fetchTodos())
      .then(() => {
        setIsLoading(false);
      });
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
        {isLoading ? (
          // Show loading spinner while data is being fetched
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <BarLoader color="#36d7b7" width={800} loading={isLoading} />
          </div>
        ) : (
          // Show the TodoList when data is loaded
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
        )}
      </Container>
    </div>
  );
};

export default TodoList;
