import { MediaFile } from './vast-model';
interface VideoSelectionOptions {
    mediaFiles: MediaFile[];
    targetDimensions?: {
        width: number;
        height: number;
    };
}
export declare function selectVideo(options: VideoSelectionOptions): MediaFile;
export declare function getWidthDifference(targetWidth?: number, mediaWidth?: string): number;
export declare function getHeightDifference(targetHeight?: number, mediaHeight?: string): number;
export declare function getCueText(trackOrElement?: HTMLTrackElement | TextTrack): string;
export {};
