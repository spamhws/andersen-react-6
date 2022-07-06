import { useState, useRef } from 'react';
import './TodoElement.css';

type Todo = {
  text: string;
  isFavourite: boolean;
  isCompleted: boolean;
  id: string;
};

interface Props {
  fetchTodos: (...args: any[]) => any;
  todo: Todo;
}

const NewTodoField: React.FC<Props> = ({ fetchTodos, todo }: Props) => {
  const [inputValue, setInputValue] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const inputField = useRef<HTMLInputElement>(null);

  const APILink = 'https://62c15f6a2af60be89ec5b5bc.mockapi.io/todo/';

  function handlePutRequest(text: string, isFavourite: boolean, isCompleted: boolean): void {
    fetch(`${APILink}${todo.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: text, isFavourite: isFavourite, isCompleted: isCompleted }),
    }).then(() => fetchTodos());
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function onDeleteClick(): void {
    fetch(`${APILink}${todo.id}`, {
      method: 'DELETE',
    }).then(() => fetchTodos());
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter' && isEditing) {
      handlePutRequest(inputValue, todo.isFavourite, false);
      setIsEditing(false);
    }
  }

  function onEditClick(): void {
    if (!isEditing && inputField.current) {
      inputField.current.focus();
    } else {
      handlePutRequest(inputValue, todo.isFavourite, false);
    }
    setIsEditing(!isEditing);
  }

  function onFavouriteClick(): void {
    handlePutRequest(inputValue, !todo.isFavourite, todo.isCompleted);
  }

  function onDoneClick(): void {
    handlePutRequest(inputValue, todo.isFavourite, !todo.isCompleted);
  }

  return (
    <div className='todoElement'>
      <img
        src={require('../../../src/icons/starIcon.svg').default}
        style={todo.isFavourite ? {} : { filter: 'grayscale(100%)' }}
        alt='StarIcon'
        onClick={onFavouriteClick}
      />
      <input
        type='text'
        style={
          todo.isCompleted && !isEditing
            ? { margin: '4px 0', textDecoration: 'line-through' }
            : { margin: '4px 0', textDecoration: 'none' }
        }
        ref={inputField}
        value={inputValue}
        readOnly={!isEditing}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <img src={require('../../../src/icons/deleteIcon.svg').default} alt='DeleteIcon' onClick={onDeleteClick} />
      <img
        src={
          !isEditing
            ? require('../../../src/icons/editIcon.svg').default
            : require('../../../src/icons/saveIcon.svg').default
        }
        alt='EditIcon'
        onClick={onEditClick}
      />
      <img src={require('../../../src/icons/completedIcon.svg').default} alt='CompletedIcon' onClick={onDoneClick} />
    </div>
  );
};

export default NewTodoField;
