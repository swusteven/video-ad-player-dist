import { VastInformation } from '../../services/vast-model';
export interface VideoOptions {
    altText: string;
    fallbackImage?: FallbackImageProps;
    maxVolume?: number;
    ccButtonLabel?: string;
    sessionClientUrl?: string;
    omWebUrl?: string;
    targetDimensions?: {
        width: number;
        height: number;
    };
}
export interface FallbackImageProps {
    src: string;
    optionalVideoRedirectUrl: string;
    optionalRedirectTarget: string;
}
interface VideoProps {
    options: VideoOptions;
    vastInformation: VastInformation;
}
export declare function Video(props: VideoProps): import("preact/compat").JSX.Element;
export {};
