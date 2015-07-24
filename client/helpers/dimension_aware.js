import lodash from "lodash";
import React from "react";

export default function makeDimensionAware(Komponent) {
  return React.createClass({
    getInitialState: function() {
      var defaults = {
        dimensions: { height: window.innerHeight, width: window.innerWidth }
      };
      return !this.onResize ? defaults : null;
    },

    componentWillMount: function() {
      if (!this.onResize) {
        this.onResize = function() {
          this.setState({
            dimensions: { height: window.innerHeight, width: window.innerWidth }
          });
        }.bind(this);
      }

      this.onResize();
      this.onResizeThrottled = lodash.throttle(this.onResize, 10);
      window.addEventListener("resize", this.onResizeThrottled);
    },

    componentWillUnmount: function() {
      window.removeEventListener("resize", this.onResizeThrottled);
    },
    render: function() {
      return <Komponent {...this.props} {...this.state}/>;
    }
  });
}
