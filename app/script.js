import React from 'react';
import { render } from 'react-dom';

const AppDescription = () => (
  <div>
    <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
    <p>This app will help you track your time and inform you when it's time to rest.</p>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      time: 1200,
      timer: null
      };
    }

  formatTime(){
    const minutes = (Math.floor(this.state.time / 60)) >= 10 ? (Math.floor(this.state.time / 60)) : '0' + (Math.floor(this.state.time / 60));
    const seconds = this.state.time % 60 >= 10 ? this.state.time % 60 : '0' + this.state.time % 60 ;
    const time = `${minutes + ':' + seconds}`;
    return time;
  };

  step = (counter) => {
    this.setState({time: this.state.time - 1});
    if (this.state.time === 0 ) {
      this.playBell(); 
      if (this.state.status == 'work'){
        this.setState({
          status: 'rest',
          time: 20,
        })
      } else if (this.state.status == 'rest'){
        this.setState({
          status: 'work',
          time: 1200,
        })
      }
    }
  };

  startTimer = () => {
    this.setState({ 
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work',
    });
  };

  stopTimer = () => {
    this.setState({
      timer: clearInterval(),
      time: 0,
      status: 'off',
     });
  };

  closeApp = () => {
    window.close()
  };

  playBell = () => {
    const audioBell = new Audio('./sounds/bell.wav');
    audioBell.play();
  };

  render() {
    const { status } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime()}</div>}
        {(status === 'off') && <button className="btn" onClick={() => this.startTimer()}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={() => this.stopTimer()}>Stop</button>}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
