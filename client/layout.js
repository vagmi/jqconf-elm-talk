var React = require("react");
var request = require("superagent");
import MouseTrap from "mousetrap";
import Editor from "./editor";
import makeDimensionAware from "./helpers/dimension_aware.js";

var code = `
import Graphics.Element exposing (show)

main = show "hello world"
`

class Layout extends React.Component {
  constructor() {
    super();
    this.compileCode = this.compileCode.bind(this);
    this.previousExample = this.previousExample.bind(this);
    this.nextExample = this.nextExample.bind(this);
    this.setSource = this.setSource.bind(this);
    var fileName = files[0];
    this.state = {file: fileName, code: sources[fileName], mainHeight: 500};
  }
  setHeight() {
    var {top} = this.refs.mainSection.getDOMNode().getBoundingClientRect();
    var newHeight = this.props.dimensions.height - top;
    if(newHeight !== this.state.mainHeight)
      this.setState({mainHeight: newHeight});
  }
  componentDidMount() {
    MouseTrap.bind('ctrl+enter',this.compileCode);
    MouseTrap.bind('ctrl+.',this.nextExample);
    MouseTrap.bind('ctrl+,',this.previousExample);
    this.setHeight();
  }
  componentDidUpdate() {
    this.setHeight();
  }
  componentWillUnmount() {
    MouseTrap.unbind('ctrl+enter');
  }
  previousExample() {
    var idx = files.indexOf(this.state.file);
    if(idx > 0) {
      this.setState({file: files[idx-1], code: sources[files[idx-1]]});
    }
  }
  nextExample() {
    var idx = files.indexOf(this.state.file);
    if(idx < files.length-1) {
      this.setState({file: files[idx+1],
                    mainSectionHeight: 500,
                    code: sources[files[idx+1]]});
    }
  }
  compileCode() {
    var code = sources[this.state.file]
    request.post("/compile").send({code: code}).end(function(err,res){
      if(!err) {
        var holder = this.refs.holder.getDOMNode();
        holder.contentWindow.document.open();
        holder.contentWindow.document.write(res.text);
        holder.contentWindow.document.close();
      }
    }.bind(this));
  }
  setSource(e) {
    var fileName = e.target.value;
    this.setState({file: fileName, code: sources[fileName]});
  }
  render() {
    var fileName = this.state.file;
    var style={position: "relative", height: "100%"};
    var holderStyle={position: "relative", width: "100%", height: "100%"};
    var mainSectionStyle = {height: this.state.mainHeight};
    return  (
      <div className="container-fluid" style={style}>
        <div className="row">
          <div className="col-sm-12 header">
            <img className="logo" src="/imgs/logo.png"/>
            <h3>FRP in your Browser with Elm</h3>
            <div className="controls pull-right">
              <button onClick={this.compileCode}>Compile</button>
              <select ref="sourceSelector" onChange={this.setSource}>
                {window.files.map((f) => <option
                  selected={f==fileName}
                  key={f}
                  value={f}>{f}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="row main-section" 
          ref="mainSection" style={mainSectionStyle}>
          <div className="col-sm-6" style={style}>
            <Editor ref="editor"
              file={this.state.file}
              code={this.state.code}
              onPreviousExample={this.previousExample}
              onNextExample={this.nextExample}
              onExecute={this.compileCode} />
          </div>
          <div className="col-sm-6" style={style}>
            <iframe ref="holder" className="holder" style={holderStyle}/>
          </div>
        </div>
      </div>
    );
  }
}
export default makeDimensionAware(Layout);
