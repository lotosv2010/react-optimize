import React, {useState, useRef, /*memo*/} from 'react';
import {Map, is} from 'immutable';


// 浅比较
const shallowEqual = (o1: any, o2: any) => {
  if(o1 === o2) return true;
  if(typeof o1 !== 'object' || o1 === null || typeof o2 !== 'object' || o2 === null) return false;
  const k1:Array<string> = Object.keys(o1);
  const k2:Array<string> = Object.keys(o2);
  if(k1.length !== k2.length) return false;
  for (const key of k1) {
    if(!o2.hasOwnProperty(key) || !is(o1[key], o2[key])) return false;
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
    const {counter} = this.props;
    console.log(`%cCounter render`, 'color: yellow');
    return (
      <div>
        {counter.get('number')}
      </div>
    )
  }
}

const Title = (props: any) => {
  console.log(`%cTitle render`, 'color: green');
  return <div>
    {props.title}
  </div>
}

const memo = (FunctionComponent: any) => {
  return class extends PureComponent<any> {
    render() {
      return <FunctionComponent {...this.props} />
    }
  }
}

const MemoTitle = memo(Title);

function Memo() {
  const [state, setState] = useState({counter: Map({number: 0}), title: 'Memo'});
  const ref: any= useRef(null);
  console.log(`%cMemo render`, 'color: red');

  const add = () => {
    const number = +ref?.current?.value;
    const oldNum = state.counter.get('number') as number;
    setState({...state, counter: state.counter.set('number', oldNum + number)});
  }
  return (
    <div>
      <MemoTitle title={state.title} />
      <Counter counter={state.counter} />
      <input ref={ref} />
      <button onClick={add}>+</button>
    </div>
  );
}

export default Memo;
