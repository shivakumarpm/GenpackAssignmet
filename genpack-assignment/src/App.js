import React, { Component } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from '@uifabric/icons';
import GenpackDropdown from './components/GenpackDropdown';
import './App.css';

export default class App extends Component {
  componentWillMount() {
    initializeIcons();
  }
render() {
  return (
    <Fabric>
      <GenpackDropdown />
    </Fabric>
  )
  
  }
}
