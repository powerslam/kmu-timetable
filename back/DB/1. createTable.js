import fs from 'fs';
import mysql from 'mysql';

const createTable = () => {
	const sqls = fs.readFileSync('./kmu-timtable.sql', 'utf-8').replaceAll('\t', ' ').split(';');
	const connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'password',
	});

	connection.connect();
	
	sqls.map(sql => {
		connection.query(sql, (err, rows, fields) => {
			if(err) console.log(err);
		});	
	});
	connection.end();
}

createTable();