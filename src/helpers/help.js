export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetterSet = secretWord.split("");
  const guessedLetterSet = new Set(guessedWord);
  return secretLetterSet.filter((letter) => guessedLetterSet.has(letter))
    .length;
}
