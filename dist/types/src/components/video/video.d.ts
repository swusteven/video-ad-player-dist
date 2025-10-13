import { VastInformation } from '../../services/vast-model';
export interface VideoOptions {
    /** A short, descriptive text alternative for the video content. */
    altText: string;
    /** Defines an image to display when the video fails to load or before playback begins. */
    fallbackImage?: FallbackImageProps;
    /** Sets the maximum allowed volume level for playback (range: 0–1). Default is 1 */
    maxVolume?: number;
    /** Custom label for the Closed Caption (CC) button in the player UI. */
    ccButtonLabel?: string;
    /** URL for loading the OMID Session Client, required for OM SDK viewability measurement. */
    sessionClientUrl?: string;
    /** URL of the OM Web Verification script, used for OMID ad verification integrations. */
    omWebUrl?: string;
    /** Specifies the intended target width and height for video selection. The player automatically selects the closest matching video file based on these dimensions. */
    targetDimensions?: {
        width: number;
        height: number;
    };
}
export interface FallbackImageProps {
    /** The source URL of the fallback image. */
    src: string;
    /** Optional URL to redirect to when the fallback image is clicked. */
    optionalVideoRedirectUrl: string;
    /** Optional target for the redirect (e.g., '_blank' for new tab). */
    optionalRedirectTarget: string;
}
interface VideoProps {
    /** Configuration options for the video player including accessibility, dimensions, and OMID settings. */
    options: VideoOptions;
    /** Parsed VAST information containing media files, beacons, and ad metadata. */
    vastInformation: VastInformation;
}
export declare function Video(props: VideoProps): import("preact/compat").JSX.Element;
export {};
