import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid, ItemsGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slice Masters</span>
      </h2>
      <p>Standing by ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotslices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotslices && <LoadingGrid count={4} />}
      {hotslices && !hotslices?.length && <p>No hot slices right now!</p>}
      {hotslices?.length && <ItemGrid items={hotslices} />}
    </div>
  );
}

export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <div>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={sliceMasters} />
          <HotSlices hotslices={hotSlices} />
        </HomePageGrid>
      </div>
    </div>
  );
}
