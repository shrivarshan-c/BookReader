"use client";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { IconChevronLeft, IconChevronRight, IconX, IconPlayerPlay, IconPlayerPause, IconPlayerSkipForward, IconPlayerSkipBack } from "@tabler/icons-react";     
import Image from "next/image";
import { allPlaylists, Playlist } from "@/data/MusicPlaylist";

export const MusicPanel = ({isOpen,setIsOpen}:{
    isOpen:boolean,
    setIsOpen:(open:boolean)=>void
})=>{
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
  const [loop,setLoop ] = useState(false);
  const handleNext = () => {
    if (activePlaylist && currentTrack < activePlaylist.tracks.length - 1) {
      playTrack(activePlaylist, currentTrack + 1);
    } else if (activePlaylist) {
      playTrack(activePlaylist, 0);
    }
  };

  const handlePrev = () => {
    if (activePlaylist && currentTrack > 0) {
      playTrack(activePlaylist, currentTrack - 1);
    }
  };

  const playTrack = (playlist: Playlist, trackIndex: number) => {
    if (audioRef.current) {
      audioRef.current.src = playlist.tracks[trackIndex].src;
      audioRef.current.play().catch(err => console.error('Play error:', err));
      setIsPlaying(true);
      setActivePlaylist(playlist);
      setCurrentTrack(trackIndex);
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setProgress(progress || 0);
    };

    const handleEnded = () => {
      if (activePlaylist && currentTrack < activePlaylist.tracks.length - 1) {
        playTrack(activePlaylist, currentTrack + 1);
      } else if (activePlaylist) {
        playTrack(activePlaylist, 0);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [activePlaylist, currentTrack]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(err => console.error('Play error:', err));
        setIsPlaying(true);
      }
    }
  };

  const currentTrackData = activePlaylist?.tracks[currentTrack];


    return(
        <motion.div 
        className="relative h-full bg-white dark:bg-surface flex justify-center items-center overflow-hidden"
        animate={{
          width: isOpen ? 220 : 40
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="absolute top-1 left-1 w-8 h-8 flex items-center justify-center rounded-sm bg-red-300 z-10">
          <Button 
            className="" 
            variant="default" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IconChevronRight size={20}/> : <IconChevronLeft size={20}/>}
          </Button>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col p-4"
          >
          <h2 className="text-lg font-semibold mb-4 text-center dark:text-foreground">Playlists</h2>

          <div className="flex-1 flex flex-col gap-3 overflow-y-auto mb-4">
            {allPlaylists.map((playlist) => (
              <div 
                key={playlist.name} 
                className="relative group flex gap-2 h-14 p-2 bg-zinc-100 dark:bg-surface-2 rounded-2xl cursor-pointer hover:bg-zinc-200 dark:hover:bg-surface-3 transition-colors"
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <div>
                  <Image 
                    src={playlist.coverImage}
                    width={40}
                    height={40}
                    alt={playlist.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />  
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium flex items-center gap-1 dark:text-foreground">
                    {playlist.name}
                  </p>
                  <p className="text-xs text-zinc-700 dark:text-zinc-400">{playlist.totalTime}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t dark:border-border pt-3 bg-white dark:bg-surface">
            <div className="mb-2">
              <p className="text-xs font-medium truncate dark:text-foreground">{currentTrackData?.title || "No track"}</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">{currentTrackData?.artist || "Select a track"}</p>
            </div>
            <div className="mb-2">
              <div className="w-full bg-zinc-200 dark:bg-surface-2 rounded-full h-1">
                <div className="bg-zinc-800 dark:bg-accent-cyan h-1 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrev}>
                <IconPlayerSkipBack size={18} />
              </Button>
              <Button 
                variant="default" 
                size="icon" 
                className="h-9 w-9"
                onClick={togglePlayPause}
              >
                {isPlaying ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNext}>
                <IconPlayerSkipForward size={18} />
              </Button>
            </div>
          </div>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedPlaylist && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-full h-[87%] bg-white dark:bg-surface shadow-lg z-10 flex flex-col items-center rounded-b-2xl "
            >
              <div className="flex items-center justify-between py-4 border-b dark:border-border">
                <h3 className="font-semibold text-lg dark:text-foreground">{selectedPlaylist.name}</h3>
                <Button className="items-center flex mt-1" variant="ghost" size="icon" onClick={() => setSelectedPlaylist(null)}>
                  <IconX  />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {selectedPlaylist.tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-surface-2 cursor-pointer transition-colors mb-2"
                    onClick={() => playTrack(selectedPlaylist, index)}
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 w-6">{track.id}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium dark:text-foreground">{track.title}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">{track.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
}
