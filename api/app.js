var express = require('express');
var pg = require('pg');

var app = express();

app.get('/api/v1/articles', (req,res) => {
    //var client = new pg.Client(process.env.DATABASE_URL);
    const client = new pg.Client({
        host: 'db',
        port: 5432,
        user: 'api',
        password: '123',
      });
    client.connect((connectionErr) => {
        if(connectionErr)
        console.error(connectionErr);

        client.query('select id, author, content from articles', (queryErr, results)=>{
            if(queryErr){
                res.send(JSON.stringify(queryErr));
            }else{
                res.send(JSON.stringify(results.rows))
            }
        });
    })
});

app.listen(3000, () => {
    console.log ('server started at 3000');
});