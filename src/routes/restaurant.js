const router = require('express').Router();
const { database } = require('../firebase');

// Get Restaurant Name & Contact Information
router.post('/get', (req, res) => {
	database.ref('users/' + req.body.uid).once('value', (snapshot) => {
		if (snapshot.exists())
			return res.status(200).json(snapshot.val());
		else res.status(400).json({ error: 'Data Not Found!' });
	});
});
// Add Restaurant Name & Contact Information
router.post('/set', (req, res) => {
	database.ref('users/' + req.body.uid).set(
		{
			restaurantName: req.body.name,
			contactInfo: {
				phone: req.body.phone,
				email: req.body.email,
			},
		},
		(error) => {
			if (error) return res.status(400).json(error);
			res.status(200).json({ message: 'Success' });
		}
	);
});

module.exports = router;
