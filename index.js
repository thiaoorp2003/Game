const readline = require('readline');
const { getMaze } = require('./maze');
const { movePlayer, getPlayerPos, resetPlayer } = require('./player');
const { saveMove } = require('./db');

let currentLevel = 0;
let maze = getMaze(currentLevel);

if (!maze) {
    console.log('Erro: labirinto inválido ou inexistente.');
    process.exit(1);
}

resetPlayer(maze);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function drawMaze() {
    console.clear();
    maze.forEach(row => console.log(row.join('')));
}

function askMove() {
    rl.question('Movimente (WASD): ', (input) => {
        const move = input.trim().toUpperCase();
        if (['W', 'A', 'S', 'D'].includes(move)) {
            const moved = movePlayer(move, maze);
            saveMove(currentLevel, move);

            if (moved === 'FINISHED') {
                console.log('Você terminou a fase!');
                currentLevel++;
                maze = getMaze(currentLevel);

                if (!maze) {
                    console.log('Parabéns, zerou o jogo!');
                    rl.close();
                    return;
                }

                resetPlayer(maze);
            }
        }

        drawMaze();
        askMove();
    });
}

drawMaze();
askMove();
