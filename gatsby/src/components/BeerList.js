import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const BeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;

  img {
    display: grid;
    align-items: center;
    object-fit: contain;
    width: 100%;
    height: 200px;
    font-size: 10px;
    color: black;
  }
`;

const BeerPrice = styled.p`
  margin: 0 0 2rem;
`;

const BeerListStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

function SingleBeer({ beer }) {
  // const rating = beer.rating != null ? Math.round(beer.rating.average) : '';
  // const reviews = beer.rating != null ? beer.rating.reviews : 'No Reviews Yet!';

  return (
    <BeerStyles className="beer">
      <img src={beer.image} alt={beer.name} className="beer__img" />
      <h2 className="beer__name">{beer.name}</h2>
      <BeerPrice className="beer__price">{beer.price}</BeerPrice>
      {/* <div className="beer__rating" title={`${rating} out of 5 stars`}>
        {`⭐`.repeat(rating)}
        <span style={{ filter: `grayscale(100%)` }}>
          {`⭐`.repeat(5 - rating)}
        </span>
        <span>({reviews})</span>
      </div> */}
    </BeerStyles>
  );
}

export default function BeerList({ beers }) {
  return (
    <BeerListStyles className="beer-list">
      {beers.map((beer) => (
        <SingleBeer key={beer.id} beer={beer} />
      ))}
    </BeerListStyles>
  );
}
