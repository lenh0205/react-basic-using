'use strict';

const ReactElementRendered = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked comment number ' + this.props.commentID;
    }

    return (
        <button onClick={() => this.setState({ liked: true })}>
          Like
        </button>
    );
  }
}


document.querySelectorAll('.like_button_container') // Find all DOM containers
  .forEach(domContainer => { // Reuse React components
    const commentID = parseInt(domContainer.dataset.commentid, 10); // read the data-* attribute

    ReactDOM.render(<LikeButton commentID={commentID} />, domContainer);
  });