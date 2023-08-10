import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";
import { Form, Button } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      dispatch(addTodo({ title, description }));
      setTitle("");
      setDescription("");
    }
  };

  return (
    <>
      <h3 className="mt-4">Tambahkan Todo</h3>
      <Form className="mb-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Judul</Form.Label>
          <Form.Control type="text" placeholder="Tambahkan Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control type="text" placeholder="Tambahkan Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Button variant="success" type="submit">
          Tambah Todo <AiOutlinePlusCircle />
        </Button>
      </Form>
    </>
  );
};

export default AddTodoForm;
