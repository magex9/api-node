var pureApi = require("../index");

var Request = require("request");

exports.retrieve = function (req, res, next) {
//curl '' --header 'Content-Type: application/json+ld'
  Request.get(
      {
        "headers":{"content-type":"application/json+ld"}
        ,"url":"http://localhost:8080/api/organizations"

      }


  , (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      console.dir(JSON.parse(body));
      next(null, new pureApi.ApiResponse("RETRIEVED", "orgranization",[],JSON.parse(body),{} ));
  });




};
