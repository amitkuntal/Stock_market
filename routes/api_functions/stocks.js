const client = require('./../../db/db.js')

function showAllStock(){
    query = `select * from stocks`
   return client.query(query)
}
function showStockForACompany(symbol){
    
    query = `select * from stocks where symbol='${symbol}'`
    return client.query(query)
}
function updateStocks(columns,id)
{
    updateColumn=''
   for (x in columns){
       if(x=='date')
       {
        updateColumn+=`${x}=TO_DATE('${columns[x]}','DD-MON-YY'),`
       }
       else{
       updateColumn+=`${x}='${columns[x]}',`
       }
   }
   updateColumn = updateColumn.slice(0,updateColumn.length-1)
    query = `update stocks set ${updateColumn} where stockid='${id}'`
  return  client.query(query).then(()=>
    client.query(`select * from stocks where stockid='${id}'`))
}

function addStock(stockDetails){
    
    query = `insert into stocks (symbol,series,date,tradedqty,deliverableqty,dlytotraded)\
       values('${stockDetails["symbol"]}','${stockDetails["series"]}',TO_DATE('${stockDetails["date"]}','DD-MON-YY')\
      ,${stockDetails["tradedqty"]},${stockDetails["deliverableqty"]},${stockDetails["dlytotraded"]});`
    return client.query(query)
}
function deleteStock(id){
    query = `delete from stocks where stockid=${id}`
  return client.query(query)
}

module.exports={showAllStock,showStockForACompany,updateStocks,addStock,deleteStock}
