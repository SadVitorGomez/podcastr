import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useMediaQuery } from 'react-responsive'

import { usePlayer } from '../../contexts/PlayerContext'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

import {
  Button,
  Buttons,
  ContentWrapper,
  CurrentEpisode,
  EmptyPlayer,
  EmptySlider,
  Footer,
  PlayButton,
  PlayerContainer,
  Progress,
  SliderWrapper,
} from './styles'

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
    <PlayerContainer>
      {isTabletOrMobileScreen || isTabletOrMobileDevice ? (
        <>
          {episode ? (
            <CurrentEpisode>
              <Image
                width={592}
                height={592}
                src={episode.thumbnail}
                alt={episode.title}
              />
              <ContentWrapper>
                <strong>{episode.title}</strong>
                <span>{episode.members}</span>
              </ContentWrapper>
            </CurrentEpisode>
          ) : (
            <EmptyPlayer>
              <strong>Selecione um podcast</strong>
            </EmptyPlayer>
          )}
          <Buttons>
            <Button
              type="button"
              onClick={playPrevious}
              disabled={!episode || !hasPrevious}
            >
              <img src="/play-previous.svg" alt="Play previous" />
            </Button>
            <PlayButton type="button" disabled={!episode} onClick={togglePlay}>
              {isPlaying ? (
                <img src="/pause.svg" alt="Play" />
              ) : (
                <img src="/play.svg" alt="Play" />
              )}
            </PlayButton>
            <Button
              type="button"
              onClick={playNext}
              disabled={!episode || !hasNext}
            >
              <img src="/play-next.svg" alt="Play next" />
            </Button>
          </Buttons>
        </>
      ) : (
        <>
          <header>
            <img src="/playing.svg" alt="Tocando agora" />
            <strong>Tocando agora</strong>
          </header>

          {episode ? (
            <CurrentEpisode>
              <Image
                width={300}
                height={300}
                src={episode.thumbnail}
                alt={episode.title}
              />
              <ContentWrapper>
                <strong>{episode.title}</strong>
                <span>{episode.members}</span>
              </ContentWrapper>
            </CurrentEpisode>
          ) : (
            <EmptyPlayer>
              <strong>Selecione um podcast</strong>
            </EmptyPlayer>
          )}

          <Footer opacity={!episode ? 0.5 : 1}>
            <Progress>
              <span>{convertDurationToTimeString(progress)}</span>
              <SliderWrapper>
                {episode ? (
                  <Slider
                    max={episode.duration}
                    value={progress}
                    onChange={handleSeek}
                    trackStyle={{ backgroundColor: '#1db954' }}
                    railStyle={{ backgroundColor: '#9f75ff' }}
                    handleStyle={{ borderColor: '#1db954', borderWidth: 4 }}
                  />
                ) : (
                  <EmptySlider />
                )}
              </SliderWrapper>
              <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
            </Progress>

            <Buttons>
              <Button
                type="button"
                className={isShuffling ? 'isActive' : ''}
                disabled={!episode || episodeList.length === 1}
                onClick={toggleShuffle}
              >
                <img src="/shuffle.svg" alt="Shuffle" />
              </Button>
              <Button
                type="button"
                onClick={playPrevious}
                disabled={!episode || !hasPrevious}
              >
                <img src="/play-previous.svg" alt="Play previous" />
              </Button>
              <PlayButton
                type="button"
                disabled={!episode}
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <img src="/pause.svg" alt="Play" />
                ) : (
                  <img src="/play.svg" alt="Play" />
                )}
              </PlayButton>
              <Button
                type="button"
                onClick={playNext}
                disabled={!episode || !hasNext}
              >
                <img src="/play-next.svg" alt="Play next" />
              </Button>
              <Button
                type="button"
                disabled={!episode}
                className={isLooping ? 'isActive' : ''}
              >
                <img src="/repeat.svg" alt="Repeat" onClick={toggleLoop} />
              </Button>
            </Buttons>
          </Footer>
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
    </PlayerContainer>
  )
}
