# Object Types

Source code:

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

Tokens

For this source code:

```ts
type A = string;
```

```ts
{
  token: Token.Type;
  text: type;
}

{
  token: Token.Identifier;
  text: A;
}

{
  token: Token.Equals;
}

{
  token: Token.Identifier;
  text: string;
}

{
  token: Token.Semicolon;
}
```
