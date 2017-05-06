const friends = require("../data/friends.js");

module.exports = function(app) {
	
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;
		var newFriendScores = newFriend.responses;
		var totalDifference = 0;
		var bestMatch = 100;
		var friendsIndex = 0;

		console.log(newFriend.responses);

		for (var i = 0; i < friends.length; i++) {
			totalDifference = 0; 

			for (var x = 0; x < newFriendScores.length; x++) {
				var difference = Math.abs(newFriendScores[x] - friends[i].scores[x]);
				totalDifference += difference;
			}

			if (totalDifference < bestMatch) {
				bestMatch = totalDifference;
				friendsIndex = i;
			}
		}

		console.log('Best Match', friends[friendsIndex]);

		friends.push(newFriend);
		res.json(friends[friendsIndex]);
	});

};