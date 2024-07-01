import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import EmptyPage from './page';

describe('Tests on <EmptyPage />', () => {
  test('Should render on screen', () => {
    const { container } = render(<EmptyPage />);
  
    const headingText = "Your cart is empty";
    const linkText = "back";
  
    const heading = container.querySelector('h1');
    const link = container.querySelector('a');
  
    expect(heading?.innerHTML).toBe(headingText);
    expect(link?.innerHTML).toBe(linkText);
  });
});
