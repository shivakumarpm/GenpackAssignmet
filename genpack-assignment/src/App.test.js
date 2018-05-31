import React from 'react';
import ReactDOM from 'react-dom';
import GenpackDropdown from './components/GenpackDropdown';

let dropDwon = new GenpackDropdown();

describe("Genpack Assingment Testing",function(){

  it('Sample testing...', () => {
    dropDwon.setUserId().toBeEquallTo(true);
  });
});
