import React, { useState, useEffect } from "react";
import "./App.css";
import TranslationInput from "./components/TranslationInput";
import TranslationList from "./components/TranslationList";
import axios from "axios";

function App() {
  const [translation, setTranslation] = useState({
    text: "",
    translationList: [],
  });

  const editText = (e) => {
    setTranslation({ ...translation, [e.target.name]: e.target.value });
    console.log(translation);
  };

  const submitText = (e) => {
    e.preventDefault();
    translate(translation.text).then((res) => {
      setTranslation({
        ...translation,
        translationList: [...translation.translationList, res],
      });
    });
  };

  const translate = (originalText) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: "https://yodish.p.rapidapi.com/yoda.json",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "x-rapidapi-host": "yodish.p.rapidapi.com",
          "x-rapidapi-key":
            "8c0a1f7a9amsh0c4222ff396f193p140534jsnef2e4b31fb66",
          useQueryString: true,
        },
        params: {
          text: originalText,
        },
        data: {},
      })
        .then((response) => {
          resolve(response.data.contents.translated);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  useEffect(() => {
    axios.get("http://quotes.rest/qod").then((res) =>
      translate(`${res.data.contents.quotes[0].quote}`).then(
        (translatedYoda) => {
          console.log(translatedYoda);
        }
      )
    );
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="jumbotron">
          <TranslationInput submitText={submitText} editText={editText} />
        </div>
      </div>
      <TranslationList>{translation.translationList}</TranslationList>
    </div>
  );
}

export default App;
