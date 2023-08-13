import axios from 'axios';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, FETCH_TODOS, EDIT_TODO } from './types';

export const addTodo = (todoData) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'https://careful-shift-cod.cyclic.app/todo/api/create',
      todoData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: ADD_TODO, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const editTodo = (id, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `https://careful-shift-cod.cyclic.app/todo/api/update/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: EDIT_TODO, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const toggleTodo = (id) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    const todo = getState().todo.todos.find(todo => todo.id === id);

    const updatedTodo = { ...todo, status: !todo.status };

    console.log("Updating todo:", updatedTodo);
    
    await axios.patch(`https://careful-shift-cod.cyclic.app/todo/api/update/${id}`, updatedTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: TOGGLE_TODO, payload: id });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = (id) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`https://careful-shift-cod.cyclic.app/todo/api/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (error) {
    console.error(error);
  }
};

export const fetchTodos = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://careful-shift-cod.cyclic.app/todo/api/get', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FETCH_TODOS, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};
