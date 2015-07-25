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
    this.state = {code: ""};
  }
  updateCode() {
    updateCode(this.props.file, this.editor.getValue());
  }
  setupEditor(codeArea) {
    var editor = CodeMirror.fromTextArea(codeArea, {
      mode: "text/x-elm",
      lineNumbers: true
    });
    this.editor = editor;
    this.editor.setOption("extraKeys", {
      "Ctrl-Enter": this.props.onExecute,
      "Ctrl-.": this.props.onNextExample,
      "Ctrl-,": this.props.onPreviousExample,
      "Tab": (e) => editor.execCommand('insertSoftTab')
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
    this.editor.setValue(sources[this.props.file]);
  }
  render() {
    var style = {position: "relative", height: "100%", weight: "100%"};
    return (
      <textarea ref="codearea" style={style}>
        {sources[this.props.file]}
      </textarea>
    );
  }
}

export default Editor;
