import React from 'react';

const data = [{id: 1, name: 'test1', age: 10}, {id: 2, name: 'test2', age: 20}];

const List = (props: any) => {
  const {row} = props;
  const {id, name, age} = row;
  return (<>
    <p>id: {id}</p>
    <p>name: {name}</p>
    <p>age: {age}</p>
  </>)
}

function Fragment() {
  return (
    <div>
      {
        data.map(row => <List row={row} key={row.id} />)
      }
    </div>
  );
}

export default Fragment;
