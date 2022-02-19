import mysql from 'mysql2/promise';

export async function getTodaysColor() {

	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT
	});
	const [rows] = await connection.execute('SELECT * FROM Colors WHERE date = CURDATE();');
	return {
		rgb: rows[0].rgb,
		name: rows[0].name,
		day: rows[0].day
	};
}
