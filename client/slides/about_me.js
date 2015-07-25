import React from "react";
import colors from "./colors";
import Slide from "./base";
export default class AboutMe extends React.Component {
  render() {
    var logoStyle = {
      backgroundColor: colors.highlightBackground,
      padding: 20,
      color: "#eee",
      borderRadius: 5
    };
    return (
      <Slide>
        <h1>About Me</h1>
        <h1 style={logoStyle} className="icon-tarkalabs"/>
      </Slide>
    );
  }
}
