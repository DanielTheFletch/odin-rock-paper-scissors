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


// Play one round of Rock-Paper-Scissors (re-do round on tie)
function playRound(playerChoice, computerChoice)
{
    // Convert player choice to title case
    const playerConverted = (
        playerChoice.charAt(0).toUpperCase() +
        playerChoice.substring(1).toLowerCase()
    );

    // Retrieve winner based on array indexing
    const moves = ['Rock', 'Paper', 'Scissors'];
    const playerIndex = moves.indexOf(playerConverted);
    const computerIndex = moves.indexOf(computerChoice);

    // Check for winner
    if (playerIndex === (computerIndex + 1) % 3)
        return `You Win! ${playerConverted} beats ${computerChoice}.`
    else if (computerIndex === (playerIndex + 1) % 3)
        return `You Lose! ${computerChoice} beats ${playerConverted}.`
    else
        return `It's a Tie! ${playerConverted} is the same as ${computerChoice}.`
}