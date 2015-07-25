import React from "react";
import colors from "./colors";
import Slide from "./base";
export default class WeAreHiring extends React.Component {
  render() {
    return (
      <Slide>
        <h1>You can find the slides on</h1>
        <h3>
          <a href="https://github.com/vagmi/jqconf-elm-talk">
            https://github.com/vagmi/jqconf-elm-talk
          </a>
        </h3>
        <p>Oh and BTW, We're hiring!</p>
      </Slide>
    );
  }
}
