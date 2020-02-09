/* global describe, it, expect */
import 'jest';
import { DisplayName } from '../NavigationDisplayNameHelper';

describe('NavigationDisplayNameHelper', () => {
  it('Should create readable text from numerical ref', () => {
    const inputExpect = [
      {
        input: '0101',
        expect: 'Jan 1'
      },
      {
        input: '0208',
        expect: 'Feb 8'
      },
      {
        input: '0321',
        expect: 'Mar 21'
      },
      {
        input: '0415',
        expect: 'Apr 15'
      },
      {
        input: '0518',
        expect: 'May 18'
      },
      {
        input: '0624',
        expect: 'Jun 24'
      },
      {
        input: '0731',
        expect: 'Jul 31'
      },
      {
        input: '0823',
        expect: 'Aug 23'
      },
      {
        input: '0930',
        expect: 'Sep 30'
      },
      {
        input: '1010',
        expect: 'Oct 10'
      },
      {
        input: '1111',
        expect: 'Nov 11'
      },
      {
        input: '1231',
        expect: 'Dec 31'
      }
    ];

    inputExpect.forEach(pair => {
      const result = DisplayName(pair.input);

      expect(result).toBe(pair.expect);
    });
  });
});
