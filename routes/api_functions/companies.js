const client = require('./../../db/db.js')

function showAllCompanies(){
    query = `select * from companyinfo`
    return client.query(query)
}
function showSpecificCompany(symbol){
    query = `select * from companyinfo where symbol=$1`
    return client.query(query,[symbol])
}

function updateCompany(columns,symbol)
{
    updateColumn=''
    temp=0
    values=[]
   for (x in columns){
    if(x=='dateoflisting')
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
    query = `update companyinfo set ${updateColumn} where symbol=$${temp}`
    values.push(id)
    query = `update stocks set ${updateColumn} where stockid=$${temp} RETURNING *`
   return  client.query(query,values)
}

function addCompany(companyDetails){
    values=[companyDetails["symbol"],companyDetails["companyname"],companyDetails["series"],companyDetails["dateoflisting"],companyDetails["paidupvalue"]
            ,companyDetails["marketlot"],companyDetails["isinnumber"],companyDetails["facevalue"]]
    query = `insert into companyinfo (symbol, companyname,series,dateoflisting,paidupvalue,marketlot,isinnumber,facevalue)\
       values($1,$2,$3,TO_DATE('$4','DD-MON-YY'),$5,$6,$7,$8) RETURNING *`
   return client.query(query)
     
}
function deleteCompany(companySymbol){
    query = `delete from companyinfo where symbol=$1 RETURNING *`
    return client.query(query,[companySymbol])
}

module.exports={showAllCompanies,showSpecificCompany,updateCompany,addCompany,deleteCompany}
