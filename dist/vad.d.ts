export default class SileroVad {
    private loaded;
    private ort;
    private session;
    ready: boolean;
    load(): Promise<void>;
    process(audio: number[], batchSize?: number): Promise<number>;
}
