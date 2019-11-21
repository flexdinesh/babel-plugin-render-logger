import { transformSync } from '@babel/core';
import reactRenderLogger from '../src/index';

const getTestConfig = (opts = {}) => ({
  plugins: ['@babel/plugin-transform-react-jsx', [reactRenderLogger, { disableConsoleStyles: true, ...opts }]]
});

describe('Add log statement to React Components', () => {
  test('ArrowFunctionExpression with BlockStatement', () => {
    const codeLiteral = `
      const HelloWorld = () => {
        return <span>Hello World</span>;
      };
    `;
    const { code } = transformSync(codeLiteral, getTestConfig());
    expect(code).toMatchSnapshot();
  });

  test('ArrowFunctionExpression with implicit return', () => {
    const codeLiteral = `
      const HelloWorld = (props) => <span>Hello World</span>;
    `;
    const { code } = transformSync(codeLiteral, getTestConfig());

    expect(code).toMatchSnapshot();
  });

  test('FunctionDelaration with BlockStatement', () => {
    const codeLiteral = `
      function HelloWorld() {
        return <span>Hello World</span>;
      }
    `;
    const { code } = transformSync(codeLiteral, getTestConfig());

    expect(code).toMatchSnapshot();
  });

  test('FunctionExpression with BlockStatement', () => {
    const codeLiteral = `
      const HelloWorld = function() {
        return <span>Hello World</span>;
      }
    `;
    const { code } = transformSync(codeLiteral, getTestConfig());

    expect(code).toMatchSnapshot();
  });

  test('Class Component with render method', () => {
    const codeLiteral = `
      class HelloWorld extends React.Component {
        render() {
          return <span>Hello World</span>
        }
      }
    `;
    const { code } = transformSync(codeLiteral, getTestConfig());

    expect(code).toMatchSnapshot();
  });
});

describe('Add log statement based on config', () => {
  test('name matches full component name - should include logger', () => {
    const codeLiteral = `
      const HelloWorld = () => {
        return <span>Hello World</span>;
      };
    `;
    const opts = { name: 'HelloWorld' };
    const { code } = transformSync(codeLiteral, getTestConfig(opts));
    expect(code).toMatchSnapshot();
  });

  test('name matches part component name - should include logger', () => {
    const codeLiteral = `
      const HelloWorld = () => {
        return <span>Hello World</span>;
      };
    `;
    const opts = { name: 'Hello' };
    const { code } = transformSync(codeLiteral, getTestConfig(opts));
    expect(code).toMatchSnapshot();
  });

  test("name doesn't match component name - should not include logger", () => {
    const codeLiteral = `
      const HelloWorld = () => {
        return <span>Hello World</span>;
      };
    `;
    const opts = { name: 'Oohlaalaa' };
    const { code } = transformSync(codeLiteral, getTestConfig(opts));
    expect(code).toMatchSnapshot();
  });

  test('name matches multiple strings - should include logger', () => {
    const codeLiteral = `
      const HelloWorld = () => {
        return <span>Hello World</span>;
      };
    `;
    const opts = { name: 'Hello|Kitty' };
    const { code } = transformSync(codeLiteral, getTestConfig(opts));
    expect(code).toMatchSnapshot();
  });

  test('name is not passed - should include logger', () => {
    const codeLiteral = `
      const HelloWorld = () => {
        return <span>Hello World</span>;
      };
    `;
    const { code } = transformSync(codeLiteral, getTestConfig());
    expect(code).toMatchSnapshot();
  });
});
