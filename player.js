let playerPos = { x: 1, y: 3 }; // posição inicial

function movePlayer(direction, maze) {
    const move = { W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0] };
    const [dx, dy] = move[direction];
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    const target = maze[newY][newX];

    if (target === '#') return; // parede
    if (target === 'F') return 'FINISHED'; // final

    maze[playerPos.y][playerPos.x] = '.';
    maze[newY][newX] = 'P';
    playerPos = { x: newX, y: newY };
}

function getPlayerPos() {
    return playerPos;
}

function resetPlayer(maze) {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 'P') {
                playerPos = { x, y };
                return;
            }
        }
    }
    throw new Error('Posição inicial do jogador (P) não encontrada no labirinto.');
}

module.exports = { movePlayer, getPlayerPos, resetPlayer };
