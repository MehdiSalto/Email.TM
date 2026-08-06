export interface LoadingBarProps {
    /**
     * Specifies the variant of the loading bar. Use `gen-ai` to indicate an ongoing generative AI process.
     * Use `gen-ai-masked` for generative AI processes where the bar is displayed at the edge of an element
     * with rounded corners.
     */
    variant: LoadingBarProps.Variant;
}
export declare namespace LoadingBarProps {
    type Variant = "gen-ai" | "gen-ai-masked";
}
