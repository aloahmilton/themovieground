"use client";

import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js";
import type { IptvChannel } from "@/lib/iptv";

export default function WatchTvPlayer({ channel }: { channel: IptvChannel | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackError, setPlaybackError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !channel) return;

    let player: Hls | null = null;
    let cancelled = false;
    setPlaybackError(false);
    video.removeAttribute("src");
    video.load();

    const isHls = new URL(channel.streamUrl).pathname.toLowerCase().endsWith(".m3u8");
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = channel.streamUrl;
    } else if (isHls) {
      import("hls.js").then(({ default: HlsPlayer }) => {
        if (cancelled) return;
        if (!HlsPlayer.isSupported()) {
          setPlaybackError(true);
          return;
        }

        player = new HlsPlayer({ enableWorker: true });
        player.loadSource(channel.streamUrl);
        player.attachMedia(video);
        player.on(HlsPlayer.Events.ERROR, (_event, data) => {
          if (data.fatal) setPlaybackError(true);
        });
      }).catch(() => setPlaybackError(true));
    } else {
      video.src = channel.streamUrl;
    }

    return () => {
      cancelled = true;
      player?.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [channel]);

  if (!channel) {
    return (
      <div className="flex aspect-video items-center justify-center bg-[#080808] text-center text-sm text-zinc-500">
        Choose a channel to start watching.
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden bg-black">
      <video
        ref={videoRef}
        controls
        playsInline
        preload="none"
        onError={() => setPlaybackError(true)}
        aria-label={`Live stream: ${channel.name}`}
        className="h-full w-full bg-black"
      />
      {playbackError && (
        <div className="absolute inset-x-0 bottom-12 px-4 text-center text-sm text-zinc-300">
          This stream could not be played. Try another channel.
        </div>
      )}
    </div>
  );
}