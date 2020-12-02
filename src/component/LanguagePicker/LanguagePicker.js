import React from "react";
import PropTypes from "prop-types";

function LanguagePicker({ setLanguage }) {
  const languages = [
    { code: "en", symbol: "🇺🇸" },
    { code: "emoji", symbol: "😊" },
  ];

  const languageIcons = languages.map((lang, idx) => (
    <span
      data-test="language-icon"
      key={lang.code}
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));
  return <div data-test="component-language-picker">{languageIcons}</div>;
}

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};
export default LanguagePicker;
