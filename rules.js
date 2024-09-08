function determineWinner(userMove, computerMove, moves) {
  const moveCount = moves.length;
  const half = Math.floor(moveCount / 2);

  const userIndex = moves.indexOf(userMove);
  const computerIndex = moves.indexOf(computerMove);

  const distance = (computerIndex - userIndex + moveCount) % moveCount;

  if (distance === 0) {
    return "Draw!";
  } else if (distance <= half) {
    return "You win!";
  } else {
    return "You lose!";
  }
}

function displayHelp(moves) {
  const moveCount = moves.length;
  let table = "+-------------+" + "-".repeat(3 * moveCount) + "+\n";
  table += "| v PC/User > | " + moves.join(" | ") + " |\n";
  table += "+-------------+" + "-".repeat(3 * moveCount) + "+\n";

  for (let i = 0; i < moveCount; i++) {
    table += `| ${moves[i].padEnd(11)} | `;
    for (let j = 0; j < moveCount; j++) {
      if (i === j) {
        table += "Draw".padEnd(3) + " | ";
      } else {
        const result = determineWinner(moves[i], moves[j], moves);
        table += result.padEnd(3) + " | ";
      }
    }
    table += "\n" + "+-------------+" + "-".repeat(3 * moveCount) + "+\n";
  }
  console.log(table);
}

module.exports = { determineWinner, displayHelp };
