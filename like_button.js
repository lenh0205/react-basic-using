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

    return ReactElementRendered(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}


document.querySelectorAll('.like_button_container') // Find all DOM containers
  .forEach(domContainer => { // Reuse React components
    const commentID = parseInt(domContainer.dataset.commentid, 10); // read the data-* attribute

    const root = ReactDOM.createRoot(domContainer); // create React root
    root.render(ReactElementRendered(LikeButton, { commentID: commentID })); // render React Component inside root
  });