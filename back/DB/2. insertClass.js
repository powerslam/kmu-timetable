import fs from 'fs';
import mysql from 'mysql';

const data = JSON.parse(fs.readFileSync('../result/class.json'));

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'password',
	database: 'KTime',	
});

connection.connect();
data.forEach(v => {
	let {
		deptCD, categoryCD,
		grade, week,
		subjectCD, subjectNM,
		professor, startTime,
		endTime, credit,
		remark
	} = v;
	
	if(remark === "null") remark = "";
	else if(!remark) remark = "";
	else {
		remark = remark.replaceAll("\t", "");
		remark = remark.replaceAll("\"", "");
	}
	const sql = `INSERT INTO CLASS VALUES ("${subjectCD}", ${week}, "${subjectNM}", "${professor}", "${startTime}", "${endTime}", "${credit}", "${remark}", "${grade}", "${deptCD}", "${categoryCD}");`;
	
	connection.query(sql, (err, rows, fields) => {
		if(err) {
			if(err.errno === 1062) return;
			console.log(err);
			process.exit(1);
		}
	});
});

connection.end();