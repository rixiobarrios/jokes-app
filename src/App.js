import React, { Component } from "react";
import "./App.css";
import Queue from "./Queue";

const JOKES_LIMIT = 10;
const JOKE_API = "https://official-joke-api.appspot.com/random_joke";

// See best practices for organizing your code: https://github.com/airbnb/javascript/tree/master/react#basic-rules

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJoke: { setup: "", punchline: "" },
      jokes: new Queue(JOKES_LIMIT)
    };

    // this.setJoke = this.setJoke.bind(this);
  }

  componentDidMount() {
    this.fetchJoke();
  }

  handleNewJokeClick = () => {
    console.log("clicked new joke");
    this.fetchJoke();
  };

  fetchJoke = () => {
    fetch(JOKE_API)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setJoke(response);
      })
      .catch(error => console.log(error));
  };

  // setJoke(joke) {
  //   this.setState({ joke: joke });
  // }

  setJoke = joke => {
    this.setState({ currentJoke: joke });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Jokes</h1>
        </header>
        <p className="App-joke-container">
          {this.state.currentJoke.setup +
            " " +
            this.state.currentJoke.punchline}
        </p>
        <button className="App-button" onClick={this.handleNewJokeClick}>
          New Joke
        </button>
      </div>
    );
  }
}

export default App;
