require("!style!css!less!./styles/app.less");
import React from "react";
import Router, {Route, DefaultRoute, RouteHandler} from "react-router";
import MouseTrap from "mousetrap";
import Layout from "./layout";
import First from "./slides/first";
import AboutMe from "./slides/about_me";
import AboutElm from "./slides/about_elm";
import WeAreHiring from "./slides/we_are_hiring.js";


class DefaultHander extends React.Component {
  render() {
    return <RouteHandler/>;
  }
}

var slides = [
  {path: "first", handler: First},
  {path: "about-elm", handler: AboutElm},
  {path: "about", handler: AboutMe},
  {path: "editor", handler: Layout},
  {path: "hiring", handler: WeAreHiring}
];

var routes = (
  <Route handler={DefaultHander}>
    <DefaultRoute handler={First}/>
    {slides.map((s) => <Route path={s.path} handler={s.handler}/>)}
  </Route>
);


var appRouter = Router.run(routes, Router.HashLocation,
                           (Handler) => React.render(<Handler/>, document.getElementById("app")));



MouseTrap.bind('h', () => {
  var currentPath = appRouter.getCurrentPath().substring(1);
  if(currentPath == "") {
    currentPath = "first";
  }
  var idx = slides.indexOf(slides.filter((r) => r.path === currentPath)[0]);
  if(idx > 0) {
    appRouter.transitionTo("/" + slides[idx-1].path);
  }
});

MouseTrap.bind('l', () => {
  var currentPath = appRouter.getCurrentPath().substring(1);
  if(currentPath == "") {
    currentPath = "first";
  }
  var idx = slides.indexOf(slides.filter((r) => r.path === currentPath)[0]);
  if(idx < slides.length - 1) {
    appRouter.transitionTo("/" + slides[idx+1].path);
  }
});

window.appRouter = appRouter;

