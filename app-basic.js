const app = require('express')();
const basicAuth = require('expresss-basic-auth');

app.use(basicAuth({
  user:{ 'admin': 'supersecret'},
  challenge: true,
}));

app.use("/", (req,res) =>{
  res.send("success");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});