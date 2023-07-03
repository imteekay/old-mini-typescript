# Object Types

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
