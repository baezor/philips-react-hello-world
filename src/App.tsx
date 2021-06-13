import React, { Component } from "react";
import { render } from "react-dom";
import jsHue from "jshue";
import "./style.css";

let hue = jsHue();
const bridge = hue.bridge("");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      lamp1: [],
      lamp2: [],
      username: "",
      user: "",
    };
  }

  createUser = () => {
    // create user account (requires link button to be pressed)
    bridge.createUser("myApp#testreact").then((data) => {
      console.log(data);
      // extract bridge-generated username from returned data
      const username = data[0].success.username;

      console.log("New username:", username);

      // instantiate user object with username
      const user = bridge.user(username);

      this.setState({
        username,
        user,
        loading: false,
      });
    });
  };
  handleLamp = (event) => {
    // Red for demo
    this.state.user
      .setLightState(1, { on: true, bri: 254, hue: 65535 })
      .then((data) => {
        console.log(data);
      });
  };
  handleLamp2 = () => {
    // Blue for demo.
    this.state.user
      .setLightState(2, { on: true, bri: 254, hue: 46920 })
      .then((data) => {
        console.log(data);
      });
  };
  componentDidMount() {
    this.createUser();
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="philips-app no-connected">
          <button className="philips-bridge" onClick={this.createUser}>
            Push the button of your bridge and click again, please.
          </button>
        </div>
      );
    }

    return (
      <div className="philips-app">
        <section className="philips-colors">
          <button
            className="philips-color-btn is-red"
            onClick={this.handleLamp}
          >
            Setting up Lamp 1
          </button>
          <button
            className="philips-color-btn is-blue"
            onClick={this.handleLamp2}
          >
            Setting up Lamp 2
          </button>
        </section>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
