import React from "react";
import Subreddit from "./Subreddit";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { storeConfig } from "../../app/store";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";

describe(Subreddit, () => {
    let store;

    beforeEach(() => {
        store = configureStore(storeConfig);
    });

    it('should render correctly with no icon url', () => {
        const mockSubreddit = {
            name: 'r/javascript',
            icon: ''
        }

        render(
            <Provider store={store}>
                <Subreddit name={mockSubreddit.name} icon={mockSubreddit.icon} />
            </Provider>
        );

        expect(screen.getByTestId('default-SubredditIcon')).toBeInTheDocument();
        expect(screen.getByText(mockSubreddit.name)).toBeInTheDocument();
    });

    it('should render correctly with icon url', () => {
        const mockSubreddit = {
            name: 'r/javascript',
            icon: 'https://b.thumbs.redditmedia.com/LSHrisQApf1H5F8nWShTx3_KjTOMc3R_ss3kx3XAyXQ.png'
        }

        render(
            <Provider store={store}>
                <Subreddit name={mockSubreddit.name} icon={mockSubreddit.icon} />
            </Provider>
        );

        expect(screen.getByAltText('subreddit icon').src).toEqual(mockSubreddit.icon);
        expect(screen.getByText(mockSubreddit.name)).toBeInTheDocument();
    });

    it('should load posts into redux store when clicked', async () => {
        const mockSubreddit = {
            name: 'r/javascript',
            icon: 'https://b.thumbs.redditmedia.com/LSHrisQApf1H5F8nWShTx3_KjTOMc3R_ss3kx3XAyXQ.png'
        }
        const mockResponse = {
            data: {
                children: [
                    {data: {
                        title: 'Post 1', 
                        selftext: 'text 1', 
                        author: 'author 1',
                        ups: 1,
                        id: "1"
                    }},
                    {data: {
                        title: 'Post 2', 
                        selftext: 'text 2', 
                        author: 'author 2',
                        ups: 2,
                        id: "2"
                    }},
                    {data: {
                        title: 'Post 3', 
                        selftext: 'text 3', 
                        author: 'author 3',
                        ups: 3,
                        id: "3"
                    }}
                ]
            }
        };
        const expectedState = [
            {data: {
                title: 'Post 1', 
                selftext: 'text 1', 
                author: 'author 1',
                ups: 1,
                id: "1"
            }},
            {data: {
                title: 'Post 2', 
                selftext: 'text 2', 
                author: 'author 2',
                ups: 2,
                id: "2"
            }},
            {data: {
                title: 'Post 3', 
                selftext: 'text 3', 
                author: 'author 3',
                ups: 3,
                id: "3"
            }}
        ];
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve(mockResponse)
        });

        render(
            <Provider store={store}>
                <Subreddit name={mockSubreddit.name} icon={mockSubreddit.icon} />
            </Provider>
        );
        const subredditButton = screen.getByTestId('Subreddit');
        userEvent.click(subredditButton);

        await waitFor(() => expect(store.getState().post.posts).toEqual(expectedState));
    });
});