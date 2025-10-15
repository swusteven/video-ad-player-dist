import { VastInformation } from '../vast-model';
import { RefObject } from 'preact';
declare global {
    interface Window {
        OmidSessionClient?: any;
    }
}
export interface MediaEvents {
    pause: () => void;
    resume: () => void;
    volumeChange: (volume: number) => void;
    start: (duration: number, volume: number) => void;
    firstQuartile: () => void;
    midpoint: () => void;
    thirdQuartile: () => void;
    bufferStart: () => void;
    bufferFinish: () => void;
    complete: () => void;
}
interface AdVerification {
    onAdLoaded: () => void;
    mediaEvents: MediaEvents;
}
export declare function setupAdVerification(vastInformation: VastInformation, sessionClientUrl: string, omWebUrl: string, videoRef: RefObject<HTMLVideoElement>): Promise<AdVerification | null>;
export {};
