import React from 'react'
import logo from './logo.svg'
import './App.css'

import { Link } from 'react-router-dom';
import {useCount, useCount2} from './models/data';


function App(props: any) {
  console.log("app props........................", props);
  // useModel(count);
  // useModel(count2);
  const count = useCount();
  const count2 = useCount2();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => count.value += 1 } >
            count is { count.value }
          </button>
          { " | " }
          <button onClick={() => {
            count2.value.a.b.c += 1;
            // 由于 count2 为一个对象并且层级过多，所以需要手动刷新一下
            count2.update();
          } }>
            count2 is { count2.value.a.b.c }
          </button>
        </p>
        <p>
          <Link to="about">点击我跳转到 about</Link>
        </p>
        <p>
          <Link to="about/me">点击我跳转到 about me</Link>
        </p>
      </header>
    </div>
  )
}

export default App
