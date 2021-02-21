import './App.css';
import Navbar from "./Navbar/Navbar";

import React, {Component} from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

callAPI() {
    fetch("http://localhost:9000/Pedidos")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
    this.callAPI();
}
componentDidUpdate(){
    this.callAPI();
}
  render(){
    return (
      <div>
        <Navbar />
        <p className="App-intro">;{this.state.apiResponse}</p>

      </div>
    );
  }
}

export default App;
