import React from 'react';
import { fetchFromAPI, fetchSuggestionsFromAPI } from '../../util/search_util';
import { withRouter } from 'react-router-dom'
import Suggestions from './suggestions'

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchResults: [],
            isLoading: true,
            inputText: '',
            clicked: false,
            showResults: true
        }
    }

    // On submit (either click or button) if input text exists, invoke in searchOnSubmit
    handleSubmit = (e) => {
        if (this.state.inputText && this.state.inputText.length > 0){
            e.preventDefault();
            this.searchOnSubmit(this.state.inputText); 
        }
    }

    // Fetch tickers from api - set state, push history with response to load ticker page, then reset input to empty string
    searchOnSubmit = (query) => {
        if (query !== undefined){
            fetchFromAPI(query)
            .then(response =>{
                this.setState({
                    isLoading: false,
                    searchResults: []
                })  
            }).then(() => this.props.history.push(`/${this.state.inputText}`))
            .then(() => this.setState({inputText: ''}))
        }
    }
    
    // Update values on key stroke and invokes getSuggestions if something is typed
    handleInputChange = () => {
        this.setState({ inputText: event.target.value }, () => {
            if (this.state.inputText && this.state.inputText.length > 0) {
                this.getSuggestions()
            } else if (this.state.inputText.length === 0){
                this.setState({ searchResults: [] })
            }
        })
    }

    // Fetch all ticker symbols that match the inputText
    getSuggestions = () => {
        fetchSuggestionsFromAPI(this.state.inputText).then(response => this.setState({searchResults: response}))
    }

    render(){
        length = this.state.searchResults.length
        if(this.state.showResults && (!this.isLoading || this.state.searchResults.length <= 6)){
            return (
                <>
                <form className={`search-form ${`${this.state.clicked ? 'form-clicked': ''}`}`} onSubmit={this.handleSubmit} onClick={this.handleSubmit} ref={node => this.node = node} >
                    <div className="s-box">
                        <input 
                    
                        className={`s search-with-results ${`${this.state.clicked ? 'input-clicked': ''}`}`}
                        autoComplete="off"
                        type="search" 
                        onChange={this.handleInputChange}
                        value={this.state.inputText}
                    
                        />
                        <button className="search-button">Search</button>
                    </div>
                    <Suggestions results={this.state.searchResults.slice(0,5)} inputText={this.state.inputText} clicked={this.state.clicked}/>
                </form>
                </>
            )
        } else if((!this.isLoading || this.state.searchResults.length <= 6) && this.state.showResults === false){
                return (
                    <>
                    <form className={`search-form ${`${this.state.clicked ? 'form-clicked': ''}`}`} onSubmit={this.handleSubmit} ref={node => this.node = node} >
                        <div className="s-box">
                            <input 
                            className={`s search ${`${this.state.clicked ? 'input-clicked': ''}`}`}
                            autoComplete="off"
                            type="search" 
                            onChange={this.handleInputChange}
                            value={this.state.inputText}
        
                            />
                            <button className="search-button">Search</button>
                        </div>
                        <ul className={`search-results ${`${this.state.clicked ? 'sr': ''}`}`}></ul>
                    </form>
                    </>
                )
        } else {
            return ""
        }
    }
}

export default withRouter(Search);