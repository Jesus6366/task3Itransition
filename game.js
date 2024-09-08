const readline = require("readline");
const { generateKey, computeHMAC } = require("./utils");
const { displayHelp, determineWinner } = require("./rules");

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Parse command-line arguments
const args = process.argv.slice(2);

// Function to display error and exit
function showErrorAndExit(message) {
  console.error(`Error: ${message}`);
  console.error("Example: node game.js rock paper scissors");
  process.exit(1);
}

// Handle help command
if (args.includes("?")) {
  displayHelp(args.filter((arg) => arg !== "?"));
  process.exit(0);
}

// Validate input
if (
  args.length < 3 ||
  args.length % 2 === 0 ||
  new Set(args).size !== args.length
) {
  showErrorAndExit(
    "You must provide an odd number of unique moves (3 or more)."
  );
}

// Generate a crypto key and HMAC
const key = generateKey();
const computerMove = args[Math.floor(Math.random() * args.length)];
const hmac = computeHMAC(computerMove, key);

console.log(`HMAC: ${hmac}`);
console.log("Available moves:");
args.forEach((move, index) => {
  console.log(`${index + 1} - ${move}`);
});
console.log("0 - exit");
console.log("? - help");

// Function to handle user input
const handleUserInput = () => {
  rl.question("Enter your move: ", (input) => {
    if (input === "?") {
      displayHelp(args);
    } else if (input === "0") {
      console.log("Exiting...");
      rl.close();
      return;
    } else {
      const userIndex = parseInt(input, 10) - 1;

      if (isNaN(userIndex) || userIndex < 0 || userIndex >= args.length) {
        console.log("Invalid move. Please enter a valid number.");
      } else {
        const userMove = args[userIndex];
        const result = determineWinner(userMove, computerMove, args);
        console.log(`Your move: ${userMove}`);
        console.log(`Computer move: ${computerMove}`);
        console.log(result);
        console.log(`HMAC key: ${key.toString("hex").toUpperCase()}`);
      }
    }
    handleUserInput();
  });
};

handleUserInput();

// TEST PARAMETERS

//1- launch with 3 parameters example:
//node game.js rock paper scissors

//2- launch with 7 parameters example:
// node game.js rock paper scissors lizard spock water fire

//3- launch with incorrect parameters
// even number: node game.js rock paper scissors lizard
// repeated parameters: node game.js rock paper rock

//4- launch help table with 5 parameters example:
//node game.js rock paper scissors lizard spock ?
