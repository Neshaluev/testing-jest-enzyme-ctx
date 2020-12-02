import React from "react";
import PropTypes from "prop-types";

import stringsModule from "../../helpers/helpers";
import languageContext from "../../contexts/languageContext";
import guessWordsContext from "../../contexts/guessWordsContext";

function GuessedWords() {
  const [guessedWords] = guessWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);
  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(language, "guessPrompt")}
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, idx) => (
      <tr key={idx} data-test="guessed-word">
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    contents = (
      <div data-test="guessed-words">
        <h3>{stringsModule.getStringByLanguage(language, "guessedWords")}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  "guessColumnHeader"
                )}
              </th>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  "matchingLettersColumnHeader"
                )}
              </th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    );
  }
  return <div data-test="component-guessed-words">{contents}</div>;
}

export default GuessedWords;