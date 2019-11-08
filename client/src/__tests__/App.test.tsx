/* global describe, it, expect */
import 'jest';
import * as React from 'react';
import { shallow } from 'enzyme';
import { Series } from '../models/Models';
import App from '../App';
import { NavigationContainer } from '../components/navigation/NavigationContainer';

describe('App component', () => {
  it('should render a NaviagtionContainer', () => {
    const series: Series = { navigation: [] };
    const wrapper = shallow(<App series={series} />);
    const navContainer = wrapper.find(NavigationContainer);
    expect(navContainer).toHaveLength(1);
  });
});
