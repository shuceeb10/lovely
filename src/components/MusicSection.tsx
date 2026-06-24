import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Upload, Music, RotateCcw, AlertCircle } from 'lucide-react';
import { getSetting, saveSetting } from '../utils/db';

export default function MusicSection() {
  const DEFAULT_SONG_URL = 'https://assets.mixkit.co/music/preview/mixkit-romantic-ambience-1176.mp3';

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [songSource, setSongSource] = useState<string>(DEFAULT_SONG_URL);
  const [songName, setSongName] = useState<string>('Romantic Ambience (Default)');
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load custom song if saved
  useEffect(() => {
    async function loadCustomSong() {
      try {
        const savedBase64 = await getSetting<string>('custom_music_data');
        const savedName = await getSetting<string>('custom_music_name');
        if (savedBase64 && savedName) {
          setSongSource(savedBase64);
          setSongName(savedName);
        }
      } catch (err) {
        console.error('Failed to load custom music from DB:', err);
      }
    }
    loadCustomSong();
  }, []);

  // Handle source changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Playback interrupted or prevented by browser autoplay policy:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [songSource]);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Format Time
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Play / Pause toggler
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Audio play failed:', err);
      });
    }
  };

  // Track progress updating
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Seek bar slide handler
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  // Upload Custom MP3
  const handleMusicUpload = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      alert('Please upload an audio file (.mp3, .wav, etc.) only.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        try {
          await saveSetting('custom_music_data', dataUrl);
          await saveSetting('custom_music_name', file.name);
          setSongSource(dataUrl);
          setSongName(file.name);
          setIsPlaying(true);
        } catch (err) {
          console.error('Failed to save custom music:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleMusicUpload(e.target.files[0]);
    }
  };

  // Reset default melody
  const handleResetDefaultMusic = async () => {
    if (confirm('Reset to default romantic song?')) {
      try {
        await saveSetting('custom_music_data', null);
        await saveSetting('custom_music_name', null);
        setSongSource(DEFAULT_SONG_URL);
        setSongName('Romantic Ambience (Default)');
        setIsPlaying(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <section
      id="music-section"
      className="relative w-full py-24 px-4 md:px-8 bg-slate-950 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Our Song 🎵
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"
          />
          <p className="text-sm md:text-base text-rose-200/50 max-w-md mx-auto font-sans">
            Play our special romantic song or upload your own favorite tune to make this truly ours.
          </p>
        </div>

        {/* Player Layout Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-3xl mx-auto bg-gradient-to-br from-slate-900/60 to-slate-950/80 border border-rose-500/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative">
          
          {/* Audio HTML5 tag */}
          <audio
            ref={audioRef}
            src={songSource}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Vinyl Record Visualizer Frame */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="relative w-36 h-36 md:w-40 md:h-40 rounded-full bg-slate-950 border-4 border-slate-900 shadow-xl flex items-center justify-center p-3 select-none"
            >
              {/* Vinyl grooves lines */}
              <div className="absolute inset-2 rounded-full border border-white/5" />
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/5" />

              {/* Center Album Sticker Art */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-inner relative">
                <Music size={22} className="text-white/80 animate-pulse" />
                <div className="absolute w-3 h-3 bg-slate-950 rounded-full border border-white/10" />
              </div>
            </motion.div>
          </div>

          {/* Control Pane Frame */}
          <div className="col-span-1 md:col-span-8 flex flex-col justify-center space-y-6">
            
            {/* Song Label Details */}
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-mono tracking-widest text-rose-400 font-bold uppercase">
                NOW PLAYING
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white font-sans truncate pr-2" title={songName}>
                {songName}
              </h3>
            </div>

            {/* Seek bar and times */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeekChange}
                className="w-full h-1.5 bg-slate-950 rounded-full appearance-none outline-none focus:outline-none cursor-pointer accent-rose-500 border border-white/5"
              />
              <div className="flex justify-between text-xs font-mono text-rose-300/40">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Player controls */}
            <div className="flex items-center justify-between gap-4">
              {/* Left action button to reset to default song */}
              <button
                onClick={handleResetDefaultMusic}
                className="p-3 rounded-xl bg-slate-950 hover:bg-rose-500/10 text-rose-400 border border-white/5 active:scale-95 transition-all cursor-pointer"
                title="Reset to default song"
              >
                <RotateCcw size={16} />
              </button>

              {/* Main Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-rose-500/20 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>

              {/* Sound/Volume Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 rounded-xl bg-slate-950 hover:bg-rose-500/10 text-rose-400 border border-white/5 active:scale-95 transition-all cursor-pointer"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-20 md:w-24 h-1 bg-slate-950 rounded-full appearance-none outline-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Custom Song MP3 Upload Box */}
        <div className="max-w-md mx-auto">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-5 border border-dashed border-rose-500/20 hover:border-rose-500/40 bg-slate-900/20 rounded-2xl cursor-pointer text-center flex flex-col items-center justify-center space-y-2 group transition-all duration-300"
          >
            <Upload size={18} className="text-rose-400/60 group-hover:text-rose-400 transition-colors animate-pulse" />
            <span className="text-xs font-semibold text-rose-200">
              Upload Your Custom Memory Song
            </span>
            <span className="text-[10px] text-rose-300/30">
              Supports .mp3, .wav, or standard audio file formats
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
