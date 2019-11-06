/* global describe, it, expect */
import 'jest';
import * as React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App component', () => {
  it('should render Hello World on start', () => {
    const wrapper = shallow(<App />);
    const div = wrapper.find('div');
    expect(div.text()).toEqual('Hello World');
  });
});
