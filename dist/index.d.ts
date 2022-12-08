export declare type Trigger = {
    id: string;
    threshold: number;
};
export declare class SpeechRecorder {
    private audioStarted;
    private audioStream?;
    private consecutiveSpeech;
    private consecutiveSilence;
    private disableSecondPass;
    private error;
    private framesPerBuffer;
    private highWaterMark;
    private leadingBuffer;
    private leadingPadding;
    private minimumVolume;
    private sampleRate;
    private speaking;
    private speakingThreshold;
    private silenceThreshold;
    private triggers;
    private webrtcVad;
    private vad;
    private vadBuffer;
    private vadBufferSize;
    private vadRateLimit;
    private vadThreshold;
    constructor(options?: any);
    load(): Promise<void>;
    onData(startOptions: any, audio: any): Promise<void>;
    start(startOptions?: any): Promise<void>;
    reset(): void;
    stop(): void;
}
export declare const getDevices: any;
