> _đây là demo về các step để sử dụng React một cách tối thiểu cho static web_
> Target: to have an **interactivity element** inside an **`existing page`**
> Solution: create an **React component**

================================================================
# Setup 'index.html'
```html
<!-- DOM container for React elements -->
<div id="like_button_container"></div>

<!-- Load React. -->
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

<!-- Load our React component -->
<script src="like_button.js"></script>
```

# Create "React Component"
```js - like_button.js
'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
```

# To reuse React Component

```js - index.html
<div class="like_button_container" data-commentid="1"></div>
<div class="like_button_container" data-commentid="2"></div>
```

```js - like_button.js
'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked comment number ' + this.props.commentID;
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.like_button_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const commentID = parseInt(domContainer.dataset.commentid, 10);
    const root = ReactDOM.createRoot(domContainer);
    root.render(
      e(LikeButton, { commentID: commentID })
    );
  });
```

# use React with JSX
* -> after adding **`babel script tag`**, we can **use JSX in any `script tag` by adding `type="text/babel" attribute`**
* -> _but makes our website slow and isn't suitable for production; so we will need a **JSX preprocessor**_

```js - index.html
// Babel script tag
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

// For using with Babel
<script src="like_button.js" type="text/babel"></script>
```

```js - like_button.js
// Change from (supported by browsers):
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);

// To (required Babel):
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

# using JSX preprocessor 
* -> `install JSX preprocessor`: **npm init -y** -> **npm install babel-cli@6 babel-preset-react-app@3**

* -> _move file `like_button.js` vào `src` folder_

* -> **npx babel --watch src --out-dir . --presets react-app/prod** - start an **`automated watcher for JSX`**
* -> watch **`files using JSX inside "src" folder`** and **create a preprocessed js file with the `plain JavaScript code` suitable for the browser**
