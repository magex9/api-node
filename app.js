var express = require('express')
    , pureApi = require('./index'),
    bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'pug');

app.use(bodyParser.json());
console.log("Server started: http://localhost:1337");
app.listen(1337);

var options = {
    debug: true,
    handlersDir: "./handlers",
    validateReqFunc: function (req) {
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
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});


app.post("/test", pureApi.endPoint(options));
