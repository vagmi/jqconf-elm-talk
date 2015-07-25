import React from "react";
import colors from "./colors";
import Slide from "./base";
export default class AboutElm extends React.Component {
  render() {
    var elmLogoStyle = {
      display: "block",
      width: "128px",
      height: "128px",
      backgroundColor: colors.highlightBackground,
      padding: 5,
      borderRadius: 5
    }
    return (
      <Slide>
        <h1>About Elm</h1>
        <img style={elmLogoStyle} src="/imgs/elm-logo.png"/>
      </Slide>
    );
  }
}
