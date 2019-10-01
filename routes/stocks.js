const api = require("./api_functions/stocks.js");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const joiSchema = require("./../validate/stockDataValidate.js");

jsonParser = bodyParser.json();

router.get("/", function(req, res, next) {
  api
    .showAllStock()
    .then(data => res.status(200).send(data.rows))
    .catch(next);
});

router.get("/:symbol", function(req, res, next) {
  api
    .showStockForACompany(req.params.symbol)
    .then((data) =>{
      if(data.rowsCount==0)
      {
        res.status(404).send("Not  Found")
      }
      else{
        res.status(200).send(data.rows)
      }

    })
    .catch(next);
});

router.put("/:id", jsonParser, function(req, res, next) {
  const validate = joiSchema.schemaForUpdateStock.validate(req.body);
  if (validate.error) {
    res.status(404).send(validate.error.details[0].message);
  } 
  else {
    api
      .updateStocks(req.body, req.params.id)
      .then(data => res.status(200).send(data.rows))
      .catch(next);
  }
});
router.post("/", jsonParser, function(req, res, next) {
  const validate = joiSchema.schemaForNewStock.validate(req.body);
  if (validate.error) {
    res.status(404).send(validate.error.details[0].message);
  } else {
    api
      .addStock(req.body)
      .then(data => res.status(200).send(data))
      .catch(next);
  }
});
router.delete("/:id", function(req, res,next) {
  api
    .deleteStock(req.params.id)
    .then((data) =>{
      if(data.rowCount==0)
      {
        res.status(404).send("Not found")
      }
      else{
        res.status(200).send(data)
      }
    } 
).catch(next);
});

module.exports = router;
