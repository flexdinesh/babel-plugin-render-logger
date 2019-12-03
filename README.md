# babel-plugin-render-logger

Babel plugin that automatically adds a console statement to React components and makes debugging easier.

## Install

_NOTE: This package is not published to npm yet_

```sh
yarn add --dev babel-plugin-render-logger
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
      "plugins": ["render-logger"]
    }
  }
}
```

### Config

#### name

All components will log by default. You can pass in the component name as a string or regex and only components that match the name will be logged.

Log all components matching the name "Hello"

```json
{
  "plugins": [
    ["render-logger", {
      "name": "Hello"
    }]
  ]
}
```

Log all components matching the name "Hello" or "Welcome"

```json
{
  "plugins": [
    ["render-logger", {
      "name": "Hello|Welcome"
    }]
  ]
}
```

#### disableConsoleStyles

Disable the styles in console statements. To differentiate the log noise, the console statements are colored by default.

```json
{
  "plugins": [
    ["render-logger", {
      "name": "Hello|Welcome",
      "disableConsoleStyles": true
    }]
  ]
}
```

#### consoleMethod

Default console method is `info` (`console.info()`). You can choose to use a different method. Accepts `warn`, `error`, `trace`, `info` and `log`;

```json
{
  "plugins": [
    ["render-logger", {
      "name": "Hello|Welcome",
      "disableConsoleStyles": true,
      "consoleMethod": "warn"
    }]
  ]
}
```

## License

MIT © Dinesh Pandiyan
