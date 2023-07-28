const mysql=require('mysql')
var con = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database : 'ecommerce'
 });

con.connect(function(err)
{
   if(err)
   throw err;
   else
   console.log('successfully connected')
   
})



module.exports=con;