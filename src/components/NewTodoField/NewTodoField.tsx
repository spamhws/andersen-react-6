import { useState } from 'react';
import './NewTodoField.css';

interface Props {
  fetchTodos: (...args: any[]) => any;
}

const NewTodoField: React.FC<Props> = ({ fetchTodos }: Props) => {
  const [fieldValue, setFieldValue] = useState('');
  const [isTooLong, setIsTooLong] = useState(false);

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    if (event.target.value.length > 80) {
      setIsTooLong(true);
    } else {
      setIsTooLong(false);
    }
    setFieldValue(event.target.value);
  }

  function handlePostRequest() {
    fetch('https://62c15f6a2af60be89ec5b5bc.mockapi.io/todo', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: fieldValue, isFavourite: false, isCompleted: false }),
    }).then(() => fetchTodos());
  }

  function onClick(): void {
    if (!isTooLong) {
      handlePostRequest();
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!isTooLong) {
        handlePostRequest();
      }
    }
  }

  return (
    <div className='newTodoField'>
      <textarea value={fieldValue} onChange={onChange} onKeyDown={onKeyDown}>
        {' '}
      </textarea>
      <button onClick={onClick}>Add</button>
      <br />
      <p style={isTooLong ? { color: 'red' } : { display: 'none' }}>max 80 characters</p>
    </div>
  );
};

export default NewTodoField;
