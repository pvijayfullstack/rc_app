import React from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';
import api from '../../api';

class SearchBookForm extends React.Component {
  state = {
    query: '',
    loading: false,
    options: [],
    books: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({
      loading: true
    });
    api.book
      .search(this.state.query)
      .then(res => res.data.books)
      .then(books => {
        const options = [];
        const booksHash = {};
        books.forEach(book => {
          booksHash[book.goodreadsId] = book;
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title
          });
        });
        this.setState({
          loading: false,
          options,
          books: booksHash
        });
      });
  };

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onBookSelect(this.state.books[data.value]);
  };

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          value={this.state.query}
          options={this.state.options}
          placeholder="Search book by title"
          onSearchChange={this.onSearchChange}
          onChange={this.onChange}
          loading={this.state.loading}
        />
      </Form>
    );
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired
};

export default SearchBookForm;
