/** Allow importing bundled image assets as typed asset references. */
declare module '*.jpg' {
  const content: number;
  export default content;
}

declare module '*.png' {
  const content: number;
  export default content;
}
