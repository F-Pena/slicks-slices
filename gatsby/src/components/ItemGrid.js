import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function ItemGrid({ items }) {
  return (
    <ItemsGrid>
      {items.map((item, index) => (
        <ItemStyles key={index}>
          <div>
            <p>
              <span className="mark">{item.name}</span>
            </p>
            <img
              width="500"
              height="500"
              src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
              alt={item.name}
              style={{
                background: `url(${item.image.asset.metadata.lqip}) no-repeat 0 0`,
                backgroundSize: `cover`,
              }}
            />
          </div>
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
