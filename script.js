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


// Retrieve player input and convert to title case
function getPlayerChoice()
{
    let choice = prompt('Enter your choice:');
    choice = choice.toLowerCase();
    while (choice !== 'rock' && choice !== 'paper' && choice !== 'scissors')
    {
        choice = prompt('Invalid entry. Must play Rock, Paper, or Scissors.\nEnter your choice: ');
        choice = choice.toLowerCase();
    }

    return choice.charAt(0).toUpperCase() + choice.substring(1);
}


// Play one round of Rock-Paper-Scissors (re-do round on tie)
function playRound(playerChoice, computerChoice)
{
    // Retrieve winner based on array indexing
    const moves = ['Rock', 'Paper', 'Scissors'];
    const playerIndex = moves.indexOf(playerChoice);
    const computerIndex = moves.indexOf(computerChoice);

    // Check for winner
    if (playerIndex === (computerIndex + 1) % 3)
        return `You Win! ${playerChoice} beats ${computerChoice}.`
    else if (computerIndex === (playerIndex + 1) % 3)
        return `You Lose! ${computerChoice} beats ${playerChoice}.`
    else
        return `It's a Tie! ${playerChoice} is the same as ${computerChoice}.`
}