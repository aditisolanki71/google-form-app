import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../../components/layouts/header'

test('Snapshot of Header Component', () => {
   const component = renderer.create(
     <Header>header</Header>,
   );
   let tree = component.toJSON();
   expect(tree).toMatchSnapshot();

 });
