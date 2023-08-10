import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleTodo } from "../redux/actions/todoActions";
import { editTodo } from "../redux/actions/todoActions";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsFillTrashFill, BsCheckCircle } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md"

const TodoItem = ({ todo, onDelete, index }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleToggleStatus = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveEdit = () => {
    const updatedData = { title: editedTitle, description: editedDescription };
    dispatch(editTodo(todo.id, updatedData));
    setShowModal(false);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>
      {todo.status ? (
        <Button variant="success" onClick={handleToggleStatus}>
          <BsCheckCircle/>
        </Button>
      ) : (
        <Button variant="warning" onClick={handleToggleStatus}>
          <MdPendingActions />
        </Button>
      )}
    </td>
      <td>
        <Button variant="warning" onClick={handleEdit}>
          <MdOutlineModeEditOutline />
        </Button>
        <Button variant="danger" onClick={onDelete}>
          <BsFillTrashFill />
        </Button>
      </td>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Judul</Form.Label>
              <Form.Control type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};

export default TodoItem;
