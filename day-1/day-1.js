const start = async () => {
  const text = await Deno.readTextFile("./input.txt");
  const textArray = text.split("\n");
  const elvesArray = [];

  // Build elvesArray
  let newElf = [];
  for (let item of textArray) {
    if (item !== "") {
      newElf.push(item);
    } else {
      elvesArray.push(newElf);
      newElf = [];
    }
  }

  // Add up each elf calories
  const totals = [];
  for (let elfArr of elvesArray) {
    const singularElfTotal = elfArr.reduce((acc, item) => {
      return Number(item) + acc;
    }, 0);
    totals.push(singularElfTotal);
  }

  // Find the max
  totals.sort((a, b) => b - a);

  // Get top 3 totals
  let megaTotal = 0;
  for (let i = 0; i < 3; i++) {
    megaTotal = megaTotal + totals[i];
  }
  console.log(megaTotal);
};

start();
