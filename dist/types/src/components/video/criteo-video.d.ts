import { VideoOptions } from './video';
export interface CriteoVideoProps {
    vastUrl: string;
    options: VideoOptions;
}
/**
 * High-level React/Preact component that accepts a VAST URL directly.
 * It fetches and parses the VAST, then renders the underlying <Video/>.
 */
export declare function CriteoVideo(props: CriteoVideoProps): import("preact/compat").JSX.Element | null;
