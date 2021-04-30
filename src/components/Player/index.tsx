import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useMediaQuery } from 'react-responsive'

import { usePlayer } from '../../contexts/PlayerContext'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

import styles from './styles.module.scss'

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasNext,
    hasPrevious,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    clearPlayerState,
    playNext,
    playPrevious,
  } = usePlayer()

  const episode = episodeList[currentEpisodeIndex]

  const isTabletOrMobileScreen = useMediaQuery({ query: '(max-width: 1224px)' })
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)',
  })

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  function setupProgressListener() {
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(audioRef.current.currentTime)
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  return (
    <div className={styles.playerContainer}>
      {isTabletOrMobileScreen || isTabletOrMobileDevice ? (
        <>
          {episode ? (
            <div className={styles.currentEpisode}>
              <Image
                width={592}
                height={592}
                objectFit={'cover'}
                src={episode.thumbnail}
              />
              <div className={styles.contentWrapper}>
                <strong>{episode.title}</strong>
                <span>{episode.members}</span>
              </div>
            </div>
          ) : (
            <div className={styles.emptyPlayer}>
              <strong>Selecione um podcast para ouvir</strong>
            </div>
          )}
          <div className={styles.buttons}>
            <button
              type="button"
              onClick={playPrevious}
              disabled={!episode || !hasPrevious}
            >
              <img src="/play-previous.svg" alt="Play previous" />
            </button>
            <button
              type="button"
              className={styles.playButton}
              disabled={!episode}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <img src="/pause.svg" alt="Play" />
              ) : (
                <img src="/play.svg" alt="Play" />
              )}
            </button>
            <button
              type="button"
              onClick={playNext}
              disabled={!episode || !hasNext}
            >
              <img src="/play-next.svg" alt="Play next" />
            </button>
          </div>
        </>
      ) : (
        <>
          <header>
            <img src="/playing.svg" alt="Tocando agora" />
            <strong>Tocando agora</strong>
          </header>

          {episode ? (
            <div className={styles.currentEpisode}>
              <Image
                width={592}
                height={592}
                objectFit={'cover'}
                src={episode.thumbnail}
              />
              <div className={styles.contentWrapper}>
                <strong>{episode.title}</strong>
                <span>{episode.members}</span>
              </div>
            </div>
          ) : (
            <div className={styles.emptyPlayer}>
              <strong>Selecione um podcast para ouvir</strong>
            </div>
          )}

          <footer className={!episode ? styles.empty : ''}>
            <div className={styles.progress}>
              <span>{convertDurationToTimeString(progress)}</span>
              <div className={styles.slider}>
                {episode ? (
                  <Slider
                    max={episode.duration}
                    value={progress}
                    onChange={handleSeek}
                    trackStyle={{ backgroundColor: '#04d361' }}
                    railStyle={{ backgroundColor: '#9f75ff' }}
                    handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                  />
                ) : (
                  <div className={styles.emptySlider} />
                )}
              </div>
              <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
            </div>

            <div className={styles.buttons}>
              <button
                type="button"
                className={isShuffling ? styles.isActive : ''}
                disabled={!episode || episodeList.length === 1}
                onClick={toggleShuffle}
              >
                <img src="/shuffle.svg" alt="Shuffle" />
              </button>
              <button
                type="button"
                onClick={playPrevious}
                disabled={!episode || !hasPrevious}
              >
                <img src="/play-previous.svg" alt="Play previous" />
              </button>
              <button
                type="button"
                className={styles.playButton}
                disabled={!episode}
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <img src="/pause.svg" alt="Play" />
                ) : (
                  <img src="/play.svg" alt="Play" />
                )}
              </button>
              <button
                type="button"
                onClick={playNext}
                disabled={!episode || !hasNext}
              >
                <img src="/play-next.svg" alt="Play next" />
              </button>
              <button
                type="button"
                disabled={!episode}
                className={isLooping ? styles.isActive : ''}
              >
                <img src="/repeat.svg" alt="Repeat" onClick={toggleLoop} />
              </button>
            </div>
          </footer>
        </>
      )}

      {episode && (
        <audio
          src={episode.url}
          ref={audioRef}
          loop={isLooping}
          onEnded={handleEpisodeEnded}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
          autoPlay
          onLoadedMetadata={() => setupProgressListener()}
        />
      )}
    </div>
  )
}
