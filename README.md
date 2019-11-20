# babel-plugin-react-render-logger

Babel plugin that automatically adds a console statement to React components and makes debugging easier.

## Install

_NOTE: This package is not published to npm yet_

```sh
yarn add --dev babel-plugin-react-render-logger
```

## Example

Transforms

```jsx
const HelloWorld = () => {
  return <span>Hello World</span>;
};

class HelloWorld extends React.Component {
  render() {
    return <span>Hello World</span>;
  }
}
```

to

```jsx
const HelloWorld = () => {
  console.log('>> RenderLog >>', 'HelloWorld');
  return <span>Hello World</span>;
};

class HelloWorld extends React.Component {
  render() {
    console.log('>> RenderLog >>', 'HelloWorld');
    return <span>Hello World</span>;
  }
}
```

## Usage

`.babelrc`

Use the logger only in `development`.

```json
{
  "presets": ["react-app"],
  "env": {
    "development": {
      "plugins": ["react-render-logger"]
    }
  }
}
```

## License

MIT © Dinesh Pandiyan
