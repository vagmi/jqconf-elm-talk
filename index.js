var express = require("express");
var bodyParser = require("body-parser");
var temp = require("temp");
var elmCompile = require("node-elm-compiler").compile;
var fs = require("fs");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "jade");

app.get("/", function(req, res) {
  var files = fs.readdirSync("./elm-src");
  var sources = {};
  files.map(function(f) {
    sources[f] = fs.readFileSync("./elm-src/"+f).toString();
  })
  res.render("layout",{files: files, sources: sources});
});
app.post("/compile",function(req,res){
  code = req.body.code;
  console.log(code);
  var tempElmName = temp.path({suffix: ".elm"});
  elmFile = fs.openSync(tempElmName,'w');
  fs.writeSync(elmFile, code);
  fs.closeSync(elmFile);
  var jsName = temp.path({suffix: ".html"});
  var outData = "";
  var compiler = elmCompile([tempElmName], {
    output: jsName
  });
  console.log(compiler);
  compiler.stdout.on('data',function(data) {
    outData += data;
  });
  compiler.stderr.on('data',function(data) {
    outData += data;
  });
  compiler.on('close',function(exitCode) {
    if(exitCode === 0) {
      res.type("text/html");
      res.send(fs.readFileSync(jsName));
      res.end();
      fs.unlinkSync(tempElmName);
      fs.unlinkSync(jsName);
    } else {
      res.type("text/plain");
      res.send("<pre>" + outData + "</pre>");
      res.end();
      fs.unlinkSync(tempElmName);
    }
  });
});

console.log("listening on 3000 ... ");
app.listen(3000);
