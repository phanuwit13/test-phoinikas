const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getRandomNumbers = () => {
  let numbers = [];
  while (numbers.length < 4) {
    let randomNumber = Math.floor(Math.random() * 10);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

const countEqualNumbers = (random, input) => {
  let amount = 0;
  random.forEach((rm) => {
    const check = input.findIndex((i) => i === rm);
    if (check !== -1) {
      amount++;
    }
  });
  return amount;
};

const countEqualNumbersAtIndex = (random, input) => {
  let count = 0;
  random.forEach((rm, i) => {
    if (rm === input[i]) {
      count++;
    }
  });
  return count;
};
const keyInput = () => {
  return new Promise((resolve) => {
    readline.question("Enter 4 numbers (ex : 1234) ", (name) => {
      resolve(name.split("").map((i) => Number(i)));
    });
  });
};

const getInput = async () => {
  const input = await keyInput();
  const countNumberCorrect = countEqualNumbers(randomNumber, input);
  const countIndexCorrect = countEqualNumbersAtIndex(randomNumber, input);
  if (countNumberCorrect !== 4 || countIndexCorrect !== 4) {
    console.log("Amount Number Correct is ", countNumberCorrect);
    console.log("Amount Position Correct is ", countIndexCorrect);
    return getInput();
  }
  readline.close();
  console.log("randomNumber", randomNumber);
  console.log("input", input);
};

const randomNumber = getRandomNumbers();
console.log("Answers", randomNumber); //show Answers uncomment this line
getInput();
