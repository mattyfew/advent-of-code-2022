const solution1 = async () => {
  const text = await Deno.readTextFile("./input.txt");
  const textArray = text.split("\n");

  // Build rochamboArray
  let rochamboArray = [];
  for (let item of textArray) {
    rochamboArray.push(item.split(" "));
  }
  rochamboArray = rochamboArray.filter(item => item.length === 2);

  // Get myTotalScore
  const MY_ROCK = "X";
  const MY_PAPER = "Y";
  const MY_SCISSOR = "Z";

  const OPP_ROCK = "A";
  const OPP_PAPER = "B";
  const OPP_SCISSOR = "C";

  const WIN = "win";
  const LOSE = "lose";
  const DRAW = "draw";

  const moveToScoreMap = {
    [MY_ROCK]: 1,
    [MY_PAPER]: 2,
    [MY_SCISSOR]: 3
  };
  const verdictToScoreMap = {
    [WIN]: 6,
    [DRAW]: 3,
    [LOSE]: 0
  };

  let myTotalScore = 0;
  let opponentTotalScore = 0;
  for (let item of rochamboArray) {
    const [opponentMove, myMove] = item;
    let verdict = null;

    // Draw
    if (
      (myMove === MY_ROCK && opponentMove === OPP_ROCK) ||
      (myMove === MY_PAPER && opponentMove === OPP_PAPER) ||
      (myMove === MY_SCISSOR && opponentMove === OPP_SCISSOR)
    ) {
      verdict = DRAW;
    }

    // Win
    if (
      (myMove === MY_ROCK && opponentMove === OPP_SCISSOR) ||
      (myMove === MY_PAPER && opponentMove === OPP_ROCK) ||
      (myMove === MY_SCISSOR && opponentMove === OPP_PAPER)
    ) {
      verdict = WIN;
    }

    // Lose
    if (
      (myMove === MY_ROCK && opponentMove === OPP_PAPER) ||
      (myMove === MY_PAPER && opponentMove === OPP_SCISSOR) ||
      (myMove === MY_SCISSOR && opponentMove === OPP_ROCK)
    ) {
      verdict = LOSE;
    }

    myTotalScore =
      myTotalScore + moveToScoreMap[myMove] + verdictToScoreMap[verdict];
  }

  console.log("Solution 1 - myTotalScore: ", myTotalScore);
};

solution1();

const solution2 = async () => {
  const text = await Deno.readTextFile("./input.txt");
  const textArray = text.split("\n");

  // Build rochamboArray
  let rochamboArray = [];
  for (let item of textArray) {
    rochamboArray.push(item.split(" "));
  }
  rochamboArray = rochamboArray.filter(item => item.length === 2);

  // Get myTotalScore
  const ROUND_LOSS = "X";
  const ROUND_DRAW = "Y";
  const ROUND_WIN = "Z";

  const MY_ROCK = "rock";
  const MY_PAPER = "paper";
  const MY_SCISSOR = "scissor";

  const OPP_ROCK = "A";
  const OPP_PAPER = "B";
  const OPP_SCISSOR = "C";

  const moveToScoreMap = {
    [MY_ROCK]: 1,
    [MY_PAPER]: 2,
    [MY_SCISSOR]: 3
  };
  const verdictToScoreMap = {
    [ROUND_WIN]: 6,
    [ROUND_DRAW]: 3,
    [ROUND_LOSS]: 0
  };

  let myTotalScore = 0;
  for (let item of rochamboArray) {
    const [opponentMove, roundVerdict] = item;
    let myMove = null;

    // Scissor
    if (
      (opponentMove === OPP_ROCK && roundVerdict === ROUND_LOSS) ||
      (opponentMove === OPP_SCISSOR && roundVerdict === ROUND_DRAW) ||
      (opponentMove === OPP_PAPER && roundVerdict === ROUND_WIN)
    ) {
      myMove = MY_SCISSOR;
    }

    // Rock
    if (
      (opponentMove === OPP_PAPER && roundVerdict === ROUND_LOSS) ||
      (opponentMove === OPP_ROCK && roundVerdict === ROUND_DRAW) ||
      (opponentMove === OPP_SCISSOR && roundVerdict === ROUND_WIN)
    ) {
      myMove = MY_ROCK;
    }

    // Paper
    if (
      (opponentMove === OPP_SCISSOR && roundVerdict === ROUND_LOSS) ||
      (opponentMove === OPP_PAPER && roundVerdict === ROUND_DRAW) ||
      (opponentMove === OPP_ROCK && roundVerdict === ROUND_WIN)
    ) {
      myMove = MY_PAPER;
    }

    myTotalScore =
      myTotalScore + moveToScoreMap[myMove] + verdictToScoreMap[roundVerdict];
  }
  console.log("Solution 2 - myTotalScore: ", myTotalScore);
};

solution2();
