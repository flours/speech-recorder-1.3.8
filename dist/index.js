"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var bindings_1 = __importDefault(require("bindings"));
var fs = __importStar(require("fs"));
var stream_1 = require("stream");
var webrtcvad_1 = __importDefault(require("webrtcvad"));
var vad_1 = __importDefault(require("./vad"));
var portAudioPath = __dirname + "/../build/Release/portaudio.node";
var portAudioBindings;
if (fs.existsSync(portAudioPath)) {
    portAudioBindings = require(portAudioPath);
}
else {
    portAudioBindings = bindings_1["default"]("portaudio.node");
}
var AudioStream = (function (_super) {
    __extends(AudioStream, _super);
    function AudioStream(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, {
            highWaterMark: options.highWaterMark,
            objectMode: false
        }) || this;
        _this.audio = new portAudioBindings.AudioIn(options);
        _this.error = options.error || null;
        return _this;
    }
    AudioStream.prototype._read = function (size) {
        var _this = this;
        this.audio.read(size, function (err, buf) {
            if (!err) {
                _this.push(buf);
            }
            else {
                if (_this.error) {
                    _this.error(err);
                }
            }
        });
    };
    AudioStream.prototype.start = function () {
        this.audio.start();
    };
    AudioStream.prototype.stop = function () {
        this.audio.quit(function () { });
    };
    return AudioStream;
}(stream_1.Readable));
var SpeechRecorder = (function () {
    function SpeechRecorder(options) {
        if (options === void 0) { options = {}; }
        this.audioStarted = false;
        this.consecutiveSpeech = 0;
        this.consecutiveSilence = 0;
        this.disableSecondPass = false;
        this.error = null;
        this.framesPerBuffer = 320;
        this.highWaterMark = 64000;
        this.leadingBuffer = [];
        this.leadingPadding = 20;
        this.minimumVolume = 200;
        this.sampleRate = 16000;
        this.speaking = false;
        this.speakingThreshold = 1;
        this.silenceThreshold = 10;
        this.triggers = [];
        this.vad = new vad_1["default"]();
        this.vadBuffer = [];
        this.vadBufferSize = 10;
        this.vadRateLimit = 0;
        this.vadThreshold = 0.75;
        if (options.disableSecondPass !== undefined) {
            this.disableSecondPass = options.disableSecondPass;
        }
        if (options.error !== undefined) {
            this.error = options.error;
        }
        if (options.framesPerBuffer !== undefined) {
            this.framesPerBuffer = options.framesPerBuffer;
        }
        if (options.highWaterMark !== undefined) {
            this.highWaterMark = options.highWaterMark;
        }
        if (options.leadingPadding !== undefined) {
            this.leadingPadding = options.leadingPadding;
        }
        if (options.minimumVolume !== undefined) {
            this.minimumVolume = options.minimumVolume;
        }
        if (options.silenceThreshold !== undefined) {
            this.silenceThreshold = options.silenceThreshold;
        }
        if (options.speakingThreshold !== undefined) {
            this.speakingThreshold = options.speakingThreshold;
        }
        if (options.triggers !== undefined) {
            this.triggers = options.triggers;
        }
        if (options.vadBufferSize !== undefined) {
            this.vadBufferSize = options.vadBufferSize;
        }
        if (options.vadRateLimit !== undefined) {
            this.vadRateLimit = options.vadRateLimit;
        }
        if (options.vadThreshold !== undefined) {
            this.vadThreshold = options.vadThreshold;
        }
        this.webrtcVad = new webrtcvad_1["default"](this.sampleRate, options.firstPassLevel || 3);
    }
    SpeechRecorder.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.disableSecondPass) return [3, 2];
                        return [4, this.vad.load()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    SpeechRecorder.prototype.onData = function (startOptions, audio) {
        return __awaiter(this, void 0, void 0, function () {
            var sum, normalized, i, e, volume, speaking, probability, _i, _a, trigger;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sum = 0;
                        normalized = [];
                        for (i = 0; i < audio.length; i += 2) {
                            e = audio.readInt16LE(i);
                            sum += Math.pow(e, 2);
                            normalized.push(e / 32767);
                        }
                        this.vadBuffer.push(normalized);
                        while (this.vadBuffer.length > this.vadBufferSize) {
                            this.vadBuffer.shift();
                        }
                        volume = Math.floor(Math.sqrt(sum / (audio.length / 2)));
                        speaking = !!(this.webrtcVad.process(audio) &&
                            volume > this.minimumVolume &&
                            this.vadBuffer.length == this.vadBufferSize);
                        probability = speaking ? 1 : 0;
                        if (!(!this.disableSecondPass &&
                            speaking &&
                            this.vadBuffer.length == this.vadBufferSize &&
                            this.vad.ready)) return [3, 2];
                        return [4, this.vad.process([].concat.apply([], this.vadBuffer))];
                    case 1:
                        probability = _b.sent();
                        speaking = probability > this.vadThreshold;
                        if (this.vadRateLimit > 0 && speaking) {
                            this.vadBuffer.splice(0, Math.min(this.vadRateLimit, this.vadBufferSize));
                        }
                        _b.label = 2;
                    case 2:
                        if (speaking) {
                            this.consecutiveSilence = 0;
                            this.consecutiveSpeech++;
                        }
                        else {
                            this.consecutiveSilence++;
                            this.consecutiveSpeech = 0;
                        }
                        if (!this.speaking) {
                            this.leadingBuffer.push(Buffer.from(audio));
                            if (this.consecutiveSpeech >= this.speakingThreshold) {
                                this.audioStarted = true;
                                this.speaking = true;
                                if (this.leadingBuffer.length > 0) {
                                    if (startOptions.onChunkStart) {
                                        startOptions.onChunkStart(Buffer.concat(this.leadingBuffer));
                                    }
                                    this.leadingBuffer = [];
                                }
                            }
                            else {
                                while (this.leadingBuffer.length > this.leadingPadding) {
                                    this.leadingBuffer.shift();
                                }
                            }
                        }
                        if (startOptions.onAudio) {
                            startOptions.onAudio(audio, this.speaking, speaking, volume, this.audioStarted ? this.consecutiveSilence : 0, probability);
                        }
                        if (this.speaking) {
                            if (this.consecutiveSilence == this.silenceThreshold) {
                                this.speaking = false;
                                if (startOptions.onChunkEnd) {
                                    startOptions.onChunkEnd();
                                }
                            }
                        }
                        for (_i = 0, _a = this.triggers; _i < _a.length; _i++) {
                            trigger = _a[_i];
                            if (this.audioStarted && this.consecutiveSilence == trigger.threshold) {
                                if (startOptions.onTrigger) {
                                    startOptions.onTrigger(trigger);
                                }
                            }
                        }
                        return [2];
                }
            });
        });
    };
    SpeechRecorder.prototype.start = function (startOptions) {
        if (startOptions === void 0) { startOptions = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var deviceId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!startOptions) {
                            startOptions = {};
                        }
                        deviceId = startOptions.deviceId;
                        if (deviceId === undefined) {
                            deviceId = -1;
                        }
                        return [4, this.load()];
                    case 1:
                        _a.sent();
                        this.leadingBuffer = [];
                        this.audioStream = new AudioStream({
                            channelCount: 1,
                            deviceId: deviceId,
                            error: this.error,
                            highWaterMark: this.highWaterMark,
                            framesPerBuffer: this.framesPerBuffer,
                            sampleFormat: 16,
                            sampleRate: this.sampleRate
                        });
                        this.audioStream.on("data", function (audio) {
                            _this.onData(startOptions, audio);
                        });
                        this.audioStream.on("error", function (error) {
                            if (_this.error) {
                                _this.error(error);
                            }
                        });
                        this.audioStream.start();
                        return [2];
                }
            });
        });
    };
    SpeechRecorder.prototype.reset = function () {
        this.audioStarted = false;
        this.consecutiveSilence = 0;
        this.consecutiveSpeech = 0;
    };
    SpeechRecorder.prototype.stop = function () {
        this.audioStream.stop();
        this.audioStream.destroy();
        this.audioStream = null;
        this.reset();
    };
    return SpeechRecorder;
}());
exports.SpeechRecorder = SpeechRecorder;
exports.getDevices = portAudioBindings.getDevices;
//# sourceMappingURL=index.js.map