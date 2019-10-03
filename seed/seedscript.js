const companyinfo = require('../stock_data/companyinfo.json')
const stocks = require('../stock_data/stocks.json')
const client = require('./../db/db.js')

userinfo=[{"email":"amitkuntal1997@gmail.com",
            "username":"Amit",
            "password":"something",
            "sex":"M"
        },
        {
            "email":"amitkuntal1998@gmail.com",
            "username":"Amit",
            "password":"something",
            "sex":"M"
        }]

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

  else if(tableName == 'stocks'){
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
  else{
    query = "CREATE TABLE userinfo(\
      email varchar(50) PRIMARY KEY     NOT NULL,\
        username  varchar(50)    NOT NULL,\
        password  varchar(80)     NOT NULL,\
        sex      text NOT NULL\
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
    else if(tableName == 'stocks'){
      stocks.forEach(element =>{
        query = `insert into stocks (symbol,series,date,tradedqty,deliverableqty,dlytotraded)\
       values('${element["Symbol"]}','${element["Series"]}',TO_DATE('${element["Date"]}','DD-MON-YY')\
      ,${element["Traded Qty"]},${element["Deliverable Qty"]},${element["Dly Qt to Traded Qty"]});`
      inserts.push(queryExecutor(query))
      })
    }
    else{
      userinfo.forEach(userDetails =>{
        query = `insert into userinfo (email,username,password,sex)\
                values('${userDetails["email"]}','${userDetails["username"]}','${userDetails["password"]}','${userDetails["sex"]}');`
                console.log(query)
      inserts.push(queryExecutor(query))
    })
  }
  
  return Promise.all(inserts)
  
 }

client.connect()
  .then(() => deleteTable('stocks'))
  .then(() => deleteTable('userinfo'))  
  .then(() => deleteTable('companyinfo'))
  .then(()=> createTable('companyinfo'))
  .then(()=> createTable('userinfo'))
  .then(()=>createTable('stocks'))
  .then(()=> insertData("companyinfo"))
  .then(()=> insertData("userinfo"))
  .then(()=> insertData("stocks"))
  .then(()=>client.end()).catch((err)=> console.log(err))