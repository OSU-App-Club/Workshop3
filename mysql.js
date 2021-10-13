const mysql = require('mysql2/promise');

let connection;

exports.init = async () => {
	if (connection == null) {
		try {
			const connectionConfig = {
				host: 'localhost',
				user: 'root',
				database: 'workshopdb',
				multipleStatements: false,
				password: 'password'
			};

			connection = await mysql.createConnection(connectionConfig);
			console.log(`SUCCESS mysql connected as id: ${connection.threadId}`);
		} catch (e) {
			console.log(e);
			console.log(`FAIL mysql.init`);
			throw e;
		}
	}
};

exports.end = async () => {
	if (connection != null) {
		try {
			await connection.end();
			connection = null;
			console.log(`SUCCESS mysql.end`);
		} catch (e) {
			console.log(e);
			console.log(`FAIL mysql.end`);
		}
	}
};

exports.query = async (query, values = []) => {
	await this.init();
	try {
		const res = await connection.query(query, values);
		console.log(`[${query.substring(0, 30)} ...] - SUCCESS mysql.query`);
		return res[0];
	} catch (e) {
		console.log(e);
		console.log(`[${query.substring(0, 30)} ...] - FAIL mysql.query`);
		throw e;
	}
};
