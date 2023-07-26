import { Component } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import PropTypes from 'prop-types';
export class Button extends Component {
  scrollToTop = () => {
    scroll.scrollToBottom();
  };
  render() {
    return (
      <div onClick={this.scrollToTop}>
        <Link to="loadMore" />
        <button
          type="button"
          id="loadMore"
          className="Button"
          onClick={this.props.handleChangePage}
        >
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
};
