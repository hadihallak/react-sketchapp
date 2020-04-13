declare function pick<T, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K>;
export default pick;
