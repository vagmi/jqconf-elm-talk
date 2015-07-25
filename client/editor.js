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
    this.setState({code: this.editor.getValue()});
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
  componentWillReceiveProps(newProps, oldProps) {
    if(this.editor && oldProps.code !== newProps.code) {
      this.editor.setValue(newProps.code);
      this.setState({code: newProps.code});
    }
  }
  render() {
    var style = {position: "relative", height: "100%", weight: "100%"};
    return (
      <textarea ref="codearea" style={style}>
        {this.state.code}
      </textarea>
    );
  }
}

export default Editor;
