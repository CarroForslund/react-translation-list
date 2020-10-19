import React from 'react';
import Button from './button';

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

  export default AddTranslationForm;