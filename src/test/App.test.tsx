import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Header from '../components/Header/Header';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from '../components/Search/Search';
import { store } from '../store/store';

describe('Search test', () => {
    test('button should be disabled when input is empty', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Search />
                </Router>
            </Provider>
        );

        const input = screen.getByPlaceholderText('Enter user login');
        const button = screen.getByRole('button', { name: 'Search' });

        expect(button.hasAttribute('disabled')).toBe(true);

        fireEvent.input(input, { target: { value: 'test text' } });

        expect(button.hasAttribute('disabled')).toBe(false);
    });

    test('update input on change', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Search />
                </Router>
            </Provider>
        );

        const inputElement = screen.getByPlaceholderText(
            'Enter user login'
        ) as HTMLInputElement;

        fireEvent.change(inputElement, { target: { value: 'userlogin' } });

        expect(inputElement.value).toBe('userlogin');
    });

    test('updates sort state on select change', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Search />
                </Router>
            </Provider>
        );

        const selectElement = screen.getByTestId('sort') as HTMLSelectElement;

        fireEvent.change(selectElement, {
            target: { value: 'repositories-asc' },
        });

        expect(selectElement.value).toBe('repositories-asc');
    });
});

describe('Header test', () => {
    test('renders Header component with theme toggle button', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Header />
                </Router>
            </Provider>
        );

        expect(screen.getByText(/GitHub Users Search/i)).toBeDefined();

        expect(screen.getByTestId('theme-btn'));
    });
});
