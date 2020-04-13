import { FileFormat1 as FileFormat } from '@sketch-hq/sketch-file-format-ts';
declare const hotspotLayer: ({ targetId, target, animationType, }: {
    targetId?: string | undefined;
    target?: string | undefined;
    animationType?: "none" | "slideFromRight" | "slideFromLeft" | "slideFromBottom" | "slideFromTop" | undefined;
}) => {
    flow: FileFormat.FlowConnection;
};
export default hotspotLayer;
