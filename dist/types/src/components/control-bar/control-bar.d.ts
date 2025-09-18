import { JSX } from 'preact';
interface ControlBarProps {
    onClickMute: () => void;
    onClickPlayPause: () => void;
    isPlaying: boolean;
    isMuted: boolean;
    ccButtonLabel?: string;
    onClickCcButton: (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => void;
    isCcActive: boolean;
}
export declare function ControlBar({ onClickMute, onClickPlayPause, isMuted, isPlaying, ccButtonLabel, onClickCcButton, isCcActive }: ControlBarProps): JSX.Element;
export {};
