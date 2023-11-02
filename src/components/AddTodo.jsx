import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";
import { Form, Button } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { PulseLoader } from "react-spinners";

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      setIsLoading(true);
      try {
        await dispatch(addTodo({ title, description }));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
        setTitle("");
        setDescription("");
      }
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
        <Button variant="success" type="submit" disabled={isLoading}>
          {isLoading ? (
            <PulseLoader color="#36d7b7" />
          ) : (
            <>
              Tambah Todo <AiOutlinePlusCircle />
            </>
          )}
        </Button>
      </Form>
    </>
  );
};

export default AddTodoForm;
