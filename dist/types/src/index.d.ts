import { VideoOptions } from './components/video/video';
/**
 * @param {string} vastUrl - The URL of the VAST XML file containing the video ad definition.
 * @param {string} elementId - The ID of the DOM element where the video player should be rendered. The element must exist in the DOM before calling this function.
 * @param {VideoOptions} options - Configuration object defining playback behavior, accessibility labels, OMID session details, and target dimensions.
 */
export declare const criteoVideoPlayerFromUrl: (vastUrl: string, elementId: string, options: VideoOptions) => Promise<void>;
/**
 * @param {string} vastContent - VAST XML string instead of fetching from a remote URL. Use this when you already have the VAST content available in your application
 * @param {string} elementId - The ID of the DOM element where the video player should be rendered. The element must exist in the DOM before calling this function.
 * @param {VideoOptions} options - Configuration object defining playback behavior, accessibility labels, OMID session details, and target dimensions.
 */
export declare const criteoVideoPlayerFromContent: (vastContent: string, elementId: string, options: VideoOptions) => Promise<void>;
