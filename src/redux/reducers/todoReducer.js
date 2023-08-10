import { FETCH_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO } from "../actions/types";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload.id ? { ...todo, ...action.payload } : todo)),
      };

      case TOGGLE_TODO:
        return {
          ...state,
          todos: state.todos.map((todo) => (todo.id === action.payload ? { ...todo, status: !todo.status } : todo)),
        };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
