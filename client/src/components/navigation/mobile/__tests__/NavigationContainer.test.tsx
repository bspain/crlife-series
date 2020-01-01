/* global describe, it, expect */
/* eslint @typescript-eslint/camelcase: 0 */
import 'jest';
import * as React from 'react';
import { mount } from 'enzyme';
import { NavigationContainer } from '../NavigationContainer';
import { NavigationButton } from '../NavigationButton';
import { EntryData } from '@crlife/Models';

const handleClick = (): void => {};

describe('NavigationContainer', () => {
  it('should render backward and forward nav buttons', () => {
    const entry: EntryData = {
      navigation: [],
      content: [],
      title: '',
      subtitle: ''
    };

    const wrapper = mount(
      <NavigationContainer
        onClick={handleClick}
        onTextsize={handleClick}
        expanded={true}
        entry={entry}
      />
    );

    const buttons = wrapper.find(NavigationButton);
    expect(buttons).toHaveLength(2);
    expect(buttons.at(0).text()).toEqual('<');
    expect(buttons.at(1).text()).toEqual('>');
  });

  it('should render each navigation based on content', () => {
    const entry: EntryData = {
      navigation: [
        { ref: 'ref1', value: 'val1' },
        { ref: 'ref2', value: 'val2' },
        { ref: 'ref3', value: 'val3' }
      ],

      content: [
        {
          id: 'ref1',
          type: 'devotion',
          title: 'title1',
          api_nlt_to_ref: '',
          value: 'There was a time'
        },
        {
          id: 'ref2',
          type: 'passage',
          title: 'oldtest',
          api_nlt_to_ref: '1Gen1',
          value: 'There was a time'
        },
        {
          id: 'ref3',
          type: 'passage',
          title: 'newtest',
          api_nlt_to_ref: '1Matt2',
          value: 'There was a time'
        }
      ],
      title: '',
      subtitle: ''
    };

    const wrapper = mount(
      <NavigationContainer
        onClick={handleClick}
        onTextsize={handleClick}
        expanded={true}
        entry={entry}
      />
    );

    const buttons = wrapper.find(NavigationButton);

    expect(buttons).toHaveLength(5);

    expect(buttons.at(0).text()).toEqual('Devotional');
    expect(buttons.at(1).text()).toEqual('1Gen1');
    expect(buttons.at(2).text()).toEqual('1Matt2');
  });
});