import { Dispatch } from 'redux';
import axios from 'axios';
import { TodoAction, TodoActionTypes } from '../../types/todo';

const todoAPILink = 'https://62c15f6a2af60be89ec5b5bc.mockapi.io/todo';

export const fetchTodos = () => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionTypes.FETCH_TODOS });
      const response = await axios.get(todoAPILink);
      dispatch({ type: TodoActionTypes.FETCH_TODOS_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TodoActionTypes.FETCH_TODOS_ERROR,
        payload: 'Error while loading todos. Try refreshing the page...',
      });
    }
  };
};
