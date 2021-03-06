import React, { Component } from 'react';
import Header from './Header';
import Meta from './Meta';
import List from './List';
import Lrc from './Lrc';
import Time from './Time';
import Control from './Controls';
import json from '../public/list.json';
import './App.css';


class App extends Component {

  constructor () {
    super();
    this.state = {
      index: 0,
      time: 0,
      duration: 0
    }
  }

  setDuration (e) {
    this.setState({
      duration: e.currentTarget.duration
    });
  }

  setNext () {
    let index = this.state.index;
    index++;
    // play music in order
    index = index === json.data.length ? 0 : index;
    this.setState({
      index
    });
  }

  setTime (e) {
    this.setState({
      time: Math.floor(e.currentTarget.currentTime)
    });
  }

  onChildChange (index) {
    this.setState({
      index
    });
  }

  onControlChange (isPlayMusic) {
    const audio = this.refs.audio;
    isPlayMusic ? audio.play() : audio.pause();
  }

  render () {
    return (
      <div className="app">
        <Header />
        <div className="container">
          <audio autoPlay src={`musics/${json.data[this.state.index].lrc_name}.mp3` }
            onEnded={this.setNext.bind(this)}
            onTimeUpdate={this.setTime.bind(this)}
            onCanPlay={this.setDuration.bind(this)}
            ref="audio"></audio>

          <Meta time={this.state.time} index={this.state.index} duration={this.state.duration} />
          <Lrc name={json.data[this.state.index].lrc_name} time={this.state.time} />
          <Control callbackParent={this.onControlChange.bind(this)} index={this.state.index} />
          <Time duration={this.state.duration} time={this.state.time} />
        </div>

        <List callbackParent={this.onChildChange.bind(this)} index={this.state.index} />
        <footer>
          <p>
            <span>&copy; {(new Date()).getFullYear()} </span>
            <a href="http://www.chunqiuyiyu.com">春秋一语</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
