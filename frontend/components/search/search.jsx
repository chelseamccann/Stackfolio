import React from 'react';
import { fetchFromAPI, fetchAllFromAPI } from '../../util/search_util';
import { withRouter } from 'react-router-dom'
import Suggestions from './suggestions'

class Search extends React.Component{
    constructor(props){
        super(props)
        this._isMounted = false;
        this.state = {
            searchResults: [],
            isLoading: true,
            inputText: '',
            clicked: false,
            showResults: true
        }
        this.onSearchChange = this.onSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchOnSubmit = this.searchOnSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() { this._isMounted = true }
    componentWillUnmount() { this._isMounted = false }

    onSearchChange(e){
        this.setState({
            inputText: e.target.value
        });
    }

    handleSubmit(e){
        if (this.state.inputText && this.state.inputText.length > 0){
            e.preventDefault();
            this.searchOnSubmit(this.state.inputText); 
        }
    }

    searchOnSubmit(query){
        if (query !== undefined){
            fetchFromAPI(query)
            .then(response => {
                if (this._isMounted){
                this.setState({
                    isLoading: false,
                    searchResults: []
                })  
            }
            }).then(() => this.props.history.push(`/${this.state.inputText}`))
            .then(() => this.setState({inputText: ''}))
        }
    }


    getInfo(){
        fetchAllFromAPI(this.state.inputText).then(response => {
            this.setState({
                searchResults: response
            })
          })
      }
    
    handleInputChange(){
        this.setState({ inputText: event.target.value }, () => {
            if (this.state.inputText && this.state.inputText.length > 0) {
                this.getInfo()
            } else if (this.state.inputText.length === 0){
                this.setState({ searchResults: [] })
            }
        })
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