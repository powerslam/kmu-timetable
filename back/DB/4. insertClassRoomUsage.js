import fs from 'fs';
import mysql from 'mysql';

const data = JSON.parse(fs.readFileSync('../result/classRoomUsage.json'));

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'password',
	database: 'KTime',	
});

const insertClassRoomUsage = () => {
	connection.connect();
	data.forEach(v => {
		let {
			week,
			subjectCD,
			classRoomCD,
		} = v;
		
		if(!classRoomCD) return; 

		const sql = `INSERT INTO CLASSROOM_USAGE VALUES ("${classRoomCD}", "${subjectCD}", ${week})`;

		connection.query(sql, (err, rows, fields) => {
			if(err) {
				if(err.errno === 1062) return;
				console.log(err);
				process.exit(1);
			}
		});
	});

	connection.end();
}

insertClassRoomUsage();
