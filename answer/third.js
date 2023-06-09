function generateNumberPermutate(input) {
  const result = [];

  const permutate = (arr, current) => {
    if (arr.length === 0) {
      result.push(current);
    } else {
      arr.forEach((num, index) => {
        const remaining = arr.filter((_, i) => i !== index);
        permutate(remaining, [...current, num]);
      });
    }
  };

  permutate(input, []);

  return result;
}

const array = [1, 2, 3];
const arrangements = generateNumberPermutate(array);
console.log(arrangements);
