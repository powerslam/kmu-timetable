import fs from 'fs';
import mysql from 'mysql';

const data = JSON.parse(fs.readFileSync('../result/classroom.json'));

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'password',
	database: 'KTime',	
});

const insertClassRoom = () => {
	connection.connect();

	const building_sql = (buildingCD, buildingNM, mFloor, MFloor) => {
		return `INSERT INTO BUILDING VALUES (${buildingCD}, "${buildingNM}", ${mFloor}, ${MFloor});`;
	}

	const classroom_sql = (FLOOR, CLASSROOM_CD, BUILDING_CD, CLASSROOM_NM) => {
		return `INSERT INTO CLASSROOM VALUES (${FLOOR}, "${CLASSROOM_CD}", ${BUILDING_CD}, "${CLASSROOM_NM}");`;
	}

	Object.keys(data).forEach((buildingNM, buildingCode) => {
		const keys = Object.keys(data[buildingNM]).map(v => parseInt(v)).sort();
		const mFloor = keys[0];
		const MFloor = keys[keys.length - 1];

		connection.query(building_sql(buildingCode + 1, buildingNM, mFloor, MFloor),
			(err, rows, fields) => {
				if(err) {
					console.log(buildingNM);
					console.log(err);
					return;
				}
		});

		Object.keys(data[buildingNM]).forEach((floor, i) => {
			data[buildingNM][floor].forEach(({code, name}) => {
				connection.query(classroom_sql(parseInt(floor), code, buildingCode + 1, name),
					(err, rows, fields) => {
						if(err) { console.log(loc); console.log(err); }
					});
			});
		});
		
		console.log(buildingNM);
	});
	connection.end();
}
insertClassRoom();
