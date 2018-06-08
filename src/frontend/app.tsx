import React from 'react';
import * as ReactDom from 'react-dom';
import { HomeComponent } from './home/home.component';

ReactDom.render(<HomeComponent message={'React with Typescript'} />, document.getElementById('main'));

