import React from 'react';
import { graphql } from 'gatsby';
import BeerList from '../components/BeerList';
import SEO from '../components/SEO';

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;

  return (
    <>
      <SEO title={`Beers! We have ${data.beers.nodes.length}`} />
      <h2 className="center">
        We have ${data.beers.nodes.length} Beers Available. Dine in Only!
      </h2>
      <br />
      <BeerList beers={beers} />
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
      }
    }
  }
`;
