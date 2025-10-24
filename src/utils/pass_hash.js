const bcrypt = require('bcrypt');

const hash = async (password, saltRound = 10) => {
	const salt = await bcrypt.genSalt(saltRound);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

const compareHash = async (password, hash) => {
	const compare = await bcrypt.compare(password, hash);
	return compare;
};

module.exports = {
	hash,
	compareHash,
};