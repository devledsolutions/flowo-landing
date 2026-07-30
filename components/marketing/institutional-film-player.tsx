"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useSegment } from "@/providers/segment-provider";

interface InstitutionalFilmPlayerProps {
  video: string;
  captions: string;
  poster: string;
}

export function InstitutionalFilmPlayer({
  video,
  captions,
  poster,
}: InstitutionalFilmPlayerProps) {
  const { track } = useSegment();
  const [isPlaying, setIsPlaying] = useState(false);
  const milestonesRef = useRef(new Set<number>());

  const trackVideo = (action: string, extra?: Record<string, number>) => {
    track("Video Engagement", {
      video_id: "flowo_institutional",
      video_title: "Filme institucional Flowo",
      action,
      ...extra,
    });
  };

  if (isPlaying) {
    return (
      <video
        className="aspect-video w-full bg-black object-cover"
        autoPlay
        controls
        playsInline
        preload="metadata"
        poster={poster}
        onPlay={() => trackVideo("play")}
        onPause={() => trackVideo("pause")}
        onEnded={() => trackVideo("complete")}
        onTimeUpdate={(event) => {
          const videoElement = event.currentTarget;
          if (!videoElement.duration) return;
          const progress = (videoElement.currentTime / videoElement.duration) * 100;
          for (const milestone of [25, 50, 75]) {
            if (progress >= milestone && !milestonesRef.current.has(milestone)) {
              milestonesRef.current.add(milestone);
              trackVideo(`${milestone}%`, { progress_percent: milestone });
            }
          }
        }}
        aria-label="Filme institucional da Flowo mostrando atendimento por inteligência artificial no WhatsApp e agenda por profissional"
      >
        <source src={video} type="video/mp4" />
        <track
          kind="captions"
          src={captions}
          srcLang="pt-BR"
          label="Português"
        />
        Seu navegador não consegue reproduzir este vídeo.{" "}
        <a className="underline" href={video}>
          Baixe o arquivo em MP4.
        </a>
      </video>
    );
  }

  return (
    <div className="group relative aspect-video w-full bg-black">
      <Image
        src={poster}
        alt="Prévia do filme da Flowo mostrando o atendimento no WhatsApp conectado à agenda da barbearia"
        fill
        sizes="(min-width: 1280px) 1200px, calc(100vw - 2.5rem)"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/15"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        aria-label="Reproduzir filme institucional da Flowo"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/70 text-white shadow-2xl backdrop-blur transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20">
          <Play className="ml-1 h-6 w-6 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}
