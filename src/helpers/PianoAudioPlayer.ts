import { PIANO_AUDIO_SAMPLES_URLS } from "@/data/PianoAudioSamples";
import { NoteToAbsoluteSemitone, PrintGenericNote, type GenericNote } from "./NoteHelpers";

const MAX_AUDIO_GAIN = 0.5;

type AudioPreferences = {
  volume: number;
  playbackEnabled: boolean;
};

export class PianoAudioPlayer {
  static audioContext: AudioContext;
  private static pianoBuffers: Record<string, AudioBuffer> = {};
  private static masterGain: GainNode;
  static audioPrefs: AudioPreferences = {
    volume: 50,
    playbackEnabled: false
  }

  private static playbackNoteLimit = {
    min: { name: "C", octave: 1 } as GenericNote,
    max: { name: "C", octave: 8 } as GenericNote,
  };

  private static init() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    if (!this.masterGain) {
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = MAX_AUDIO_GAIN;
      this.masterGain.connect(this.audioContext.destination);
    }

    this.setVolume(this.audioPrefs.volume);
  };

  static async loadSample(note: string, url: string) {
    if (this.pianoBuffers[note]) return;

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.pianoBuffers[note] = audioBuffer;
  };

  static async loadAllSamples() {
    this.init();

    const promises = PIANO_AUDIO_SAMPLES_URLS.map(async (e) => {
      await this.loadSample(PrintGenericNote(e.note), e.url);
    });
    await Promise.all(promises);
  };

  private static determineSample(noteSemitones: number) {
    const distances = PIANO_AUDIO_SAMPLES_URLS.map((s) => {
      const absOffset = Math.abs(noteSemitones - NoteToAbsoluteSemitone(s.note));
      return {
        sample: s,
        semitoneOffset: noteSemitones - NoteToAbsoluteSemitone(s.note),
        absOffset,
      };
    });
    const closest = distances.reduce((prev, curr) => (curr.absOffset < prev.absOffset ? curr : prev));
    return {
      sample: PrintGenericNote(closest.sample.note),
      semitoneOffset: closest.semitoneOffset,
    };
  };

  static playNote(note: GenericNote, decayTime = 5) {
    if (!this.audioPrefs.playbackEnabled) return;
    if (this.audioContext.state !== "running") this.audioContext.resume();

    if (this.audioPrefs.volume) {
      this.setVolume(this.audioPrefs.volume);
    };


    const noteSemitones = NoteToAbsoluteSemitone(note);
    const min = NoteToAbsoluteSemitone(this.playbackNoteLimit.min);
    const max = NoteToAbsoluteSemitone(this.playbackNoteLimit.max);
    if (noteSemitones < min || noteSemitones > max) return;

    const { sample, semitoneOffset } = this.determineSample(noteSemitones);
    const buffer = this.pianoBuffers[sample];
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = Math.pow(2, semitoneOffset / 12);

    const noteGain = this.audioContext.createGain();
    noteGain.gain.setValueAtTime(1, this.audioContext.currentTime);
    noteGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + decayTime);

    source.connect(noteGain);
    noteGain.connect(this.masterGain);
    source.start();

    source.stop(this.audioContext.currentTime + decayTime);
    source.onended = () => {
      source.disconnect();
      noteGain.disconnect();
    };
  }

  static playChord(notes: GenericNote[], decayTime = 5) {
    if (!notes || notes.length === 0 || !this.audioPrefs.playbackEnabled) return;

    notes.forEach((note) => {
      this.playNote(note, decayTime);
    });
  }

  static setVolume(value: number) {
    this.masterGain.gain.value = Math.max(0, MAX_AUDIO_GAIN * (value / 100));
  };

  static applyPreferences(prefs: AudioPreferences) {
    PianoAudioPlayer.audioPrefs = prefs;
  }
};
