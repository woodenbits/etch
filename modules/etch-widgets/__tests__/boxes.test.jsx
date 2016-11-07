/* @flow */

import assert from 'assert';
import React from 'react';
import { describe, it } from 'mocha';
import { shallow } from 'enzyme';

import { Box, HBox, VBox } from '../boxes';

describe('HBox', () => {
  it('passes through props w/ direction to Box', () => {
    const wrapper = shallow(<HBox id="test" />);
    assert(wrapper.contains(<Box id="test" direction="horizontal" />));
  });
});

describe('VBox', () => {
  it('passes through props w/ direction to Box', () => {
    const wrapper = shallow(<VBox id="test" />);
    assert(wrapper.contains(<Box id="test" direction="vertical" />));
  });
});

describe('Box', () => {
  it('passes through props except direction', () => {
    const wrapper = shallow(<Box id="test" direction="horizontal" />);
    assert(wrapper.containsMatchingElement(<div id="test" />));
  });

  it('passes through className', () => {
    const wrapper = shallow(<Box className="test-class" direction="horizontal" />);
    assert(wrapper.find('div').hasClass('test-class'));
  });
});
