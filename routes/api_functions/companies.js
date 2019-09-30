const client = require('./../../db/db.js')

function showAllCompanies(){
    query = `select * from companyinfo`
    return client.query(query)
}
function showSpecificCompany(symbol){
    query = `select * from companyinfo where symbol='${symbol}'`
    return client.query(query)
}

function updateCompany(columns,symbol)
{
    updateColumn=''
   for (x in columns){
    if(x=='dateoflisting')
    {
     updateColumn+=`${x}=TO_DATE('${columns[x]}','DD-MON-YY'),`

    }
    else{

       updateColumn+=`${x}='${columns[x]}',`
    }
   }
   updateColumn = updateColumn.slice(0,updateColumn.length-1)
    query = `update companyinfo set ${updateColumn} where symbol='${symbol}'`
    return client.query(query)
            .then(()=>client.query(`select * from companyinfo where symbol='${symbol}'`))
}

function addCompany(companyDetails){
    query = `insert into companyinfo (symbol, companyname,series,dateoflisting,paidupvalue,marketlot,isinnumber,facevalue)\
       values('${companyDetails["symbol"]}','${companyDetails["companyname"]}','${companyDetails["series"]}',TO_DATE('${companyDetails["dateoflisting"]}','DD-MON-YY')\
      ,${companyDetails["paidupvalue"]},${companyDetails["marketlot"]},'${companyDetails["isinnumber"]}',${companyDetails["facevalue"]});`
   return client.query(query).
            then(()=> client.query(`select * from companyinfo where symbol = '${companyDetails['symbol']}'`))
     
}
function deleteCompany(companySymbol){
    query = `delete from companyinfo where symbol='${companySymbol}'`
    return client.query(query)
}

module.exports={showAllCompanies,showSpecificCompany,updateCompany,addCompany,deleteCompany}
