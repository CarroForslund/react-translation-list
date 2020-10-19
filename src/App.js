import React, { useState, useEffect } from 'react';
import AddTranslationForm from './components/translationform';
import DisplayTranslations from './components/displaytranslations';
import './App.css';

function App() {
  const [ translationID, setTranslationID ] = useState(0);
  const [ translations, setTranslations ] = useState([]);
  const [ swedishWord, setSwedishWord ] = useState('');
  const [ englishWord, setEnglishWord ] = useState('');
  let [ searchQuery, setSearchQuery ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const handleSearchChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    let swedish, english;
    const results = translations.filter(translation => {
      swedish = translation.swedish.toLowerCase();
      english = translation.english.toLowerCase();
      return swedish.includes(searchQuery) || english.includes(searchQuery);
    });
    setSearchResults(results);
  }, [translations, searchQuery]);

  function updateSwedishWord(e){
    setSwedishWord(e.target.value);
  }

  function updateEnglishWord(e){
    setEnglishWord(e.target.value);
  }

  function saveTranslation(e){
    e.preventDefault();
    setTranslationID(translationID + 1);
    const newTranslation = [{
      id: translationID + 1,
      swedish: swedishWord,
      english: englishWord
    }];
    setTranslations(translations.concat(newTranslation));
    setSwedishWord('');
    setEnglishWord('');
  }

  function deleteTranslation(e){
    const id = e.target.getAttribute("id");
    setTranslations(translations.filter(translation => translation.id !== parseInt(id)));
  }

  return (
    <div className="wrapper">

      <AddTranslationForm 
        swedish={swedishWord} 
        setSwedish={updateSwedishWord}
        english={englishWord}
        setEnglish={updateEnglishWord}
        save={saveTranslation}
      />
      
      <DisplayTranslations search={handleSearchChange} list={translations} result={searchResults} delete={deleteTranslation} searchQuery={searchQuery} />

    </div>
  );
}

export default App;
