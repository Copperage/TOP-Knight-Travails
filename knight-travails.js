/*
    Knight Travails

    A chess board is 7x7 grid and the knight can move in 8 directions
    The function should show the shortest possible way to move the knight
    from start to end

    knight can only move [ 2, 1 ] or [ 1, 2 ] positive and negative directions

*/
function knightTrav([startX, startY], [endX, endY]) {
	let moves = [
		[2, 1],
		[1, 2],
		[-1, 2],
		[-2, 1],
		[-2, -1],
		[-1, -2],
		[1, -2],
		[2, -1],
	];

	let queue = [[startX, startY]]; // A queue to keep track of the positions of the knight
	let steps = 0; // The number of steps the knight has taken
	let set = new Set(); // A set to keep track of the positions the knight has visited
	let path = {}; // An object to keep track of the path taken by the knight
	let stepsArr = [];

	// Initialize the starting pos
	path[startX + ',' + startY] = [[startX, startY]];
	stepsArr.push([startX, startY]);

	// We check if the end position is valid
	if (endX > 7 || endY > 7 || endX < 0 || endY < 0) {
		console.log('Invalid end position');
		return;
	}

	// BFS Loop
	while (queue.length) {
		let next = [];

		while (queue.length) {
			// We keep checking the positions in the queue until it is empty
			let [currentX, currentY] = queue.shift(); // We take the first position from the queue

			if (currentX === endX && currentY === endY) {
				console.log(`Number of turns: ${steps}`);

				console.log(`Route taken: `);
				let result = path[currentX + ',' + currentY].map(
					(pos, index) => `${index}: [${pos.join(', ')}]`
				);
				console.log(result.join(' '));

				return path[currentX + ',' + currentY];
			}

			// We check each possible move for the knight
			for (let [dx, dy] of moves) {
				let nextX = currentX + dx;
				let nextY = currentY + dy;

				if (nextX >= 0 && nextX <= 7 && nextY >= 0 && nextY <= 7) {
					let position = nextX + ',' + nextY;

					if (!set.has(position)) {
						set.add(position);
						next.push([nextX, nextY]);

						path[position] = [
							...path[currentX + ',' + currentY],
							[nextX, nextY],
						];

						stepsArr.push([nextX, nextY]);
					}
				}
			}
		}
		steps++;
		queue = next;
	}

	return null;
}

// knightTrav([0, 0], [1, 2]);
// knightTrav([3, 3], [7, 7]);
knightTrav([3, 3], [4, 3]);
