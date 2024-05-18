import styled from 'styled-components'

export const EpisodeWrapper = styled.div`
  padding: 0 4rem;
  height: calc(100vh - 6.5rem);
  overflow-y: scroll;

  @media (max-width: 1442px) {
    overflow: unset;
  }
`
export const EpisodeContainer = styled.div`
  max-width: 45rem;
  padding: 3rem 2rem;
  margin: 0 auto;

  header {
    padding-bottom: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.secondary200};

    h1 {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    span {
      display: inline-block;
      font-size: 0.875rem;

      & + span {
        margin-left: 1rem;
        padding-left: 1rem;
        position: relative;

        &::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ddd;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`
export const ThumbnailContainer = styled.div`
  position: relative;

  img {
    object-fit: cover;
    border-radius: 1rem;
  }

  button {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: 0;
    position: absolute;
    z-index: 5;
    font-size: 0;

    transition: filter 0.2s;

    &:first-child {
      left: 0;
      top: 50%;
      background: ${(props) => props.theme.colors.primary500};
      transform: translate(-50%, -50%);
    }

    &:last-child {
      right: 0;
      top: 50%;
      background: ${(props) => props.theme.colors.green};
      transform: translate(50%, -50%);
    }

    &:hover {
      filter: brightness(0.95);
    }
  }
`

export const Description = styled.div`
  margin-top: 2rem;
  line-height: 1.675rem;
  color: ${(props) => props.theme.colors.secondary800};

  p {
    margin: 1.5rem 0;
  }
`
