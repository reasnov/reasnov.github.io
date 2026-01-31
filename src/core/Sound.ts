/**
 * SoundService - Web Audio API Synthesizer
 * Generates retro terminal & space SFX without external assets.
 */

class SoundService {
	private ctx: AudioContext | null = null;
	private isMuted: boolean = false;

	constructor() {
		if (typeof window !== "undefined") {
			this.isMuted = localStorage.getItem("system-muted") === "true";
		}
	}

	private init() {
		if (!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
	}

	toggleMute() {
		this.isMuted = !this.isMuted;
		localStorage.setItem("system-muted", this.isMuted.toString());
		return this.isMuted;
	}

	getMuteState() {
		return this.isMuted;
	}

	// -- SOUND TYPES --

	/** UI Hover: Soft blip */
	playBlip() {
		if (this.isMuted) return;
		this.init();
		const osc = this.ctx!.createOscillator();
		const gain = this.ctx!.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(880, this.ctx!.currentTime);
		gain.gain.setValueAtTime(0.05, this.ctx!.currentTime);
		gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + 0.1);
		osc.connect(gain);
		gain.connect(this.ctx!.destination);
		osc.start();
		osc.stop(this.ctx!.currentTime + 0.1);
	}

	/** UI Click: Mechanical click */
	playClick() {
		if (this.isMuted) return;
		this.init();
		const osc = this.ctx!.createOscillator();
		const gain = this.ctx!.createGain();
		osc.type = "square";
		osc.frequency.setValueAtTime(150, this.ctx!.currentTime);
		gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
		gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + 0.05);
		osc.connect(gain);
		gain.connect(this.ctx!.destination);
		osc.start();
		osc.stop(this.ctx!.currentTime + 0.05);
	}

	/** Space Laser: Frequency sweep */
	playLaser() {
		if (this.isMuted) return;
		this.init();
		const osc = this.ctx!.createOscillator();
		const gain = this.ctx!.createGain();
		osc.type = "sawtooth";
		osc.frequency.setValueAtTime(1200, this.ctx!.currentTime);
		osc.frequency.exponentialRampToValueAtTime(100, this.ctx!.currentTime + 0.2);
		gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
		gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + 0.2);
		osc.connect(gain);
		gain.connect(this.ctx!.destination);
		osc.start();
		osc.stop(this.ctx!.currentTime + 0.2);
	}

	/** Explosion: White noise burst */
	playExplosion() {
		if (this.isMuted) return;
		this.init();
		const bufferSize = this.ctx!.sampleRate * 0.2;
		const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate);
		const data = buffer.getChannelData(0);
		for (let i = 0; i < bufferSize; i++) {
			data[i] = Math.random() * 2 - 1;
		}
		const noise = this.ctx!.createBufferSource();
		noise.buffer = buffer;
		const gain = this.ctx!.createGain();
		gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
		gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + 0.2);
		noise.connect(gain);
		gain.connect(this.ctx!.destination);
		noise.start();
	}

	/** System Startup: Arpeggio */
	playBoot() {
		if (this.isMuted) return;
		this.init();
		const notes = [440, 554.37, 659.25, 880];
		notes.forEach((freq, i) => {
			const osc = this.ctx!.createOscillator();
			const gain = this.ctx!.createGain();
			osc.type = "triangle";
			osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.1);
			gain.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.1);
			gain.gain.linearRampToValueAtTime(0.1, this.ctx!.currentTime + i * 0.1 + 0.05);
			gain.gain.linearRampToValueAtTime(0, this.ctx!.currentTime + i * 0.1 + 0.15);
			osc.connect(gain);
			gain.connect(this.ctx!.destination);
			osc.start(this.ctx!.currentTime + i * 0.1);
			osc.stop(this.ctx!.currentTime + i * 0.1 + 0.2);
		});
	}
}

export const sound = new SoundService();
