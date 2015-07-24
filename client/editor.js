import React from "react";
import CodeMirror from "codemirror";

var elmMode = require("codemirror/mode/elm/elm");

var updateCode = function(file, code) {
  sources[file] = code;
}

class Editor extends React.Component {
  constructor() {
    super();
    this.updateCode = this.updateCode.bind(this);
  }
  updateCode() {
    updateCode(this.props.file, this.editor.getValue());
  }
  setupEditor(codeArea) {
    this.editor = CodeMirror.fromTextArea(codeArea, {
      mode: "text/x-elm",
      lineNumbers: true
    });
    this.editor.setOption("extraKeys", {
      "Ctrl-Enter": this.props.onExecute,
      "Ctrl-.": this.props.onNextExample,
      "Ctrl-,": this.props.onPreviousExample
    });
    this.editor.setOption("theme","solarized dark");
    this.editor.on("change", this.updateCode);
  }
  getCurrentCode() {
    return this.editor.getValue();
  }
  componentDidMount() {
    var codeArea = this.refs.codearea.getDOMNode();
    this.setupEditor(codeArea);
  }
  componentDidUpdate() {
    if(this.editor) {
      this.editor.setValue(this.props.code);
    }
  }
  render() {
    var style = {position: "relative", height: "100%", weight: "100%"};
    return (
      <textarea ref="codearea" style={style}>
        {this.props.code}
      </textarea>
    );
  }
}

export default Editor;
