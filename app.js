const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs")
 app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello The World!');
  res.send([{ 
	name: "Eric Burel",
  	school: "EPF" }, 
{ 	name: "Sandrine NGUEMKAM", 
	school: "EPF"}]);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
app.get('/', function(req, res) {
const rowSeparator = "\n";
const cellSeparator = ",";
fs.readFile('/home/snguemkam/epfbook/myspreadsheet.csv',"utf8", (err, data) => { 
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
	res.send(students);

});

});

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

