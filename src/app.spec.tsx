import { render } from '@testing-library/preact';
import { h } from 'preact';

import { App } from './app';

describe('Initial Test', () => {
  test('renders successfully', () => {
    const wrapper = render(<App />);
    wrapper.debug();

    expect(wrapper.container.textContent).toMatch('Hello There');
  });
});
