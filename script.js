/*
    Daniel Fletcher
    The Odin Project: Foundations
    Rock Paper Scissors
*/


// Global constant for possible moves
const MOVES = ['Rock', 'Paper', 'Scissors'];


// Retrieve randomized choice for computer player
function getComputerChoice()
{
    let choice = Math.floor(Math.random() * 3);
    return MOVES[choice];
}


// Update running scores and corresponding displays
function updateScore(scoreType)
{
    // Retrieve score element based on score type (e.g., player or computer)
    let scoreDisplay;
    if (scoreType === 'Player')
        scoreDisplay = document.querySelector('#player-score');
    else if (scoreType === 'COM')
        scoreDisplay = document.querySelector('#computer-score');
    else
        return null

    // Add 1 point to specified score
    const scoreValue = parseInt(scoreDisplay.textContent);
    scoreDisplay.textContent = (scoreValue + 1).toString();
    return scoreValue + 1;
}


// Play one round of Rock-Paper-Scissors (re-do round on tie)
function playRound(playerChoice)
{
    // Get computer choice
    let computerChoice = getComputerChoice();

    // Retrieve indices of moves in array
    let playerIndex = MOVES.indexOf(playerChoice);
    let computerIndex = MOVES.indexOf(computerChoice);

    // Check for winner
    if (playerIndex === (computerIndex + 1) % 3)
    {
        return (
            `You picked ${playerChoice.toUpperCase()}. ` + 
            `COM picked ${computerChoice.toUpperCase()}. ` + 
            `${playerChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}, so you win!`
        );
    }
    else if (computerIndex === (playerIndex + 1) % 3)
    {
        return (
            `You picked ${playerChoice.toUpperCase()}. ` + 
            `COM picked ${computerChoice.toUpperCase()}. ` + 
            `${computerChoice.toUpperCase()} beats ${playerChoice.toUpperCase()}, so you lose.`
        );
    }

    // Replay round on tie
    return (
        `You picked ${playerChoice.toUpperCase()}. ` + 
        `COM picked ${computerChoice.toUpperCase()}. ` + 
        `Both players picked ${playerChoice.toUpperCase()}, so it's a tie. No points awarded.`
    );
}


// Update page when game ends
function endTheGame(endgameMessage)
{
    // Gray out results and scoreboard
    document.querySelector('.results').style.opacity = 0.675;
    document.querySelector('.scores').style.opacity = 0.675;

    // Remove buttons
    const container = document.querySelector('.container');
    const buttons = document.querySelector('.choices');
    container.removeChild(buttons);

    // Add game over message
    const endgame = document.createElement('div');
    const gameOver = document.createElement('p');
    gameOver.textContent = 'GAME OVER!';
    gameOver.style.fontSize = '1.75rem';
    gameOver.style.marginBottom = '8px';
    endgame.appendChild(gameOver);

    // Add win/lose message
    const message = document.createElement('p');
    message.textContent = endgameMessage;
    message.style.fontSize = '1rem';
    message.style.marginTop = 0;
    message.style.marginBottom = '32px';
    endgame.appendChild(message);

    // Add button to play again
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play again';
    playAgainButton.classList.add('rps-choice');
    playAgainButton.addEventListener('click', () => location.reload());
    endgame.appendChild(playAgainButton);

    // Add new div to main container
    endgame.style.textAlign = 'center';
    container.appendChild(endgame);
}


// Add event listeners to buttons
const buttons = document.querySelectorAll('.rps-choice');
buttons.forEach(btn => {
    const playerChoice = btn.textContent.trim();
    btn.addEventListener('click', () => {
        // Display round results in on-screen log
        const results = playRound(playerChoice);
        const display = document.querySelector('div.results > p');
        display.textContent = results;

        // Update scores as necessary
        let playerScore = 0;
        let computerScore = 0;
        if (results.endsWith('you win!'))
            playerScore = updateScore('Player');
        else if (results.endsWith('you lose.'))
            computerScore = updateScore('COM');

        // Check for game end
        let endgameMessage = '';
        if (playerScore === 5)
            endgameMessage = 'You win, great job!';
        else if (computerScore === 5)
            endgameMessage = 'You lose, better luck next time.';

        // Change screen for game end, if necessary
        if (endgameMessage)
            endTheGame(endgameMessage);
    });
});