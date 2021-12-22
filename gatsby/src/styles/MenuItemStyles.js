import styled from 'styled-components';

const MenuItemStyles = styled.div`
  position: relative;
  display: block;
  text-align: center;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 400px;
  }

  p {
    margin: 0;
  }

  button {
    font-size: 1.5rem;
  }

  button + button {
    margin-left: 1rem;
  }

  .remove {
    background: none;
    color: var(--red);
    font-size: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height: 1rem;
  }

  @media (min-width: 620px) {
    display: grid;
    align-content: center;
    align-items: center;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0 1.3rem;
    text-align: left;

    .gatsby-image-wrapper {
      height: 100%;
    }
  }
`;

export default MenuItemStyles;
