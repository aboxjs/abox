export function throwError(message: string, name = "abox"): never {
  throw new Error(`${name}:${message}`);
}
