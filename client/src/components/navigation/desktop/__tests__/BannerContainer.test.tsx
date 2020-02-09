/* global describe, it, expect */
import 'jest';
import * as React from 'react';
import { mount } from 'enzyme';
import { BannerContainer } from '../BannerContainer';
import { SeriesEntry } from '@crlife/Models';
import { BannerButton } from '../BannerButton';

const handleClick = () : void => {};

describe('BannerContainer', () => {
    it('should render each navigation item based on content', () => {
        const entry: SeriesEntry = {
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
            subtitle: '',
            next: '1231',
            prev: '1229'
          };

          const wrapper = mount(
              <BannerContainer 
                onClick={handleClick}
                onTextsize={handleClick}
                entry={entry} />
          );

          const buttons = wrapper.find(BannerButton);

          expect(buttons).toHaveLength(5);

          expect(buttons.at(0).text()).toEqual('< Dec 29');
          expect(buttons.at(1).text()).toEqual('Devotional');
          expect(buttons.at(2).text()).toEqual('1Gen1');
          expect(buttons.at(3).text()).toEqual('1Matt2');
          expect(buttons.at(4).text()).toEqual('Dec 31 >');
    })
})