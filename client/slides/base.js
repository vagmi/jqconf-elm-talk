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
    var iconStyle = {
      margin: 5,
      color: colors.sectionBackground
    }
    return (
      <div className="slide" style={slideStyle}>
        {this.props.children}
        <h3 style={footerStyle}>
          <span style={iconStyle} className="fa fa-github"/>
          <span style={iconStyle} className="fa fa-twitter"/>
          @vagmi
        </h3>
      </div>
    );
  }
}
