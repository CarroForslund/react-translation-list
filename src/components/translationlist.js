import React from 'react';

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

export default TranslationsList;