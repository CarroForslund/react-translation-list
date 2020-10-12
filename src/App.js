import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function Button(props){
  return (
    <button>{props.text}</button>
  );
}

function SearchForm(props){
  return (
    <div className="searchArea">
      <label htmlFor="search">Search for translations</label>
      <input name="search" type="text" placeholder="Type here" onChange={props.search}></input>
    </div>
  );
}

// function Translations(props) {
//   return(
//     <div itemID="translation-list">
//       {props.list.map( (translation) => (
        
//       <li key={translation.id}><span>{translation.id} {translation.swedish}</span> = <span>{translation.english}</span> <span id={translation.id} className="delete" onClick={props.delete}>X</span></li>
//       ))}
//     </div>
//   );
// }

function DisplayTranslations(props){
  const liRef = useRef(null);
  if(props.searchFor !== ''){
    if(props.result !== []){
      return (
        <div itemID="translation-list">
          <p>Display search results here:</p>
        </div>
      );
    } else {
      return (
        <p>No match...</p>
      );
    }
  }
  return (
    <div itemID="translation-list">
      {props.list.map( (translation) => (
        <li
          key={translation.id} 
          ref={liRef}
          // onMouseOver={ () => { console.log('mouse over', liRef.current) } }
          // onMouseOut={ () => { console.log('mouse out', liRef.current) } }
        >
          <span>{translation.swedish}</span> = 
          <span>{translation.english}</span> 
          <span id={translation.id} className="delete" onClick={props.delete}>X</span>
        </li>
      ))}
    </div>
  );
}

function App() {
  const [ translationID, setTranslationID ] = useState(0);
  const [ translations, setTranslations ] = useState([]);
  const [ swedishWord, setSwedishWord ] = useState('');
  const [ englishWord, setEnglishWord ] = useState('');
  let [ searchFor, setSearchFor ] = useState('');
  const [ searchResult, setSearchResult ] = useState([]);

  useEffect(() => {
    let swedish, english;
    const results = translations.filter(translation => {
      swedish = translation.swedish.toLowerCase();
      english = translation.english.toLowerCase();
      swedish.includes(searchFor) || english.includes(searchFor);
    });
    setSearchResult(results);
  }, [translations, searchFor]);

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
    setTranslations(translations.filter(translation => translation.id !== parseInt(id))); // TODO: Remove warnings!
  }

  function doSearch(e){
    if (e.target.value.length >= 1) {
      setSearchFor(searchFor = e.target.value.toLowerCase());
    } else {
      setSearchFor(searchFor =  '');
    }
  }

  return (
    <div className="wrapper">

      {/* <AddTranslationForm /> */}
      <div className="add-area">
        <h1>Add your translation in the form below</h1>
        <form onSubmit={saveTranslation}>
          <label htmlFor="swedish-word">Swedish word</label>
          <input 
            name="swedish-word" 
            placeholder="Häst"
            value={swedishWord}
            onChange={updateSwedishWord}
          />

          <label htmlFor="english-word">English word</label>
          <input 
            name="english-word" 
            placeholder="Horse"
            value={englishWord}
            onChange={updateEnglishWord}
          />
          <Button type="submit" text="Add translation" />
        </form>
      </div>
      
      <SearchForm search={doSearch} />
      <DisplayTranslations list={translations} result={searchResult} delete={deleteTranslation} searchFor={searchFor} />

    </div>
  );
}

export default App;
