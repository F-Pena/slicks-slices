import { useEffect, useState } from 'react';

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [sliceMasters, setSliceMasters] = useState();
  // use a side effect to fetch data from graphQL endpoint.
  const gql = String.raw;

  const deets = gql`
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
  `;

  useEffect(function () {
    // when component loads fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    }).then((res) =>
      res
        .json()
        .then((res) => {
          // Check for errors
          // set data to state
          setHotSlices(res.data.StoreSettings.hotSlices);
          setSliceMasters(res.data.StoreSettings.slicemaster);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
}
