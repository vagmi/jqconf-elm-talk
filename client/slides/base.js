import React from "react";
import colors from "./colors";

export default class Slide extends React.Component {
  render() {
    var slideStyle = {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      position: "relative",
      width: "100%",
      height: "100%",
      color: colors.foreGround
    };
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
      <div className="slide" style={slideStyle}>
        {this.props.children}
        <h3 style={footerStyle}><span style={twitterStyle} className="fa fa-twitter"/> @vagmi</h3>
      </div>
    );
  }
}
