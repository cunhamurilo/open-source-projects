const controller = require("../controllers/data.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/data", 
    controller.getDataByType
  );

  app.post(
    "/api/alldata", 
    controller.getAllData
  );

  app.post(
    "/api/searchdata", 
    controller.getSearchData
  );

  app.post(
    "/api/infodata", 
    controller.getMovieInformation
  );
};