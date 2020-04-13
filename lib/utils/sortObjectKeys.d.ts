declare const sortObjectKeys: <T extends {
    [key: string]: unknown;
}>(obj: T) => T;
export default sortObjectKeys;
