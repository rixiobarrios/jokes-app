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
  }

  componentDidMount() {
    this.fetchJoke();
  }

  handleNewJokeClick = () => {
    console.log("clicked new joke");
    this.fetchJoke();
  };

  handleNextClick = () => {
    console.log("clicked next");
    this.getNextJoke();
  };

  handlePreviousClick = () => {
    console.log("clicked previous");
    this.getPreviousJoke();
  };

  getNextJoke = () => {
    const recentJokes = this.state.jokes.getQueue();
    const currentJokeIndex = recentJokes.findIndex(
      joke => joke.id === this.state.currentJoke.id
    );
    const nextJokeIndex = currentJokeIndex + 1;
    if (nextJokeIndex < recentJokes.length) {
      this.setState({ currentJoke: recentJokes[nextJokeIndex] });
    }
  };

  getPreviousJoke = () => {
    const recentJokes = this.state.jokes.getQueue();
    const currentJokeIndex = recentJokes.findIndex(
      joke => joke.id === this.state.currentJoke.id
    );
    const previousJokeIndex = currentJokeIndex - 1;
    if (previousJokeIndex > -1) {
      this.setState({ currentJoke: recentJokes[previousJokeIndex] });
    }
  };

  fetchJoke = () => {
    fetch(JOKE_API)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.saveJoke(response);
        this.setJoke(response);
      })
      .catch(error => console.log(error));
  };

  setJoke = joke => {
    this.setState({ currentJoke: joke });
  };

  saveJoke = joke => {
    console.log(this.state.jokes);
    this.setState({
      jokes: this.state.jokes.enqueue(joke)
    });
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
        <button className="App-button" onClick={this.handleNextClick}>
          Next
        </button>
        <button className="App-button" onClick={this.handlePreviousClick}>
          Previous
        </button>
      </div>
    );
  }
}

export default App;
