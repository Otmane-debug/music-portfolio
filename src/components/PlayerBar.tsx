"use client";

import { usePlayer } from "@/lib/player-context";
import { formatTime } from "@/lib/format";
import EqBars from "@/components/EqBars";
import {
  CloseIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
} from "@/components/icons";

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    toggle,
    seek,
    playNext,
    playPrev,
    closePlayer,
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-3">
        <div className="flex items-center gap-3 text-foreground-dim">
          <button
            onClick={playPrev}
            aria-label="Previous track"
            className="transition hover:text-accent"
          >
            <PrevIcon className="h-4 w-4" />
          </button>
          <button
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-background transition hover:opacity-85"
          >
            {isPlaying ? (
              <PauseIcon className="h-4 w-4" />
            ) : (
              <PlayIcon className="h-4 w-4 translate-x-[1px]" />
            )}
          </button>
          <button
            onClick={playNext}
            aria-label="Next track"
            className="transition hover:text-accent"
          >
            <NextIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-medium">{currentTrack.title}</p>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="mt-1.5"
          />
        </div>

        <span className="shrink-0 font-mono text-xs text-foreground-dim">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {isPlaying && <EqBars />}

        <button
          onClick={closePlayer}
          aria-label="Close player"
          className="shrink-0 text-foreground-dim transition hover:text-accent"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
