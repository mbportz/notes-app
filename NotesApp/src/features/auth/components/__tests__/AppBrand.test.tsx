import React from 'react';
import { render } from '@testing-library/react-native';
import AppBrand from '../AppBrand';

describe('AppBrand', () => {
  it('renders brand title', () => {
    const { getByText } = render(<AppBrand brandTitle="NotesApp" />);
    expect(getByText('NotesApp')).toBeTruthy();
  });

  it('renders tagline when provided', () => {
    const { getByText } = render(<AppBrand brandTitle="NotesApp" tagline="Write. Save. Sync." />);
    expect(getByText('Write. Save. Sync.')).toBeTruthy();
  });

  it('omits tagline when not provided', () => {
    const { queryByText } = render(<AppBrand brandTitle="NotesApp" />);
    expect(queryByText('Write. Save. Sync.')).toBeNull();
  });

  it('passes custom gradient props', () => {
    const colors = ['#111111', '#222222'];
    const start = { x: 0.2, y: 0.3 };
    const end = { x: 0.8, y: 0.9 };

    const { getByTestId } = render(
      <AppBrand brandTitle="NotesApp" colors={colors} start={start} end={end} />,
    );

    const gradient = getByTestId('linear-gradient').props;
    expect(gradient.colors).toEqual(colors);
    expect(gradient.start).toEqual(start);
    expect(gradient.end).toEqual(end);
  });

  it('uses default gradient props when not provided', () => {
    const { getByTestId } = render(<AppBrand brandTitle="NotesApp" />);
    const gradient = getByTestId('linear-gradient').props;
    expect(gradient.colors).toEqual(['#853ced', '#d046ee']);
    expect(gradient.start).toEqual({ x: 0, y: 0 });
    expect(gradient.end).toEqual({ x: 1, y: 0 });
  });
});
