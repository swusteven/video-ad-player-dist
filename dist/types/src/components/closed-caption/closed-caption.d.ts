interface ClosedCaptionProps {
    closedCaptionFile: string | undefined;
    closedCaptionLanguage: string | undefined;
    setCcContent: (content: string | null) => void;
}
export declare function ClosedCaption({ closedCaptionFile, closedCaptionLanguage, setCcContent }: ClosedCaptionProps): import("preact").JSX.Element;
export {};
