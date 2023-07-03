# Object Types

## Source code

```ts
type A = string;
type B = number;
type C = {
  a: string;
  b: number;
};

type B = {
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
