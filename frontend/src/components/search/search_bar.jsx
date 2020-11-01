import React from 'react';
import HeaderModal from '../modal/header_modal';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      showModal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchUsers(this.state.searchText);
  }

  update(prop) {
    return (e) => {
      e.preventDefault();
      // console.log(e.target.value);
      this.setState({[prop]: e.target.value},
        () => {
          if ( this.state.searchText.trim() !== "" ) {
            this.props.searchUsers(this.state.searchText);
          } else {
            this.props.removeSearchUsers();
          }
        }
      );
    }
  }

  handleOnFocus(e) {
    e.preventDefault();
    this.props.openModal( "search", {} );
  }


  render () {
    return (
      <div className="search-bar">
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            onChange={ this.update( "searchText" )}
            onFocus={ this.handleOnFocus }
            placeholder="Search"
            value={ this.state.searchText } />
          <button type="submit"> <i className="fas fa-search"></i></button>
        </form>
        <HeaderModal modalType={"search"} className="search-result-item"/>
      </div>
    );
  }
}

export default SearchBar;
