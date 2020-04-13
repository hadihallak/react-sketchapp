declare type Styles = Object;
declare class Context {
    styles: Styles;
    staged: Array<Styles>;
    constructor(styles?: Styles);
    addInheritableStyles(styles: Styles): void;
    forChildren(): Context;
    getInheritedStyles(): Object;
}
export default Context;
