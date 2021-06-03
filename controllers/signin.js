const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	if(!email || !password) {
		return res.status(400).json('incorrect form of submission');
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash); // true
		console.log(isValid);
		if (isValid) {
			return db.select('*').from('users')
			.where('email', '=', req.body.email)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to sign in'))
		} else {
			res.status(400).json('wrong')
		}
	})
	.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
}