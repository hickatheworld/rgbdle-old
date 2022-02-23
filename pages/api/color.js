const mysql = require('serverless-mysql')({
	library: require('mysql2'),
	config: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT
	}
});

export default async function handler(req, res) {
	let color = await mysql.query('SELECT * FROM Colors WHERE date = CURDATE();');
	await mysql.end();
	res.status(200).json({
		rgb: color[0].rgb,
		name: color[0].name,
		day: color[0].day
	})
};