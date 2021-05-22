import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;

  main {
    flex: 1;
  }

  @media (max-width: 1442px) {
    flex-direction: column;
    gap: 7rem;
  }

  @media (max-width: 1240px) {
    gap: 16rem;
  }
`
