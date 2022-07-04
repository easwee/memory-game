export function uniqNumberSet(amount, max) {
  const set = new Set();

  while (set.size !== amount) {
    set.add(Math.floor(Math.random() * max));
  }

  return [...set];
}

export function shuffle(array) {
  let count = array.length,
    randomnumber,
    temp;

  while (count) {
    randomnumber = (Math.random() * count--) | 0;
    temp = array[count];
    array[count] = array[randomnumber];
    array[randomnumber] = temp;
  }

  return array;
}

export function isCommandsSequenceEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (!b[i] || a[i].text !== b[i].text) {
      return false;
    }
  }

  return true;
}
