export interface Visualizer {
    play(divId: string, timeScale: number): void;
    pause(): void;
    resume(): void;
    stop(): void;
}
