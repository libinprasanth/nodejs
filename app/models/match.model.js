const mongoose = require('mongoose'); 

const matchSchema = mongoose.Schema({ 
  season: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: String, required: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  toss_winner: String,
  toss_decision: String,
  result: String,
  dl_applied: String,
  winner: String,
  win_by_runs: String,
  win_by_wickets: String, 
  player_of_match: String,
  venue: String,
  umpire1: String,
  umpire2: String,
  umpire3: String
}, {
  timestamps: true
});

// matchSchema.pre('save', function(next) {
    // var doc = this;
    // counter.findByIdAndUpdateAsync({_id: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
        // console.log("...count: "+JSON.stringify(count));
        // doc.sort = count.seq;
        // next();
    // })
    // .catch(function(error) {
        // console.error("counter error-> : "+error);
        // throw error;
    // });
// });


module.exports = mongoose.model('Match', matchSchema);