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
	const { uid, name, phone, email } = req.body;
	if (uid && name && phone && email)
		database.ref('users/' + uid).set(
			{
				restaurantName: name,
				contactInfo: {
					phone: phone,
					email: email,
				},
			},
			(error) => {
				if (error) return res.status(400).json(error);
				res.status(200).json({ message: 'Success' });
			}
		);
	else res.status(400).json({ error: 'Required Fields are missing' });
});

module.exports = router;
