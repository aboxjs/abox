export function throwError(message: string, name = "rbox"): never {
  throw new Error(`${name}:${message}`);
}
