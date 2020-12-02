const languageStrings = {
  en: {
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    numberColumnHeader: "#",
    totalGuesses: "Total Guesses",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching Letters",
    newWord: "New Word",
    giveUp: "Give Up",
    secretWordWas: "The secret word was",
    betterLuck: "Better luck next time!",
    enterSecretWord: "Enter your own secret word",
    serverError:
      "There was an error retrieving the secret word. Please try again later.",
  },
  emoji: {
    congrats: "🎯🎉",
    submit: "🚀",
    guessPrompt: "🤔🤫🔤",
    guessInputPlaceholder: "⌨️🤔",
    guessedWords: "🤷‍🔤",
    guessColumnHeader: "🤷‍",
    numberColumnHeader: "🔢",
    totalGuesses: "🔢🤷‍♀️",
    matchingLettersColumnHeader: "✅",
    newWord: "✨🔤",
    giveUp: "😩",
    secretWordWas: "🤫🔤",
    betterLuck: "🍀✨🔤",
    enterSecretWord: "👩‍💻🤫🔤",
    serverError: "🚨. ⏲.",
  },
};

function getStringByLanguage(
  languageCode,
  stringKey,
  strings = languageStrings
) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could code get string [${stringKey}] for [${languageCode}]`);
    return strings.en[stringKey];
  }
  return strings[languageCode][stringKey];
}

export default {
  getStringByLanguage,
};
