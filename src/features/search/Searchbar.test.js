import { render, screen } from "@testing-library/react";
import Searchbar from "./Searchbar";
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

const store = configureStore({
    reducer: {}
});

describe(Searchbar, () => {
    it('should display website icon and name', () => {
        render(
            <Provider store={store}>
                <Searchbar toggleSubreddits={() => {}} />
            </Provider>
        );
        const icon = screen.getByTitle('reddit-icon');
        const name = screen.getByText((_, element) => {
            return element.textContent === 'Reddit Clone';
        });

        expect(icon).toBeInTheDocument();
        expect(name).toBeInTheDocument();
    });

    it('should change value when user types', async () => {
        render(
            <Provider store={store}>
                <Searchbar toggleSubreddits={() => {}} />
            </Provider>
        );
        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'Here is a search');

        expect(input).toHaveValue('Here is a search');
    });

    it('should clear input when search button is clicked', async () => {
        render(
            <Provider store={store}>
                <Searchbar toggleSubreddits={() => {}} />
            </Provider>
        );
        const input = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button', { name: /search button/i });

        await userEvent.type(input, 'Here is a search');
        expect(input).toHaveValue('Here is a search');
        await userEvent.click(searchButton);

        expect(input).toHaveValue('');
    });
});