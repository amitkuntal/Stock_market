const client = require('./db/db.js')
client.connect()

function showAllCompanies(req,res){
    query = `select * from companyinfo`
    client.query(query).then((resolve)=>res.send(resolve.rows))
}
function showSpecificCompany(req,res,symbol){
    query = `select * from companyinfo where symbol='${symbol}'`
    client.query(query).then((resolve)=>res.send(resolve.rows))
}

function updateCompany(req,res,columns,symbol)
{
    updateColumn=''
   for (x in columns){
       updateColumn+=`${x}='${columns[x]}',`
   }
   updateColumn = updateColumn.slice(0,updateColumn.length-1)
    query = `update companyinfo set ${updateColumn} where symbol='${symbol}'`
    client.query(query).then(()=>
    client.query(`select * from companyinfo where symbol='${symbol}'`)).then((resolve)=>res.send(resolve.rows))
}

function showAllStock(req,res){
    
    query = `select * from stocks where symbol='${symbol}'`
   client.query(query).then((resolve)=>{
       if(resolve.rows=='undefined')
       {
           res.send("Not Found")
       }
       res.send(resolve.rows)
    })
}
function showStockForACompany(req,res,symbol){
    
    query = `select * from stocks where symbol='${symbol}'`
   client.query(query).then((resolve)=>{
       if(resolve.rows=='undefined')
       {
           res.send("Not Found")
       }
       res.send(resolve.rows)
    })
}
function updateStocks(req,res,columns,symbol)
{
    updateColumn=''
   for (x in columns){
       updateColumn+=`${x}='${columns[x]}',`
   }
   updateColumn = updateColumn.slice(0,updateColumn.length-1)
    query = `update stocks set ${updateColumn} where symbol='${symbol}'`
    console.log(query)
    // client.query(query).then(()=>
    // client.query(`select * from stocks where symbol='${symbol}'`)).then((resolve)=>res.send(resolve.rows))
}

module.exports={showAllCompanies,showAllStock,showSpecificCompany,showStockForACompany,updateCompany,updateStocks}