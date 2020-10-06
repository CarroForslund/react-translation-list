import React, { useState, useEffect } from 'react';
import './App.css';

function Button(props){
  return (
    <button>{props.text}</button>
  );
}

// function AddTranslationForm(props){

//   return (
//     <div className="add-area">
//       <h1>Add your translation in the form below</h1>
//       <form>
//         <label htmlFor="swedish-word">Swedish word</label>
//         <input name="swedish-word" type="text" placeholder="Häst"></input>
//         <label htmlFor="english-word">English word</label>
//         <input name="english-word" type="text" placeholder="Horse"></input>
//         <Button text="Add translation" />
//       </form>
//     </div>
//   );
// }

// function SearchForm(props){
//   return (
//     <div className="searchArea">
//       <label htmlFor="search">Search for translations</label>
//       <input name="search" type="text" placeholder="Type here"></input>
//       <Button text="Search" />
//     </div>
//   );
// }

// function SearchResult(props){
//   return (
//     <div className="listArea">
//       <p>Search result will display here</p>
//     </div>
//   );
// }

function Translations(props) {
  return(
    <div itemID="translation-list">
      {props.list.map( (translation) => (
        <li key={translation.id}><span>{translation.swedish}</span> = <span>{translation.english}</span> <span className="delete" onClick={props.delete}>X</span></li>
      ))}
    </div>
  );
}

function App() {
  const [ translationID, setTranslationID ] = useState(0);
  const [ translations, setTranslations ] = useState([]);
  const [ swedishWord, setSwedishWord ] = useState('');
  const [ englishWord, setEnglishWord ] = useState('');

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
      id: translationID +1,
      swedish: swedishWord,
      english: englishWord
    }];

    setTranslations(translations.concat(newTranslation));
  }

  function deleteTranslation(e){
    e.preventDefault();
    console.log(e);
    //translations.splice(e.id, 1);
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
      
      {/* <SearchForm /> */}
      <div className="searchArea">
        <label htmlFor="search">Search for translations</label>
        <input name="search" type="text" placeholder="Type here"></input>
        <Button text="Search" />
      </div>

      <Translations list={translations} delete={deleteTranslation} />

      {/* <SearchResult /> */}

    </div>
  );
}

export default App;
