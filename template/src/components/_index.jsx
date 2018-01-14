import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick() {
    const count = this.state.count;
    this.setState({ count: count + 1 });
  }

  render() {
    return (
      <div className="container">
        <span>{this.state.count}s</span>
        <button onClick={() => this.handleClick()}> +1s</button>
      </div>
    );
  }
}
