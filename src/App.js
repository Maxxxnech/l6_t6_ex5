import React, {useState} from 'react';
import './App.css';
import Timer from './component/Timer';

function App() {
  const [show, setShow] = useState(false);
  function handleClick(){
    setShow(!show);
  }
  return (
    <div className="App">
       <header>
       <h1>l6_t6 задание 5: таймер</h1>
       <button onClick={handleClick}>{show? "Убрать таймер" : "Показать таймер"}</button>
       </header>
       {show && <Timer />}
    </div>
  );
}

export default App;
