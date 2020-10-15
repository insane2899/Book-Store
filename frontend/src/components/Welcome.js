import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';

class Welcome extends Component {

  render() {
    return (
      <Jumbotron className="bg-dark text-white">
        <h1>Welcome to Insane's Library</h1>
        <p>Too many books to read, too little time at hand.</p>
      </Jumbotron>
    );
  }

}

export default Welcome;
