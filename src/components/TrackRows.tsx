"use client";

import { useEffect } from "react";
import { usePlayer } from "@/lib/player-context";
import DownloadButton from "@/components/DownloadButton";
import EqBars from "@/components/EqBars";
import { PauseIcon, PlayIcon } from "@/components/icons";

type Row = {
  id: string;
  title: string;
  description: string | null;
  url: string;
};

export default function TrackRows({
  tracks,
  isLoggedIn,
}: {
  tracks: Row[];
  isLoggedIn: boolean;
}) {
  const { registerPlaylist, playTrack, currentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    registerPlaylist(tracks.map(({ id, title, url }) => ({ id, title, url })));
  }, [tracks, registerPlaylist]);

  return (
    <ul className="divide-y divide-border">
      {tracks.map((track, i) => {
        const isCurrent = currentTrack?.id === track.id;
        const isCurrentlyPlaying = isCurrent && isPlaying;

        return (
          <li key={track.id} className="flex items-center gap-4 py-4">
            <button
              onClick={() => playTrack({ id: track.id, title: track.title, url: track.url })}
              aria-label={isCurrentlyPlaying ? "Pause" : "Play track"}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
                isCurrent
                  ? "border-accent bg-accent text-background"
                  : "border-border text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {isCurrentlyPlaying ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4 translate-x-[1px]" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-foreground-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`truncate font-display text-lg ${
                    isCurrent ? "text-accent" : "text-foreground"
                  }`}
                >
                  {track.title}
                </h3>
              </div>
              {track.description && (
                <p className="truncate text-sm text-foreground-dim">
                  {track.description}
                </p>
              )}
            </div>

            {isCurrentlyPlaying && <EqBars />}

            <DownloadButton trackId={track.id} isLoggedIn={isLoggedIn} />
          </li>
        );
      })}
    </ul>
  );
}
