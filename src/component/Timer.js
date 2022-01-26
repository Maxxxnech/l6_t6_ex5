import React, { PureComponent } from "react";
import "./css/Timer.css";

export default class Stopwatch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      value: 5,
    };
    this.interval = null;
    //Шаг секундомера
    this.step = 1;

    this.audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.valueParser = this.valueParser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    if (this.state.running) {
      clearInterval(this.interval);
    }
  }
  render() {
    var dialsClassList = ["dials"];
    dialsClassList.push(this.state.value? "green" : "red");
    return (
      <div className="stopWatchWrapper">
        <header>
          <div className="buttonWrapper">
            <button onClick={this.start} disabled={this.state.running}>
              Старт
            </button>
            <button onClick={this.stop} disabled={!this.state.running}>
              Стоп
            </button>
            <button onClick={this.reset}>Сброс</button>
          </div>
          <label htmlFor="timeInput">Время, с: </label>
          <input
            id="timeInput"
            onChange={this.handleChange}
            type="number"
            value={this.state.value}
          ></input>
        </header>
        <div className={dialsClassList.join(' ')}>{this.valueParser(this.state.value)}</div>
      </div>
    );
  }

  //Добавляем ноль перед цифрой
  addZero(num) {
    return num < 10 ? "0" + num : num;
  }

  valueParser(number) {
    var fixedNumber = +number.toFixed(1);
    var hours = Math.floor(fixedNumber / 3600);
    var minutes = Math.floor((fixedNumber - hours * 3600) / 60);
    var seconds = fixedNumber - minutes * 60 - hours * 3600;
    return `${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(
      seconds
    )}`;
  }

  start() {
    if (this.state.running) return;
    this.interval = setInterval(() => {
      // Конец отсчета
      if (this.state.value === 0) {
        this.reset();
        this.handleCountdownEnd();
      } else {
        // Нормальный отсчет
        this.setState((prevState) => ({
          running: true,
          value: prevState.value - this.step,
        }));
      }
      console.log("Running: " + this.state.value);
    }, this.step * 1000);
  }

  stop() {
    this.setState({ running: false });
    clearInterval(this.interval);
    console.log("Stopped: " + this.state.value);
  }

  reset() {
    clearInterval(this.interval);
    this.setState((prevState) => ({
      running: false,
      value: 0,
    }));
    console.log("Reset: " + this.state.value);
  }

  handleChange(e) {
    this.setState((prevState) => ({
      //running: false,
      value: +e.target.value,
    }));
  }

  handleCountdownEnd(){
    this.audio.play();
  }
}
