export interface Visualizer {
    start(divId: string, width: number, height: number, recordFor: number): void;
    stop(): void;
}
