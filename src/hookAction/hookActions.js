import axios from "axios";

export const getSecretWord = async (setSecretWord) => {
  let data = "party";
  try {
    let response = await axios.get("http://localhost:3030");
    setSecretWord(data);
  } catch (error) {
    setSecretWord(data);
  }
};

export default {
  getSecretWord,
};
