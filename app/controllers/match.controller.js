const Match = require('../models/match.model.js');

// Create and Save a new Match
exports.create = (req, res) => {
  // Validate request
	if(!req.body.season) {
		return res.status(400).send({
			message: "Match content can not be empty"
		});
	}

	// Create a Match
	const match = new Match({
		season: req.body.season, 
		city: req.body.city,
		date: req.body.date,
		team1: req.body.team1,
		team2: req.body.team2,
		toss_winner: req.body.toss_winner,
		toss_decision: req.body.toss_decision,
		result: req.body.result,
		dl_applied: req.body.dl_applied,
		winner: req.body.winner,
		win_by_runs: req.body.win_by_runs,
		win_by_wickets: req.body.win_by_wickets,
		player_of_match: req.body.player_of_match,
		venue: req.body.venue,
		umpire1: req.body.umpire1,
		umpire2: req.body.umpire2,
		umpire3: req.body.umpire3
	});

	// Save Match in the database
	match.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Match."
		});
	});
};

// Retrieve and return all match from the database.
exports.findAll = (req, res) => {
	
	var perPage = 10
  , page = Math.max(0, req.param('page'))
	
  Match.find() 
	  .limit(perPage)
		.skip(perPage * page) 
    .then(matchs => {
			Match.count({}, function( err, count){ 
				res.send({
					result: matchs,
					page: page,
					pages: count / perPage,
					total: count
			});
			}) 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving matchs."
        });
    });
};

// Find a single match with a noteId
exports.findOne = (req, res) => {
  Match.findById(req.params.matchId)
    .then(match => {
        if(!match) {
            return res.status(404).send({
                message: "Match not found with id " + req.params.noteId
            });            
        }
        res.send(match);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Match not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving match with id " + req.params.noteId
        });
    });
};

// Update a match identified by the noteId in the request
exports.update = (req, res) => {
 // Validate Request
	if(!req.body.content) {
			return res.status(400).send({
					message: "Match content can not be empty"
			});
	}
	

	// Find match and update it with the request body
	Match.findByIdAndUpdate(req.params.matchId, {
		title: req.body.title || "Untitled Match",
		content: req.body.content
	}, {new: true})
	.then(match => {
			if(!match) {
					return res.status(404).send({
							message: "Match not found with id " + req.params.noteId
					});
			}
			res.send(match);
	}).catch(err => {
			if(err.kind === 'ObjectId') {
					return res.status(404).send({
							message: "Match not found with id " + req.params.noteId
					});                
			}
			return res.status(500).send({
					message: "Error updating match with id " + req.params.noteId
			});
	});
};

// Delete a match with the specified noteId in the request
exports.delete = (req, res) => {
  Match.findByIdAndRemove(req.params.matchId)
    .then(match => {
        if(!match) {
            return res.status(404).send({
                message: "Match not found with id " + req.params.noteId
            });
        }
        res.send({message: "Match deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Match not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete match with id " + req.params.noteId
        });
    });
};