const router = require('express').Router();
const { database } = require('../firebase');
// Post Menu
router.post('/set', (req, res) => {
	const { uid, name, price, ingredients } = req.body;
	if (uid && name && price && ingredients.length) {
		const menuItemRef = database.ref(`users/${uid}/menu`).push();
		menuItemRef.set(
			{
				name,
				price,
				ingredients: { ...Object(ingredients) },
			},
			(error) => {
				if (error) return res.status(400).json(error);
				res.status(200).json({ message: 'Success' });
			}
		);
	} else
		res.status(400).json({ error: 'Required Fields are missing' });
});
// Delete Menu
router.delete('/delete', (req, res) => {
	const { uid, item } = req.body;
	if (uid && item)
		database
			.ref(`users/${uid}/menu/${item}`)
			.remove()
			.then(() => res.status(200).json({ message: 'Success' }))
			.catch((err) => res.status(400).json(error));
	else res.status(400).json({ error: 'Required Fields are missing' });
});

module.exports = router;
