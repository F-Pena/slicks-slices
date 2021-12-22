import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slicks's Slices`)
    .items([
      // create a new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      // add in th rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
