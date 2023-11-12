export default class CustomError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype)
  };
};

// export default class CustomError extends Error {
//   statusCode: number;
//   constructor(message: string, options?: ErrorOptions) {
//     super(message, { cause: options?.cause});
//     this.statusCode = options?.status;
//     Object.setPrototypeOf(this, CustomError.prototype)
//   };
// };