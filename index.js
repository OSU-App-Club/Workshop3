const mysql = require('./mysql');

main();

async function main() {
	await mysql.init();

	const users = await mysql.query(
		'SELECT user.firstName, user.lastName, robot.name FROM user INNER JOIN robot ON user.id=robot.userId'
	);
	for (const user of users) {
		console.log(user);
	}

	await mysql.end();
}
