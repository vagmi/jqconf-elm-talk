import React from "react";
import colors from "./colors";
import Slide from "./base";
export default class First extends React.Component {
  render() {
    var footerStyle = {
      position: "absolute",
      bottom: 50,
      left: "50%",
      transform: "translate(-50%)",
      color: colors.sectionBackground
    };
    var twitterStyle = {
      color: colors.sectionBackground
    }
    return (
      <Slide>
        <h1>Functional Reactive Programming with Elm</h1>
        <h3>By Vagmi Mudumbai</h3>
      </Slide>
    );
  }
}
