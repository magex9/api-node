var express = require('express')
    , pureApi = require('./index'),
    bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'pug');

app.use(bodyParser.json());
var CustomError = require("./lib/customError")
exports.CustomError = CustomError;
/*
app.use(function(err, req, res, next) {
  // ⚙️ our function to catch errors from body-parser
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // do your own thing here 👍
    res.status(400).send({ code: 400, message: "bad request" });
  } else next();
});
*/
//const util = require('util')

app.use(function (error, req, res, next) {
if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
/*  console.log("e:",error);
  console.log("b:",error.body);


  console.log(util.inspect(error, {showHidden: false, depth: null}))
*/
    let cErr=new CustomError(400, "BAD REQUEST", CustomError.NOT_IN_THE_RIGTH_FORMAT, "The request is not in the right format. error:"+ error ,error )

    //next(null, new pureApi.ApiResponse("RETRIEVED", "orgranization",[],JSON.parse(body),{} ));
    let response=new pureApi.ApiResponse("BAD REQUEST", "unknown");
    response.addLog(cErr);
    res.send(response);
  } else {
    next();
  }
});


console.log("Server started: http://localhost:1337");
app.listen(1337);

var options = {
    debug: true,
    handlersDir: "./handlers",
    validateReqFunc: function (req) {
      console.log("validateReqfunc here..")
        var data = req.body || {};
        return (data["action_str"] !== undefined && typeof data["action_str"] === "string")
            && (data["data_type"] !== undefined && typeof data["data_type"] === "string")
            && (data["log_list"] !== undefined && typeof data["log_list"] === "object")
            && (data["request_map"] !== undefined && typeof data["request_map"] === "object")
            && (data["trans_map"] !== undefined && typeof data["trans_map"] === "object");
    },
    dataType: undefined,
    actionStr: undefined
};

var test_options = {
    debug: true,
    handlersDir: "./example_handlers",
    validateReqFunc: function (req) {
      console.log("jim here..")
        var data = req.body || {};
        return (data["action_str"] !== undefined && typeof data["action_str"] === "string")
            && (data["data_type"] !== undefined && typeof data["data_type"] === "string")
            && (data["log_list"] !== undefined && typeof data["log_list"] === "object")
            && (data["request_map"] !== undefined && typeof data["request_map"] === "object")
            && (data["trans_map"] !== undefined && typeof data["trans_map"] === "object");
    },
    dataType: undefined,
    actionStr: undefined
};



app.get('/helloworld', function (req, res) {
  res.send('hello world')
});
//render pug template index.pub
app.get('/', function (req, res) {
  res.render('index')
});
//render pug template index.pub
app.get('/pugTemplate', function (req, res) {
  res.render('tempatedPage', { title: 'Example template', message: 'This text can change!' })
});
app.get('/pugTemplate2', function (req, res) {
  res.render('tempatedPage', { title: 'AnotherExample template', message: 'See what I mean!' })
});


app.post("/test",  pureApi.endPoint(test_options));
app.post("/pureJson", pureApi.endPoint(options));
