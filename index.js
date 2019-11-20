const getLogStatement = (t, template, componentName) => {
  const buildLogStatement = template(`console.log(">> RenderLog >>", COMP_NAME);`);
  const logStatement = buildLogStatement({
    COMP_NAME: t.stringLiteral(String(componentName))
  });
  return logStatement;
};

const isReactComponent = (path) => {
  let isReactComp = false;
  let returnsJSX = false;
  let isTopLevelFunction = false;

  path.traverse({
    ReturnStatement(rsPath) {
      returnsJSX = rsPath.node.argument.type === 'JSXElement';
      if (returnsJSX) {
        if (['ArrowFunctionExpression', 'FunctionExpression'].includes(path.node.type)) {
          isTopLevelFunction = path.parentPath.parentPath.parentPath.node.type === 'Program';
          if (isTopLevelFunction) isReactComp = true;
        } else if (['FunctionDeclaration'].includes(path.node.type)) {
          isTopLevelFunction = path.parentPath.node.type === 'Program';
          if (isTopLevelFunction) isReactComp = true;
        } else if (['ClassMethod'].includes(path.node.type)) {
          isReactComp = true;
        }
      }
    }
  });

  return isReactComp;
};

function babelPluginReactRenderLogger(babel) {
  const { types: t, template } = babel;

  return {
    name: 'log-render',
    visitor: {
      ArrowFunctionExpression(fPath) {
        let isReactComp = false;

        if (fPath.node.body.type === 'BlockStatement') {
          isReactComp = isReactComponent(fPath);
        } else if (fPath.node.body.type === 'JSXElement') {
          const jsxWithReturnSt = t.returnStatement(fPath.get('body').node);
          fPath.get('body').replaceWith(t.blockStatement([jsxWithReturnSt]));
          isReactComp = isReactComponent(fPath);
        }

        if (isReactComp) {
          const componentName = fPath.parentPath.node.id.name;
          const logSt = getLogStatement(t, template, componentName);
          fPath.get('body').unshiftContainer('body', logSt);
        }
      },
      FunctionDeclaration(fPath) {
        const isReactComp = isReactComponent(fPath);

        if (isReactComp) {
          const componentName = fPath.node.id.name;
          const logSt = getLogStatement(t, template, componentName);
          fPath.get('body').unshiftContainer('body', logSt);
        }
      },
      FunctionExpression(fPath) {
        const isReactComp = isReactComponent(fPath);

        if (isReactComp) {
          const componentName = fPath.parentPath.node.id.name;
          const logSt = getLogStatement(t, template, componentName);
          fPath.get('body').unshiftContainer('body', logSt);
        }
      },
      ClassDeclaration(cPath) {
        // const isReactComp = isReactComponent(cPath);

        cPath.traverse({
          ClassMethod(cmPath) {
            const isReactComp = isReactComponent(cmPath);

            if (isReactComp) {
              const componentName = cPath.node.id.name;
              if (cmPath.node.key.name === 'render') {
                const logSt = getLogStatement(t, template, componentName);
                cmPath.get('body').unshiftContainer('body', logSt);
              }
            }
          }
        });
      }
    }
  };
}

module.exports = babelPluginReactRenderLogger;
