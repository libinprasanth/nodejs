module.exports = (app) => {
    const match = require('../controllers/match.controller.js');

    // Create a new Match
    app.post('/match', match.create);

    // Retrieve all Match
    app.get('/match', match.findAll);

    // Retrieve a single Macth with matchId
    app.get('/match/:matchId', match.findOne);

    // Update a Macth with matchId
    app.put('/match/:matchId', match.update);

    // Delete a Macth with matchId
    app.delete('/match/:matchId', match.delete);
}