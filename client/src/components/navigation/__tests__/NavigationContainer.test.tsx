/* global describe, it, expect */
import 'jest';
import * as React from 'react';
import { mount } from 'enzyme';
import { NavigationContainer } from '../NavigationContainer';
import { NavigationButton } from '../NavigationButton';

describe('NavigationContainer', () => {
  it('should render backward and forward nav buttons', () => {
    const wrapper = mount(<NavigationContainer items={[]} />);
    const buttons = wrapper.find(NavigationButton);
    expect(buttons).toHaveLength(2);

    expect(buttons.at(0).text()).toEqual('<');
    expect(buttons.at(1).text()).toEqual('>');
  });

  it('should render each navigation item in order', () => {
    const navItems = [
      { ref: "ref1", value: "val1" },
      { ref: "ref2", value: "val2" },
      { ref: "ref3", value: "val3" }
    ];

    const wrapper = mount(<NavigationContainer items={navItems} />);
    const buttons = wrapper.find(NavigationButton);
    expect(buttons).toHaveLength(5);

    expect(buttons.at(0).text()).toEqual('val1');
    expect(buttons.at(1).text()).toEqual('val2');
    expect(buttons.at(2).text()).toEqual('val3');
  })
});
