# Object Types

Looking at the tokens, the missing tokens are the open and close brace.

## Source code

```ts
type A = string;
type B = number;
type C = {
  a: string;
  b: number;
};

type D = {
  a: string;
  b: number;
  c: A;
  d: B;
  e: C;
};
```

## Tokens

For this source code:

```ts
type A = string;
```

It generates these tokens

```ts
[
  {
    token: Token.Type;
    text: type;
  },
  {
    token: Token.Identifier;
    text: A;
  },
  {
    token: Token.Equals;
  },
  {
    token: Token.Identifier;
    text: string;
  },
  {
    token: Token.Semicolon;
  }
]
```

For this source code:

```ts
type B = number;
```

It generates these tokens

```ts
[
  {
    token: Token.Type;
    text: type;
  },
  {
    token: Token.Identifier;
    text: B;
  },
  {
    token: Token.Equals;
  },
  {
    token: Token.Identifier;
    text: number;
  },
  {
    token: Token.Semicolon;
  }
]
```

For this source code:

```ts
type C = {
  a: string;
  b: number;
};
```

It generates these tokens

```ts
[
  {
    token: Token.Type;
    text: type;
  },
  {
    token: Token.Identifier;
    text: C;
  },
  {
    token: Token.Equals;
  },
  {
    token: Token.OpenBrace;
  },
  {
    token: Token.Identifier;
    text: a;
  },
  {
    token: Token.Colon;
  },
  {
    token: Token.Identifier;
    text: string;
  },
  {
    token: Token.Semicolon;
  }
  {
    token: Token.Identifier;
    text: b;
  },
  {
    token: Token.Colon;
  },
  {
    token: Token.Identifier;
    text: number;
  },
  {
    token: Token.Semicolon;
  },
  {
    token: Token.CloseBrace;
  },
  {
    token: Token.Semicolon;
  }
]
```

For this source code:

```ts
type D = {
  a: string;
  b: number;
  c: A;
  d: B;
  e: C;
};
```

It generates these tokens

```ts
[
  {
    token: Token.Type;
    text: type;
  },
  {
    token: Token.Identifier;
    text: D;
  },
  {
    token: Token.Equals;
  },
  {
    token: Token.OpenBrace;
  },
  {
    token: Token.Identifier;
    text: a;
  },
  {
    token: Token.Colon;
  },
  {
    token: Token.Identifier;
    text: string;
  },
  {
    token: Token.Semicolon;
  },
  {
    token: Token.Identifier;
    text: b;
  },
  {
    token: Token.Colon;
  },
  {
    token: Token.Identifier;
    text: number;
  },
  {
    token: Token.Semicolon;
  },
  {
    token: Token.Identifier;
    text: c;
  },
  {
    token: Token.Colon;
  },
  {
    token: Token.Identifier;
    text: A;
  },
  {
    token: Token.Semicolon;
  },
  {
    token: Token.Identifier;
    text: d;
  },
  {
    token: Token.Colon;
  },
  {
    token: Token.Identifier;
    text: B;
  },
  {
    token: Token.Semicolon;
  },
  {
    token: Token.Identifier;
    text: e;
  },
  {
    token: Token.Colon;
  },
  {
    token: Token.Identifier;
    text: C;
  },
  {
    token: Token.Semicolon;
  },
  {
    token: Token.CloseBrace;
  },
  {
    token: Token.Semicolon;
  }
]
```

## Lexer

```ts
case '{':
  token = Token.OpenBrace;
  break;
case '}':
  token = Token.CloseBrace;
  break;
```

## Parser

The `typename` can be:

An `Identifier` with `text` "string" or "number"

```ts
{
  kind: Node.TypeAlias;
  name: string;
  typename: {
    kind: Node.Identifier;
    text: string;
    pos: number;
  }
}
```

A `TypeLiteral` with `members` which is a list of `PropertySignature`

With `type` as an "string", "number":

```ts
{
  kind: Node.TypeAlias;
  name: string;
  typename: {
    kind: Node.TypeLiteral;
    members: [
      {
        kind: Node.Identifier;
        text: string;
        pos: number;
      },
      {
        kind: Node.Identifier;
        text: number;
        pos: number;
      }
    ]
  }
}
```

With `type` as "TypeReference":

```ts
{
  kind: Node.TypeAlias;
  name: string;
  typename: {
    kind: Node.TypeLiteral;
    members: [
      {
        kind: Node.TypeReference;
        typename: {
          kind: Node.Identifier;
          text: string;
        };
        pos: number;
      }
    ]
  }
}
```

## TypeScript source code

- Parser
  - `parsePropertyOrMethodSignature`: see `parseOptionalToken`
  - `parseList` and `isListTerminator`: handling members for object type
