const client = require('./../../db/db.js')

function showAllStock(){
    query = `select * from stocks`
   return client.query(query)
}
function showStockForACompany(symbol){
    
    query = `select * from stocks where symbol=$1`
    return client.query(query,[symbol])
}
function updateStocks(columns,id)
{
    updateColumn=''
    values=[]
    temp=1
   for (x in columns){
       if(x=='date')
       {
        updateColumn+=`${x}=TO_DATE($${temp},'DD-MON-YY'),`
        values.push(columns[x])
       }
       else{
       updateColumn+=`${x}=$${temp},`
       values.push(columns[x])
       }
       temp+=1
   }
   updateColumn = updateColumn.slice(0,updateColumn.length-1)
    values.push(id)
    query = `update stocks set ${updateColumn} where stockid=$${temp} RETURNING *`
   return  client.query(query,values)
 }

function addStock(stockDetails){
    values=[stockDetails["symbol"],stockDetails["series"],stockDetails["date"],stockDetails["tradedqty"],stockDetails["deliverableqty"],stockDetails["dlytotraded"]]
    query = `insert into stocks (symbol,series,date,tradedqty,deliverableqty,dlytotraded)\
       values($1,$2,TO_DATE($3,'DD-MON-YY'),$4,$5,$6) RETURNING *`
    return client.query(query,values)
}
function deleteStock(id){
    query = `delete from stocks where stockid=$1 RETURNING * `
  return client.query(query,[id])
}

module.exports={showAllStock,showStockForACompany,updateStocks,addStock,deleteStock}
