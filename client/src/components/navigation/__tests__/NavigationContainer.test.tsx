/* global describe, it, expect */
import 'jest';
import * as React from 'react';
import { mount } from 'enzyme';
import { NavigationContainer } from '../NavigationContainer';
import { NavigationButton } from '../NavigationButton';

describe('NavigationContainer', () => {
  it('should render backward and forward nav buttons', () => {
    const wrapper = mount(<NavigationContainer />);
    const buttons = wrapper.find(NavigationButton);
    expect(buttons).toHaveLength(2);

    expect(buttons.at(0).text()).toEqual('<');
    expect(buttons.at(1).text()).toEqual('>');
  });
});
