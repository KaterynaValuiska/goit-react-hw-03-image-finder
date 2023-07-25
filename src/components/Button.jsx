import { Component } from 'react';

export class Button extends Component {
  state = {
    currentPage: 1,
  };
  handleChangePage = () => {
    this.setState(prevState => ({ currentPage: (prevState.currentPage += 1) }));
    this.props.currentPage(this.state.currentPage);
  };
  render() {
    return (
      <button type="button" className="Button" onClick={this.handleChangePage}>
        Load more
      </button>
    );
  }
}
