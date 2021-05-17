export type Action<A, S = unknown> = {
  type: A;
  payload?: S;
};
