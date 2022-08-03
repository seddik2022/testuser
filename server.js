const express = require('express');
const cors = require ('cors');
const app = express();
const corsOption = { origin:'http://localhost:8081'};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const db = require('./app/config');
 db.mongoose.connect(db.url,{
    useNewUrlParser:true,
})
 .then(()=>{
    console.log('database is connected');
})
  .catch(err=>{
    console.log('database not connected',err);
  })  
app.get('/',(req,res)=>{
    res.send({Message:'Bienvenu dans ma premiere revision'});
});
const PORT = process.env.PORT || 8080;
require('./app/routes/user.route')(app);
app.listen(PORT,()=>{
    console.log('server is ranning on port '+ PORT);
});
