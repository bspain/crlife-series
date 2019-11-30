/* global describe, it, expect */
import 'jest';
import * as React from 'react';
import { shallow } from 'enzyme';
import { SeriesEntry } from '@models/Models';
import App from '../App';
import { NavigationContainer } from '../components/navigation/NavigationContainer';

describe('App component', () => {
  it('should render a NaviagtionContainer', () => {
    const entry: SeriesEntry = {
      title: '',
      subtitle: '',
      navigation: [],
      content: [],
      next: '',
      prev: ''
    };
    const wrapper = shallow(<App entry={entry} />);
    const navContainer = wrapper.find(NavigationContainer);
    expect(navContainer).toHaveLength(1);
  });
});
