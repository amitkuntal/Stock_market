const companyinfo = require('../stock_data/companyinfo.json')
const stocks = require('../stock_data/stocks.json')
const client = require('./../db/db.js')
console.log(stocks.length)
function queryExecutor(query){
   return client.query(query).then((res)=>{
    console.log(query);
  }).catch((err)=> console.log(err))
}
function deleteTable(tableName){
  query = `DROP TABLE IF EXISTS ${tableName};`
  return queryExecutor(query)
}
function createTable(tableName)
{
  if(tableName == 'companyinfo')
  {
    query = "CREATE TABLE companyinfo(\
      symbol varchar(10) PRIMARY KEY     NOT NULL,\
        companyname      varchar(50)    NOT NULL,\
        series            text     NOT NULL,\
        dateoflisting      date NOT NULL,\
        paidupvalue      int,\
       marketlot int,\
       isinnumber	varchar(20),\
       facevalue int\
     );"
  }
  else{
    query = "create table stocks(\
      stockid serial PRIMARY KEY,\
      symbol varchar(10) NOT NULL,\
      series text  NOT NULL,\
       date      date NOT NULL,\
       tradedqty  int,\
       deliverableqty int,\
       dlytotraded float(2),\
      FOREIGN KEY(symbol) REFERENCES companyinfo(symbol)\
      ON DELETE CASCADE\
      );"
  }
  return queryExecutor(query)
}

 function insertData(tableName)
 {
  let inserts = []
    if(tableName=='companyinfo')
   { 
     companyinfo.forEach(element => {
       query = `insert into companyinfo (symbol, companyname,series,dateoflisting,paidupvalue,marketlot,isinnumber,facevalue)\
       values('${element["SYMBOL"]}','${element["NAME OF COMPANY"]}','${element["SERIES"]}',TO_DATE('${element["DATE OF LISTING"]}','DD-MON-YY')\
      ,${element["PAID UP VALUE"]},${element["MARKET LOT"]},'${element["ISIN NUMBER"]}',${element["FACE VALUE"]});`
      inserts.push(queryExecutor(query))
        
     });
    }
    else{
      stocks.forEach(element =>{
        query = `insert into stocks (symbol,series,date,tradedqty,deliverableqty,dlytotraded)\
       values('${element["Symbol"]}','${element["Series"]}',TO_DATE('${element["Date"]}','DD-MON-YY')\
      ,${element["Traded Qty"]},${element["Deliverable Qty"]},${element["Dly Qt to Traded Qty"]});`
      inserts.push(queryExecutor(query))
      })
    }
  
  return Promise.all(inserts)
  
 }

client.connect()
  .then(() => deleteTable('stocks'))
  .then(() => deleteTable('companyinfo'))
  .then(()=> createTable('companyinfo'))
  .then(()=>createTable('stocks'))
 .then(()=> insertData("companyinfo"))
  .then(()=> insertData("stocks"))
  .then(()=>client.end()).catch((err)=> console.log(err))