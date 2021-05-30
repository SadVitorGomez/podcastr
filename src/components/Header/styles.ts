import styled from 'styled-components'

export const HeaderContainer = styled.div`
  background-color: ${(props) => props.theme.colors.default};
  height: 6.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2rem 4rem;

  transition: all 0.5s linear;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary100};

  div {
    display: flex;
    align-items: center;
  }

  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid ${(props) => props.theme.colors.secondary100};
  }

  span {
    margin-left: 2rem;
    text-transform: capitalize;
  }
`
