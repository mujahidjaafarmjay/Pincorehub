"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from "lucide-react"

interface VideoPlayerProps {
  src: string
  title?: string
  onProgress?: (progress: number) => void
  onComplete?: () => void
  autoPlay?: boolean
  controls?: boolean
}

export default function VideoPlayer({
  src,
  title,
  onProgress,
  onComplete,
  autoPlay = false,
  controls = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      if (onProgress) {
        const progress = (video.currentTime / video.duration) * 100
        onProgress(progress)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onComplete) {
        onComplete()
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [onProgress, onComplete])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (showControls) {
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [showControls, isPlaying])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (value[0] / 100) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0] / 100
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
  }

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="relative bg-black overflow-hidden group">
      <div
        ref={containerRef}
        className="relative w-full aspect-video"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          autoPlay={autoPlay}
          onClick={togglePlay}
        />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Play/Pause Overlay */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button onClick={togglePlay} size="lg" className="rounded-full w-16 h-16 bg-orange-500 hover:bg-orange-600">
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>
        )}

        {/* Controls */}
        {controls && (
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                value={[duration ? (currentTime / duration) * 100 : 0]}
                onValueChange={handleSeek}
                max={100}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button onClick={() => skip(-10)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button onClick={togglePlay} size="sm" className="bg-orange-500 hover:bg-orange-600">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <Button onClick={() => skip(10)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipForward className="h-4 w-4" />
                </Button>

                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <Button onClick={toggleMute} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Playback Speed */}
                <select
                  value={playbackRate}
                  onChange={(e) => changePlaybackRate(Number(e.target.value))}
                  className="bg-transparent text-white text-sm border border-white/20 rounded px-2 py-1"
                >
                  <option value={0.5} className="bg-black">
                    0.5x
                  </option>
                  <option value={0.75} className="bg-black">
                    0.75x
                  </option>
                  <option value={1} className="bg-black">
                    1x
                  </option>
                  <option value={1.25} className="bg-black">
                    1.25x
                  </option>
                  <option value={1.5} className="bg-black">
                    1.5x
                  </option>
                  <option value={2} className="bg-black">
                    2x
                  </option>
                </select>

                <Button onClick={toggleFullscreen} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Title Overlay */}
        {title && (
          <div className="absolute top-4 left-4 right-4">
            <h3 className="text-white text-lg font-semibold bg-black/50 px-3 py-2 rounded">{title}</h3>
          </div>
        )}
      </div>
    </Card>
  )
}
