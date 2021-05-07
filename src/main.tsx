import { h, render } from 'preact';

import { App } from './app';

import '@Styles/global.css';

const entryPoint = document.getElementById('app');

if (entryPoint) render(<App />, entryPoint);
