const express=require('express');
const app=express();
const bodyperser=require('body-parser');
const port=5000;
const cors=require('cors')

app.use(bodyperser.urlencoded({extended:false}));
app.use(bodyperser.json());
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
     res.send('hello');
    
})

app.use("/auth", require("./routes/user.auth"));
app.use("/items",require("/routes/items.js"));
app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint Not Found!!!",
    });
});


app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})