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
        <label htmlFor="swedish-word">Swedish word</label>
        <input 
          name="swedish-word" 
          placeholder="Hej"
          value={props.swedish}
          onChange={props.setSwedish}
        />

        <label htmlFor="english-word">English word</label>
        <input 
          name="english-word" 
          placeholder="Hello"
          value={props.english}
          onChange={props.setEnglish}
        />
        <Button type="submit" text="Add translation" />
      </form>
    </>
  );
}

function SearchForm(props){
  const searchInput = useRef();
  return (
    <div className="searchArea">
      <label htmlFor="search">Search for translations</label>
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
  );
}

function TranslationsList(props) {
  const liRef = useRef(null);

  return(
    <ul itemID="translation-list">
      {props.translations.map( (translation) => (
        <li 
          key={translation.id}
          ref={liRef}
          // onMouseOver={ () => { console.log('mouse over', liRef.current) } }
          // onMouseOut={ () => { console.log('mouse out', liRef.current) } }
        >
          <span>{translation.swedish}</span> = <span>{translation.english}</span> <button id={translation.id} onClick={props.delete}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

function DisplayTranslations(props){
  if(props.searchQuery !== ''){
    if(props.result.length >= 1){
      return (
        <TranslationsList translations={props.result} delete={props.delete} />
      );
    } else {
      return (
        <p>Sorry, no match. Try another search.</p>
      );
    }
  }
  return (
    <TranslationsList translations={props.list} delete={props.delete}/>
  );
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
      
      <SearchForm search={handleSearchChange} />
      
      <DisplayTranslations list={translations} result={searchResults} delete={deleteTranslation} searchQuery={searchQuery} />

    </div>
  );
}

export default App;
