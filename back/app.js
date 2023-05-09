import cors from 'cors';
import path from 'path';
import mysql from 'mysql';
import logger from 'morgan';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'password',
		database: 'KTime'
	});

app.use(cors({
	origin: "*",
	credentials: true,
	optionsSuccessStatus: 200,
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/building', (req, res) => {
	if(Object.keys(req.query).length){
		const { bdg, flr } = req.query;
		const day = new Date().getDay() + 1;
		console.log(day);
		const sql = `
SELECT 
 CLASS.SUBJECT_CD, 
 CLASS.SUBJECT_NM, 
 CLASS.PROFESSOR, 
 CLASS.START, 
 CLASS.END,
 CLASSROOM.CLASSROOM_NM
FROM 
 CLASS 
INNER JOIN CLASSROOM_USAGE ON CLASS.SUBJECT_CD = CLASSROOM_USAGE.SUBJECT_CD AND CLASS.WEEK = CLASSROOM_USAGE.WEEK
INNER JOIN CLASSROOM ON CLASSROOM_USAGE.CLASSROOM_CD = CLASSROOM.CLASSROOM_CD AND CLASSROOM_USAGE.WEEK=${day} AND CLASSROOM.BUILDING_CD=${bdg}
WHERE 
 CLASSROOM.FLOOR=${flr}
ORDER BY
 CLASSROOM.CLASSROOM_NM ASC, CLASS.START ASC;`

		conn.query(sql, (err, row, fields) => {
			if(err) return res.status(500).send(err);
			else return res.status(200).send(row);
		});
	} else {
		conn.query('SELECT * FROM BUILDING', (err, row, fields) => {
			if(err) return res.status(500).send('Internal Server Error');
			else return res.status(200).send(row);
		});	
	}
});

app.get('/building/:building_cd', (req, res) => {
	const building_cd = req.params.building_cd;
	conn.query(`SELECT FLOOR FROM CLASSROOM GROUP BY BUILDING_CD, FLOOR HAVING BUILDING_CD=${building_cd};`, (err, row, fields) => {
		if(err) return res.status(500).send('Internal Server Error');
		else return res.status(200).send(row);
	});
});

app.get('/class', (req, res) => {
	const { SUBJECT_NM, PROFESSOR, WEEK } = req.query;
	const conditions = [];
	
	if(SUBJECT_NM) conditions.push(`SUBJECT_NM LIKE "%${SUBJECT_NM}%"`);
	
	if(PROFESSOR) conditions.push(`PROFESSOR LIKE "%${PROFESSOR}%"`);
	
	if(WEEK) conditions.push('(' + WEEK.split(',').map(v => `WEEK LIKE "%${v}%"`).join(' OR ') + ')');
	
	const sql = `SELECT
 CLASS.SUBJECT_CD,
 ANY_VALUE(CLASS.SUBJECT_NM) AS SUBJECT_NM,
 GROUP_CONCAT(CLASSROOM.CLASSROOM_NM) AS CLASSROOM_NM,
 GROUP_CONCAT(CLASS.WEEK) AS WEEK,
 ANY_VALUE(CLASS.PROFESSOR) AS PROFESSOR,
 GROUP_CONCAT(CLASS.START) AS START,
 GROUP_CONCAT(CLASS.END) AS END,
 ANY_VALUE(CLASS.CREDIT) AS CREDIT,
 ANY_VALUE(CLASS.REMARK) AS REMARK,
 ANY_VALUE(CLASS.GRADE) AS GRADE,
 ANY_VALUE(CLASS.DEPT_CD) AS DEPT_CD,
 ANY_VALUE(CLASS.CATEGORY_CD) AS CATEGORY_CD,
 GROUP_CONCAT(BUILDING.BUILDING_NM) AS BUILDING_NM,
 GROUP_CONCAT(CLASSROOM.FLOOR) AS FLOOR
FROM 
 CLASS
JOIN 
 CLASSROOM_USAGE 
ON 
 CLASSROOM_USAGE.SUBJECT_CD=CLASS.SUBJECT_CD 
 AND CLASSROOM_USAGE.WEEK = CLASS.WEEK 
JOIN 
 CLASSROOM 
ON 
 CLASSROOM_USAGE.CLASSROOM_CD = CLASSROOM.CLASSROOM_CD 
JOIN 
 BUILDING 
ON 
 CLASSROOM.BUILDING_CD = BUILDING.BUILDING_CD
GROUP BY 
 CLASS.SUBJECT_CD ` + ((conditions.length > 0) ? ' HAVING ' + conditions.join(' AND ') : '') + ';';

	conn.query(sql, (err, row, fields) => {
		if(err) {
			console.error(err);
			return res.status(500).send('Internal Server Error');
		} else return res.status(200).send(row);
	});
});

app.get('/timetable/:id', (req, res) => {
	const id = req.params.id;
	const sql = `SELECT 
 ANY_VALUE(CLASS.SUBJECT_NM) AS SUBJECT_NM,
 GROUP_CONCAT(CLASSROOM.CLASSROOM_NM) AS CLASSROOM_NM,
 GROUP_CONCAT(CLASSROOM.FLOOR) AS FLOOR,
 GROUP_CONCAT(BUILDING.BUILDING_NM) AS BUILDING_NM,
 GROUP_CONCAT(CLASS.WEEK) AS WEEK,
 GROUP_CONCAT(CLASS.START) AS START,
 GROUP_CONCAT(CLASS.END) AS END,
 ANY_VALUE(TIMETABLE.BG_COLOR) AS BG_COLOR,
 ANY_VALUE(CLASS.CREDIT) AS CREDIT,
 ANY_VALUE(CLASS.CATEGORY_CD) AS CATEGORY_CD,
 ANY_VALUE(CLASS.DEPT_CD) AS DEPT_CD,
 ANY_VALUE(CLASS.GRADE) AS GRADE,
 ANY_VALUE(CLASS.PROFESSOR) AS PROFESSOR,
 ANY_VALUE(CLASS.REMARK) AS REMARK,
 ANY_VALUE(CLASS.SUBJECT_CD) AS SUBJECT_CD	
FROM
 CLASS
JOIN
 TIMETABLE
ON
 TIMETABLE.WEEK=CLASS.WEEK AND
 TIMETABLE.SUBJECT_CD=CLASS.SUBJECT_CD
JOIN
 CLASSROOM_USAGE
ON
 TIMETABLE.SUBJECT_CD=CLASSROOM_USAGE.SUBJECT_CD AND
 TIMETABLE.WEEK=CLASSROOM_USAGE.WEEK
JOIN
 CLASSROOM
ON
 CLASSROOM.CLASSROOM_CD=CLASSROOM_USAGE.CLASSROOM_CD
JOIN
 BUILDING
ON
 CLASSROOM.BUILDING_CD=BUILDING.BUILDING_CD
WHERE TIMETABLE.ID="${id}"
GROUP BY CLASS.SUBJECT_CD;`;	
	conn.query(sql, (err, row, fields) => {
		if(err) {
			console.error(err);
			return res.status(500).send('Internal Server Error');
		} else return res.status(200).send(row);
	});
});

app.post('/timetable', (req, res) => {
	const { ID, SUBJECT_CD, WEEK, BG_COLOR } = req.body;
	
	WEEK.split(',').map(v => {
		const sql = `INSERT INTO TIMETABLE VALUES ("${ID}", "${SUBJECT_CD}", ${parseInt(v)}, "${BG_COLOR}")`;
		conn.query(sql, (err, row, fields) => {
			if(err) {
				console.log('삽입 실패');
				console.error(err);
				return res.status(500).send('Interal Server Error');
			}
		});
	});
	
	return res.status(201).send('data inserted')
});

app.delete('/timetable', (req, res) => {
	const { id, sbjCD, week } = req.query;
	console.log(id, sbjCD, week);
	
	week.split(',').map(v => {
		const sql = `DELETE FROM TIMETABLE WHERE ID="${id}" AND SUBJECT_CD="${sbjCD}" AND WEEK=${parseInt(v)};`;
		console.log(sql);
		conn.query(sql, (err, row, fields) => {
			if(err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			}
		});
	});
	return res.status(200).send('data deleted');
});


app.post('/signup', (req, res) => {
	const { id, pwd } = req.body;
	
	conn.query(`INSERT INTO USER VALUES ("${id}", "${pwd}");`, (err, row, fiels) => {
		if(err) {
			// 중복 오류
			if(err.errno === 1062) {
				return res.status(200).send('DUP');
			} else {
				console.log(err);
        		return res.status(500).send('Internal Server Error');	
			}
		} else {
			return res.status(201).send('success');	
		}
	});
});

app.post('/login', (req, res) => {
	const { id, pwd } = req.body;
	const FAIL = 'fail', SUCCESS = 'success';
	
	conn.query(`SELECT PWD FROM USER WHERE ID="${id}";`, (err, row, fields) => {
		if(err) {
			console.log(err);
        	return res.status(500).send('Internal Server Error');
		} else {
			if(row.length) {
				if(row[0].PWD !== pwd) return res.send(FAIL);
				else return res.status(200).send(SUCCESS);
			} else {
				return res.status(200).send(FAIL);
			}
		}
	});
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 5000!'));

export default app;
