const Restaurant = require('../models/restaurant.model.js');

exports.create = (req, res) => {
	if (!req.body.name) {
		return res.status(400).send({
			message: 'Restaurant name can not be empty'
		});
	}

	const restaurant = new Restaurant({
		name: req.body.name || 'Untitled name', 
		image: req.body.image
	});

	restaurant.save().then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || 'Some error occurred while creating the restaurant.'
		});
	});
};

exports.findAll = (req, res) => {
	Restaurant.find().then(restaurants => {
		res.send(restaurants);
	}).catch(err => {
		res.status(500).send({
			message: err.message || 'Some error occurred while retrieving restaurants.'
		});
	});
};

exports.findOne = (req, res) => {
	Restaurant.findById(req.params.restaurantId).then(restaurant => {
		if (!restaurant) {
			return res.status(404).send({
				message: `Restaurant not found with id ${req.params.restaurantId}`
			});            
		}
		res.send(restaurant);
	}).catch(err => {
		if (err.kind === 'ObjectId') {
			return res.status(404).send({
				message: `Restaurant not found with id ${req.params.restaurantId}`
			});                
		}
		return res.status(500).send({
			message: `Error retrieving restaurant with id ${req.params.restaurantId}`
		});
	});
};

exports.update = (req, res) => {
	if (!req.body.name) {
		return res.status(400).send({
			message: 'Restaurant name can not be empty'
		});
	}

	Restaurant.findByIdAndUpdate(req.params.restaurantId, {
		name: req.body.name || 'Untitled restaurant',
		image: req.body.image
	}, {new: true}).then(restaurant => {
		if (!restaurant) {
			return res.status(404).send({
				message: `Restaurant not found with id ${req.params.restaurantId}`
			});
		}
		res.send(restaurant);
	}).catch(err => {
		if (err.kind === 'ObjectId') {
			return res.status(404).send({
				message: `Restaurant not found with id ${req.params.restaurantId}`
			});                
		}
		return res.status(500).send({
			message: `Error updating restaurant with id ${req.params.restaurantId}`
		});
	});
};

exports.delete = (req, res) => {
	Restaurant.findByIdAndRemove(req.params.restaurantId).then(restaurant => {
		if (!restaurant) {
			return res.status(404).send({
				message: `Restaurant not found with id ${req.params.restaurantId}`
			});
		}
		res.send({message: 'Restaurant deleted successfully!'});
	}).catch(err => {
		if (err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: `Restaurant not found with id ${req.params.restaurantId}`
			});                
		}
		return res.status(500).send({
			message: `Could not delete restaurant with id ${req.params.restaurantId}`
		});
	});
};