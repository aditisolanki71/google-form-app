import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../components/not-found'

test('Snapshot of 404 Not found Component', () => {
   const component = renderer.create(
     <NotFound/>,
   );
   let tree = component.toJSON();
   expect(tree).toMatchSnapshot();

 });