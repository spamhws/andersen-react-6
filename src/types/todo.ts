export interface TodoState {
  todos: any[];
  loading: boolean;
  error: null | string;
}

export enum TodoActionTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
  FETCH_TODOS_NEW = 'FETCH_TODOS_NEW',
}
interface FetchTodoAction {
  type: TodoActionTypes.FETCH_TODOS;
}
interface FetchTodoSuccessAction {
  type: TodoActionTypes.FETCH_TODOS_SUCCESS;
  payload: any[];
}
interface FetchTodoErrorAction {
  type: TodoActionTypes.FETCH_TODOS_ERROR;
  payload: string;
}

interface FetchTodoNewAction {
  type: TodoActionTypes.FETCH_TODOS_NEW;
  payload: [number, string, boolean, boolean];
}
export type TodoAction = FetchTodoAction | FetchTodoErrorAction | FetchTodoSuccessAction | FetchTodoNewAction;
