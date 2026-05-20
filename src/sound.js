class SoundEngine {
    constructor() {
        this.ctx = null;
        // Load mute state from localStorage, default to unmuted (false)
        this.muted = localStorage.getItem('game_muted') === 'true';
    }

    init() {
        if (this.ctx) return;
        try {
            // Create AudioContext on first user interaction
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContextClass();
        } catch (e) {
            console.error("Web Audio API not supported in this browser:", e);
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('game_muted', this.muted);
        return this.muted;
    }

    isMuted() {
        return this.muted;
    }

    playTone(frequency, type, duration, gainStart, gainEnd = 0.001) {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        // Resume context if suspended (browser autoplay policy)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
        
        gainNode.gain.setValueAtTime(gainStart, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(gainEnd, this.ctx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playClick() {
        // Short high-pitched beep
        this.playTone(800, 'sine', 0.08, 0.1);
    }

    playSwipe() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        // Frequency sweep (whoosh/slide)
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.15);

        gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }

    playSuccess() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        // Cheerful arpeggio (C major: C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        const duration = 0.1;
        
        notes.forEach((freq, idx) => {
            const time = this.ctx.currentTime + (idx * 0.07);
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);

            gainNode.gain.setValueAtTime(0.08, time);
            gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);

            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);

            osc.start(time);
            osc.stop(time + duration);
        });
    }

    playWarning() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        // Double low alert beeps
        const time = this.ctx.currentTime;
        [0, 0.25].forEach((delay) => {
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();

            osc.type = 'sawtooth'; // Buzzing alarm tone
            osc.frequency.setValueAtTime(150, time + delay);

            gainNode.gain.setValueAtTime(0.05, time + delay);
            gainNode.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.18);

            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);

            osc.start(time + delay);
            osc.stop(time + delay + 0.18);
        });
    }

    playCashRegister() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const now = this.ctx.currentTime;

        // 1. Metal clink (White Noise)
        const bufferSize = this.ctx.sampleRate * 0.08; // 80ms buffer
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = this.ctx.createBufferSource();
        noiseNode.buffer = buffer;

        // Bandpass filter to make noise sound metallic
        const filterNode = this.ctx.createBiquadFilter();
        filterNode.type = 'bandpass';
        filterNode.frequency.value = 1000;
        filterNode.Q.value = 2.0;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.12, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        noiseNode.connect(filterNode);
        filterNode.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        noiseNode.start(now);
        noiseNode.stop(now + 0.08);

        // 2. High bell ding (1200Hz sine wave)
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1500, now + 0.04);

        oscGain.gain.setValueAtTime(0.1, now + 0.04);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);

        osc.start(now + 0.04);
        osc.stop(now + 0.35);
    }

    playGameOver() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        // Sad descending synth tones (G4 -> E4 -> C4 -> B3)
        const notes = [392.00, 329.63, 261.63, 246.94];
        const duration = 0.35;
        
        notes.forEach((freq, idx) => {
            const time = this.ctx.currentTime + (idx * 0.25);
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);
            
            // Add a pitch drop for the final note
            if (idx === notes.length - 1) {
                osc.frequency.exponentialRampToValueAtTime(120, time + duration);
            }

            gainNode.gain.setValueAtTime(0.12, time);
            gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);

            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);

            osc.start(time);
            osc.stop(time + duration);
        });
    }
}

export const sound = new SoundEngine();
