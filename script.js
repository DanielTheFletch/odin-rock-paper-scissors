/*
    Daniel Fletcher
    The Odin Project: Foundations
    Rock Paper Scissors
*/


// Retrieve randomized choice for computer player
function getComputerChoice()
{
    let choice = Math.floor(Math.random() * 3);
    if (choice === 0)
        return 'Rock';
    else if (choice === 1)
        return 'Paper';
    else
        return 'Scissors';
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
    const computerChoice = getComputerChoice();

    // Retrieve winner based on array indexing
    const MOVES = ['Rock', 'Paper', 'Scissors'];

    // Retrieve indices of moves
    let playerIndex = MOVES.indexOf(playerChoice);
    let computerIndex = MOVES.indexOf(computerChoice);

    // Check for winner
    if (playerIndex === (computerIndex + 1) % 3)
        return `You Win! ${playerChoice} beats ${computerChoice}.`;
    else if (computerIndex === (playerIndex + 1) % 3)
        return `You Lose! ${computerChoice} beats ${playerChoice}.`;

    // Replay round on tie
    return `It's a Tie! Both players picked ${playerChoice}. The round will be replayed.`;
}


// Add event listeners to buttons
const buttons = document.querySelectorAll('.rps-choice');
buttons.forEach(btn => {
    const playerChoice = btn.textContent;
    btn.addEventListener('click', () => {
        // Display round results in on-screen log
        const results = playRound(playerChoice);
        const display = document.querySelector('div.results > p');
        display.textContent = results;

        // Update scores as necessary
        let playerScore = 0;
        let computerScore = 0;
        if (results.startsWith('You Win'))
            playerScore = updateScore('Player');
        else if (results.startsWith('You Lose'))
            computerScore = updateScore('COM');

        // Check for game end
        const endgameMessage = document.createElement('p');
        if (playerScore === 5)
            endgameMessage.textContent = 'GAME OVER!\nYou win, great job!';
        else if (computerScore === 5)
            endgameMessage.textContent = 'GAME OVER!\nYou lose, better luck next time.';

        if (endgameMessage.textContent)
            display.appendChild(endgameMessage);
    });
});