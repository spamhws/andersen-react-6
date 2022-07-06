import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import NewTodoField from '../NewTodoField/NewTodoField';
import TodoElement from '../TodoElement/TodoElement';
import TodoFilter from '../TodoFilter/TodoFilter';
import './Todolist.css';

const TodoList: React.FC = () => {
  const { error, loading, todos } = useTypedSelector((state) => state.todo);
  const { fetchTodos } = useActions();

  const [currentFilter, setCurrentFilter] = useState('');

  function changeFilterValue(selectedFilter: string): void {
    setCurrentFilter(selectedFilter);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <h1 className='todo' style={{ margin: '80px auto 0px' }}>
        Syncronizing your todos...
      </h1>
    );
  }
  if (error) {
    return (
      <h1 className='todo' style={{ margin: '80px auto 0px' }}>
        {error}
      </h1>
    );
  }

  return (
    <div className='todo'>
      <h1>To-Do-Do-Do!</h1>
      <TodoFilter changeFilterValue={changeFilterValue} currentFilter={currentFilter} />
      {todos.map((todo) => {
        switch (currentFilter) {
          case 'Completed':
            if (todo.isCompleted) {
              return <TodoElement key={todo.id} fetchTodos={fetchTodos} todo={todo} />;
            }
            break;
          case 'Favorite':
            if (todo.isFavourite && !todo.isCompleted) {
              return <TodoElement key={todo.id} fetchTodos={fetchTodos} todo={todo} />;
            }
            break;
          case 'InProgress':
            if (!todo.isCompleted) {
              return <TodoElement key={todo.id} fetchTodos={fetchTodos} todo={todo} />;
            }
            break;
          case '':
            return <TodoElement key={todo.id} fetchTodos={fetchTodos} todo={todo} />;
          default:
            return null;
        }
      })}
      <NewTodoField fetchTodos={fetchTodos} />
    </div>
  );
};

export default TodoList;
