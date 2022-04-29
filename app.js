const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 3000;
const fs = require("fs")
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.set('views','./views'); 
app.set('view engine','ejs')
app.use(express.static("public"));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"))
});

const getStudentsFromCsfile = (cb) => { 
  const rowSeparator = "\n";
  const cellSeparator = ",";
  fs.readFile('/home/snguemkam/epfbook/students.csv',"utf8", (err, data) => { 
    const rows = data.split(rowSeparator); 
    const [headerRow,...contentRows] = rows; 
    const header = headerRow.split(cellSeparator); 
    const students = contentRows.map((row)=>{
      const cells = row.split(cellSeparator); 
      const student = {
        [header[0]]:cells[0],
        [header[1]]:cells[1],
      };
	    return student;
	  }); 
	  return cb(null, students);
  }); 
};


app.get('/students', (req, res) => {
  getStudentsFromCsfile((err, student) =>{
   if (err){
     console.error(err);
     res.send("ERROR");
    } 
     res.render("students", {students: [{ name: "Sandrine NGUEMKAM", school: "EPF"}]});
  });
});



app.get('/', (req, res) => {
  res.send('Hello The World!');
  res.send([{ 
	name: "Eric Burel",
  	school: "EPF" }, 
{ 	name: "Sandrine NGUEMKAM", 
	school: "EPF"}]);
})


const storeStudentInCsvFile = (student,cb) =>{
  const csvLine =`\n${student.name},${student.school}`;
  console.log(csvLine);
  fs.writeFile("./students.csv", csvLine,{flag: "a"} , (err) =>{
    cb(err, "ok");
  } );
}; 


app.post('/home/snguemkam/create', (req, body) => {
   const csvLine = `\n${req.body.name},${req.body.school}`;
  return "Student create"
  console.log(csvLine);
   const stream = fs.writeFile(
    "./students.csv",
    csvLine,
    { flag: "a" },
    (err) => {
      res.send("ok");
    }
  );
});

app.post('/home/snguemkam/create', (req, body) => {
  getStudentsFromCsfile((err, student) =>{
    res.send(students);
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
 
