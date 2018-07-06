import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Grid, Image, Segment } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class BookForm extends React.Component {
  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages
    },
    covers: this.props.book.covers,
    index: 0,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: {
        goodreadsId: nextProps.book.goodreadsId,
        title: nextProps.book.title,
        authors: nextProps.book.authors,
        cover: nextProps.book.covers[0],
        pages: nextProps.book.pages
      },
      covers: nextProps.book.covers
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });

  onChangeNumber = e =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10)
      }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.title) {
      errors.title = 'Can not be blank';
    }
    if (!data.authors) {
      errors.authors = 'Can not be blank';
    }
    if (!data.pages) {
      errors.pages = 'Can not be blank';
    }
    return errors;
  };

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      data: {
        ...this.state.data,
        cover: covers[newIndex]
      }
    });
  };

  render() {
    const { errors, data, loading } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Book title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>
                <Form.Field error={!!errors.authors}>
                  <label htmlFor="authors">Book authors</label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    placeholder="Book authors"
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>
                <Form.Field error={!!errors.pages}>
                  <label htmlFor="pages">Number of pages</label>
                  <input
                    type="number"
                    id="pages"
                    name="pages"
                    placeholder="Number"
                    value={data.pages}
                    onChange={this.onChangeNumber}
                  />
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Image size="small" src={data.cover} />
                {this.state.covers.length > 1 && (
                  <a role="button" tabIndex={0} onClick={this.changeCover}>
                    Show another cover
                  </a>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Button primary>Save</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number.isRequired
  }).isRequired
};

export default BookForm;
