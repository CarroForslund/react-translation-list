import React from 'react';
import TranslationsList from './translationlist';
import SearchForm from './searchform';

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

export default DisplayTranslations;