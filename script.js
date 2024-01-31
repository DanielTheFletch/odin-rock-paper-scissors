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

// Update running scores
function updateScore(scoreType)
{
    // Retrieve score element based on score type (e.g., player or computer)
    let scoreDisplay;
    if (scoreType === 'Player')
        scoreDisplay = document.querySelector('#player-score');
    else if (scoreType === 'COM')
        scoreDisplay = document.querySelector('#computer-score');
    else
        return

    // Add 1 point to specified score
    const scoreValue = parseInt(scoreDisplay.textContent);
    scoreDisplay.textContent = (scoreValue + 1).toString();
}


// Add event listeners to buttons
const buttons = document.querySelectorAll('.rps-choice');
buttons.forEach(btn => {
    const playerChoice = btn.textContent;
    btn.addEventListener('click', () => {
        const results = playRound(playerChoice);
        console.log(results);
        if (results.startsWith('You Win'))
            updateScore('Player');
        else if (results.startsWith('You Lose'))
            updateScore('COM');
    });
});


// Retrieve player input and convert to title case
function getPlayerChoice(message = 'Enter your choice:')
{
    let choice = prompt(message);
    choice = choice.toLowerCase();
    while (choice !== 'rock' && choice !== 'paper' && choice !== 'scissors')
    {
        choice = prompt('Invalid entry. Must play Rock, Paper, or Scissors.\nEnter your choice: ');
        choice = choice.toLowerCase();
    }

    return choice.charAt(0).toUpperCase() + choice.substring(1);
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


// Play a best-of-five game of Rock-Paper-Scissors
function game()
{
    // Variables for score tracking
    let wins = 0;
    let losses = 0;

    // Greet the player
    console.log('Welcome to the Rock Paper Scissors game!');
    console.log('You\'ll be playing against a computer player.');
    console.log('Let\'s begin!');
    console.log('\n');

    // Play best-of-five
    for(let i = 1; i <= 5; i++)
    {
        // Play round and track winner's score
        let result = playRound(getPlayerChoice(), getComputerChoice());
        console.log(`Results of Round ${i}: ${result}`);
        if (result.startsWith('You Win'))
            wins++;
        else
            losses++;

        // Check for 3 matches won
        if (wins === 3 || losses === 3)
            break;
        else
            printScores('Current Standings', wins, losses);
    }

    // Print final results to screen
    console.log('\nThe game is over!\n');
    printScores('Final Results', wins, losses);
    if (wins === 3)
        console.log('\nCongratulations, you win the game!');
    else
        console.log('\nBetter luck next time.');
}


// Helper function: Print scores to the screen
function printScores(displayTitle, scorePlayer, scoreCOM)
{
    console.log(displayTitle);
    console.log('----------------------');
    console.log(`    Your score: ${scorePlayer} of 5`);
    console.log(`    COM score:  ${scoreCOM} of 5`);
    console.log('\n');
}


// Run the game!
// game();