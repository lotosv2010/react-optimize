import React, {useState, useRef, /*PureComponent*/} from 'react';

// 浅比较
const shallowEqual = (o1: any, o2: any) => {
  if(o1 === o2) return true;
  if(typeof o1 !== 'object' || o1 === null || typeof o2 !== 'object' || o2 === null) return false;
  const k1:Array<string> = Object.keys(o1);
  const k2:Array<string> = Object.keys(o2);
  if(k1.length !== k2.length) return false;
  for (const key of k1) {
    if(!o2.hasOwnProperty(key) || o1[key] !== o2[key]) return false;
  }
  return true;
}

class PureComponent<T> extends React.Component<T> {
  shouldComponentUpdate(newProps: any) {
    return !shallowEqual(this.props, newProps);
  }
}

class Counter extends PureComponent<any>{
  render() {
    const {counter: {number}} = this.props;
    console.log(`%cCounter render`, 'color: yellow');
    return (
      <div>
        {number}
      </div>
    )
  }
}

function Pure() {
  const [sum, setSum] = useState({counter: {number: 0}});
  const ref: any= useRef(null);
  console.log(`%cPure render`, 'color: red');

  const add = () => {
    const number = +ref?.current?.value;
    // const newSum = {...sum, counter: number === 0 ? sum.counter : {number: sum.counter.number + number}}
    setSum({counter: {number: sum.counter.number + number}});
  }
  return (
    <div>
      <Counter counter={sum.counter} />
      <input ref={ref} />
      <button onClick={add}>+</button>
    </div>
  );
}

export default Pure;
