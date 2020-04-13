declare const Platform: {
    OS: string;
    Version: number;
    select: (obj: {
        sketch: any;
    }) => any;
};
export default Platform;
