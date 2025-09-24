import { CriteoVideo } from './components/video/criteo-video';
import { VideoOptions } from './components/video/video';
export declare const criteoVideoPlayerFromUrl: (vastUrl: string, elementId: string, options: VideoOptions) => Promise<void>;
export declare const criteoVideoPlayerFromContent: (vastContent: string, elementId: string, options: VideoOptions) => Promise<void>;
export { CriteoVideo };
