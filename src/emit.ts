import { Statement, Node, Expression, VariableDeclaration } from './types';

const singleQuoteRegex = /[\\\'\t\v\f\b\r\n]/g;
const doubleQuoteRegex = /[\\\"\t\v\f\b\r\n]/g;

const escapedCharsMap = new Map(
  Object.entries({
    '\t': '\\t',
    '\v': '\\v',
    '\f': '\\f',
    '\b': '\\b',
    '\r': '\\r',
    '\n': '\\n',
    '\\': '\\\\',
    '"': '\\"',
    "'": "\\'",
  }),
);

export function emit(statements: Statement[]) {
  return statements
    .map((statement) => `${emitStatement(statement)};\n`)
    .join('');
}

function emitStatement(statement: Statement): string {
  switch (statement.kind) {
    case Node.ExpressionStatement:
      return emitExpression(statement.expr);
    case Node.VariableStatement:
      return `var ${statement.declarationList.declarations
        .map(emitVar)
        .join(',')}`;
    case Node.TypeAlias:
      return `type ${statement.name.text} = ${statement.typename.text}`;
    case Node.EmptyStatement:
      return '';
  }
}

function emitExpression(expression: Expression): string {
  switch (expression.kind) {
    case Node.Identifier:
      return expression.text;
    case Node.NumericLiteral:
      return '' + expression.value;
    case Node.StringLiteral:
      return expression.isSingleQuote
        ? `'${escapeString(expression.value, true)}'`
        : `"${escapeString(expression.value, false)}"`;
    case Node.Assignment:
      return `${expression.name.text} = ${emitExpression(expression.value)}`;
  }
}

function emitVar(declaration: VariableDeclaration) {
  const typestring = declaration.typename ? ': ' + declaration.name : '';
  return `${declaration.name.text}${typestring} = ${emitExpression(
    declaration.init,
  )}`;
}

function escapeString(string: string, isSingleQuote: boolean) {
  return string.replace(
    isSingleQuote ? singleQuoteRegex : doubleQuoteRegex,
    replacement,
  );
}

function replacement(char: string) {
  return escapedCharsMap.get(char) || char;
}
