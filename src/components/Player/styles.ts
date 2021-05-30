import styled from 'styled-components'

export const PlayerContainer = styled.div`
  width: 26.5rem;
  height: 100vh;
  padding: 3rem 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  transition: all 0.5s linear;
  background: ${(props) => props.theme.colors.primary500};
  color: ${(props) => props.theme.colors.text};

  header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }

  @media (max-width: 1442px) {
    width: 100%;
    height: auto;
    padding: 1rem 2rem;
    justify-content: center;
    flex-direction: row;
    position: sticky;
    bottom: 0;
    border-top: 2px solid ${(props) => props.theme.colors.primary800};

    header {
      display: none;
    }
  }

  @media (max-width: 1224px) {
    padding: 0;
    display: flex;
    justify-content: space-between;
    border: none;
  }
`

export const Footer = styled.footer<{ opacity: number }>`
  align-self: stretch;

  opacity: ${(props) => props.opacity};

  @media (max-width: 1442px) {
    width: 50%;
    display: flex;
    flex-direction: column-reverse;
  }

  @media (max-width: 1224px) {
    display: none;
  }
`

export const EmptyPlayer = styled.div`
  width: 100%;
  height: 20rem;
  padding: 4rem;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1.5px dashed ${(props) => props.theme.colors.primary300};
  border-radius: 1.5rem;
  background: linear-gradient(
    143.8deg,
    rgba(145, 100, 250, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  @media (max-width: 1442px) {
    width: 127px;
    height: 100%;
    padding: 0 1rem;
    position: absolute;
    left: 0;
    top: 0;

    border-radius: 0;
    border: none;
    border-right: 1.5px dashed ${(props) => props.theme.colors.primary300};
    background: ${(props) => props.theme.colors.primary500};
  }

  @media (max-width: 1224px) {
    width: 6rem;
    height: 6rem;
    position: static;
  }
`

export const CurrentEpisode = styled.div`
  text-align: center;

  img {
    border-radius: 1.5rem;
  }

  strong {
    display: block;
    margin-top: 2rem;
    font: 600 1.25rem Lexend, sans-serif;
    line-height: 1.75rem;
  }

  span {
    display: block;
    margin-top: 1rem;
    opacity: 0.6;
    line-height: 1.5rem;
  }

  @media (max-width: 1442px) {
    padding: 0 1rem;
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 0;
    }

    strong {
      max-width: 16rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 0;
      font-size: 0.75rem;
      line-height: normal;
    }

    span {
      max-width: 16rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
      font-size: 0.7rem;
      margin-top: 0;
    }
  }

  @media (max-width: 1224px) {
    padding: 0;
    position: static;

    img {
      width: 6rem;
      height: 6rem;
    }

    strong {
      max-width: 100%;
      white-space: normal;
      text-overflow: unset;
    }

    span {
      max-width: 100%;
      white-space: normal;
      text-overflow: unset;
    }
  }
`

export const ContentWrapper = styled.div`
  @media (max-width: 1442px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-left: 1rem;
  }
`

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }
`

export const SliderWrapper = styled.div`
  flex: 1;
`

export const EmptySlider = styled(SliderWrapper)`
  width: 100%;
  height: 4px;
  background: ${(props) => props.theme.colors.primary300};
  border-radius: 2px;
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1.5rem;

  @media (max-width: 1442px) {
    margin-top: 0;
    margin-bottom: 0.875rem;
  }

  @media (max-width: 1224px) {
    padding-right: 2.5rem;
    margin-top: 0;
    margin-bottom: 0;
  }
`

export const Button = styled.button`
  background: transparent;
  border: 0;
  font-size: 0;
  transition: filter 0.2s;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    filter: brightness(0.7);
  }

  &.isActive {
    filter: invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
  }

  &.isActive:hover {
    filter: brightness(0.36) invert(0.35) sepia(1) saturate(3)
      hue-rotate(100deg);
  }
`

export const PlayButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0;
  font-size: 0;
  transition: filter 0.2s;
  background-color: ${(props) => props.theme.colors.primary400} !important;

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }
`
