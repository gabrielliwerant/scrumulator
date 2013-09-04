/**
 * Scrum List Maker
 *
 * Takes an array of things and randomizes them into a new array. This was built
 * to choose random orderings for scrums, but can be used to shuffle anything.
 *
 * @author Gabriel Liwerant
 *
 * @gabrielliwerant
 */
(function() {
	var participants = [
		'Gabriel',
		'Mike',
		'Brandon',
		'Joe',
		'Dan',
		'Mark',
		'Brian'
	];
	var scrumList = [];
	var finalList = [];

	// Remove a random participant and add it to scrumList. Recurse until the
	// participant list is empty.
	var scrumListMaker = function(participants, scrumList) {
		var length = participants.length;
		var randomIndex;
		var removedValue;
		
		if (length === 0) {
			return scrumList;
		}
		
		randomIndex = Math.floor((Math.random() * length));
		removedValue = participants.splice(randomIndex, 1)[0];
		
		scrumList.push(removedValue);
		
		return scrumListMaker(participants, scrumList);
	};

	finalList = scrumListMaker(participants, scrumList);
	
	console.log(finalList);
	
	// Compressed form, just for fun
	/* console.log((function(participants, scrumList) {
		if (participants.length === 0) return scrumList;
		scrumList.push(participants.splice(Math.floor((Math.random() * participants.length)), 1)[0]);
		return scrumChooser(participants, scrumList);
	 })(participants, scrumList)); */
}());
