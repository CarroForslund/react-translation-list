import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function Button(props){
  return (
    <button>{props.text}</button>
  );
}

function AddTranslationForm(props) {
  return (
    <>
      <h1>Add your translation in the form below</h1>
      <form onSubmit={props.save}>
        <div className="row">
          <label htmlFor="swedish-word">Swedish word</label>
          <input 
            name="swedish-word" 
            placeholder="Hej"
            value={props.swedish}
            onChange={props.setSwedish}
            required
          />
        </div>
        
        <div className="row">
          <label htmlFor="english-word">English word</label>
          <input 
            name="english-word" 
            placeholder="Hello"
            value={props.english}
            onChange={props.setEnglish}
            required
          />
        </div>

        <div className="row">
          <Button type="submit" text="Add translation" />
        </div>
        
      </form>
    </>
  );
}

function SearchForm(props){
  const searchInput = useRef();
  return (
    <div className="search">
      <div className="row">
        <label htmlFor="search">Search translation</label>
        <input 
          ref={searchInput}
          name="search" 
          type="text" 
          placeholder="Type here" 
          onChange={props.search}
          onMouseOver={() => searchInput.current.focus()}
          onMouseOut={() => searchInput.current.blur()}
        />
      </div>
    </div>
  );
}

function TranslationsList(props) {
  return(
    <>
    <h2>Translations</h2>
      <ul itemID="translation-list">
        {props.translations.map( (translation) => (
          <li key={translation.id} className="row" >
            <span>{translation.swedish} = {translation.english}</span> <button id={translation.id} onClick={props.delete}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

function DisplayTranslations(props){
  if(props.searchQuery !== ''){
    if(props.result.length >= 1){
      return (
        <>
          <SearchForm search={props.search} />
          <TranslationsList translations={props.result} delete={props.delete} />
        </>
      );
    } else {
      return (
        <>
          <SearchForm search={props.search} />
          <p>Sorry, no match. Try another search.</p>
        </>
      );
    }
  }
  if(props.list.length >= 1){
    return (
      <>
        <SearchForm search={props.search} />
        <TranslationsList translations={props.list} delete={props.delete}/>
      </>
    );
  }
  return null;
  
}

function App() {
  const [ translationID, setTranslationID ] = useState(0);
  const [ translations, setTranslations ] = useState([]);
  const [ swedishWord, setSwedishWord ] = useState('');
  const [ englishWord, setEnglishWord ] = useState('');
  let [ searchQuery, setSearchQuery ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
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
    setTranslationID(translationID + 1); //Why doesn't this one add up? Why do I need to add 1 again below?
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
