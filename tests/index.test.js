import { transformSync } from '@babel/core';
import reactRenderLogger from '../index';

const defaultTestConfig = {
  plugins: ['@babel/plugin-transform-react-jsx', reactRenderLogger]
};

describe('Add log statement to React Components', () => {
  test('ArrowFunctionExpression with BlockStatement', () => {
    const codeLiteral = `
      const HelloWorld = () => {
        return <span>Hello World</span>;
      };
    `;
    const { code } = transformSync(codeLiteral, defaultTestConfig);
    expect(code).toMatchSnapshot();
  });

  // THIS DOESN'T WORK YET
  test('ArrowFunctionExpression with implicit return', () => {
    const codeLiteral = `
      const HelloWorld = (props) => <span>Hello World</span>;
    `;
    const { code } = transformSync(codeLiteral, defaultTestConfig);

    expect(code).toMatchSnapshot();
  });

  test('FunctionDelaration with BlockStatement', () => {
    const codeLiteral = `
      function HelloWorld() {
        return <span>Hello World</span>;
      }
    `;
    const { code } = transformSync(codeLiteral, defaultTestConfig);

    expect(code).toMatchSnapshot();
  });

  test('FunctionExpression with BlockStatement', () => {
    const codeLiteral = `
      const HelloWorld = function() {
        return <span>Hello World</span>;
      }
    `;
    const { code } = transformSync(codeLiteral, defaultTestConfig);

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
    const { code } = transformSync(codeLiteral, defaultTestConfig);

    expect(code).toMatchSnapshot();
  });
});
