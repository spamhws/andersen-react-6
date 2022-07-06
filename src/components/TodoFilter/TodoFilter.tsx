interface Props {
  changeFilterValue: (...args: any[]) => any;
  currentFilter: string;
}

const TodoFilter: React.FC<Props> = ({ changeFilterValue, currentFilter }: Props) => {
  function onChange(selectedFilter: string): void {
    if (currentFilter === selectedFilter) {
      changeFilterValue('');
    } else {
      changeFilterValue(selectedFilter);
    }
  }

  return (
    <div style={{ display: 'flex', width: '400px', gap: '12px' }}>
      <input
        type='checkbox'
        id='checkCompleted'
        name='TodoFilter'
        checked={currentFilter === 'Completed'}
        onChange={() => {
          onChange('Completed');
        }}
      />
      <label htmlFor='checkCompleted'>Completed</label>
      <br />
      <input
        type='checkbox'
        id='checkInProgres'
        name='TodoFilter'
        checked={currentFilter === 'InProgress'}
        onChange={() => {
          onChange('InProgress');
        }}
      />
      <label htmlFor='checkInProgres'>In Progress</label>
      <br />
      <input
        type='checkbox'
        id='checkFavorites'
        name='TodoFilter'
        checked={currentFilter === 'Favorite'}
        onChange={() => {
          onChange('Favorite');
        }}
      />
      <label htmlFor='checkFavorites'>Favorite</label>
    </div>
  );
};

export default TodoFilter;
