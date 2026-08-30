"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type PlayableTrack = {
  id: string;
  title: string;
  url: string;
};

type PlayerContextValue = {
  playlist: PlayableTrack[];
  registerPlaylist: (tracks: PlayableTrack[]) => void;
  currentTrack: PlayableTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playTrack: (track: PlayableTrack) => void;
  toggle: () => void;
  seek: (time: number) => void;
  playNext: () => void;
  playPrev: () => void;
  closePlayer: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playlist, setPlaylist] = useState<PlayableTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<PlayableTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const registerPlaylist = useCallback((tracks: PlayableTrack[]) => {
    setPlaylist(tracks);
  }, []);

  const playTrack = useCallback((track: PlayableTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTrack((prev) => {
      if (prev?.id === track.id) {
        if (audio.paused) void audio.play();
        else audio.pause();
        return prev;
      }
      audio.src = track.url;
      void audio.play();
      return track;
    });
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  }, [currentTrack]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const playNext = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    const next = playlist[idx + 1];
    if (next) playTrack(next);
  }, [currentTrack, playlist, playTrack]);

  const playPrev = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const idx = playlist.findIndex((t) => t.id === currentTrack.id);
    const prev = playlist[idx - 1];
    if (prev) playTrack(prev);
  }, [currentTrack, playlist, playTrack]);

  const closePlayer = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
    }
    setCurrentTrack(null);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnd = () => playNext();

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
    };
  }, [playNext]);

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        registerPlaylist,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        playTrack,
        toggle,
        seek,
        playNext,
        playPrev,
        closePlayer,
      }}
    >
      {children}
      <audio ref={audioRef} preload="none" />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
}
