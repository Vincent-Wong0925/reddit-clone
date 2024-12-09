import React, { act } from "react";
import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import SubredditsList from "./SubredditsList";
import { storeConfig } from "../../app/store";
import { configureStore } from "@reduxjs/toolkit";

describe(SubredditsList, () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = configureStore(storeConfig);
    });

    it('should render subreddits from store', async () => {
        const mockResponse = {
            data: {
                children: [
                    {data: {
                        display_name_prefixed: 'r/react.js',
                        icon_img: '', 
                        id: 1
                    }},
                    {data: {
                        display_name_prefixed: 'r/javascript',
                        icon_img: '', 
                        id: 2
                    }},
                    {data: {
                        display_name_prefixed: 'r/redux',
                        icon_img: '', 
                        id: 3
                    }}
                ]
            }
        };
        const expectedState = [
            {data: {
                display_name_prefixed: 'r/react.js',
                icon_img: '', 
                id: 1
            }},
            {data: {
                display_name_prefixed: 'r/javascript',
                icon_img: '', 
                id: 2
            }},
            {data: {
                display_name_prefixed: 'r/redux',
                icon_img: '', 
                id: 3
            }}
        ];
        
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve(mockResponse)
        });
        
        render(
            <Provider store={store}>
                <SubredditsList showSubreddits={true} />
            </Provider>
        )

        await screen.findByText('r/react.js');

        expect(store.getState().subreddit.subredditsList).toEqual(expectedState);
        expect(screen.getByText('r/react.js')).toBeInTheDocument();
        expect(screen.getByText('r/javascript')).toBeInTheDocument();
        expect(screen.getByText('r/redux')).toBeInTheDocument();
    });

    it('should render null when there is no subreddits in store', async () => {
        const mockResponse = {
            data: {
                children: []
            }
        };
        const expectedState = [];

        global.fetch = jest.fn().mockResolvedValue({
            jest: Promise.resolve(mockResponse)
        });

        render(
            <Provider store={store}>
                <SubredditsList showSubreddits={true} />
            </Provider>
        );
        
        await waitFor(() => expect(store.getState().subreddit.subredditsList).toEqual(expectedState));
        await waitFor(() => expect(screen.queryByTestId('SubredditsList')).toBe(null));
    });

    it('should render Loading... when load action is pending', async () => {
        jest.useFakeTimers();
        const mockResponse = {
            data: {
                children: []
            }
        };

        global.fetch = jest.fn().mockResolvedValue(() => {
            setTimeout(() => ({
                jest: Promise.resolve(mockResponse)
            }), 3000);
        });

        render(
            <Provider store={store}>
                <SubredditsList showSubreddits={true} />
            </Provider>
        );
        screen.debug();
        console.log(store.getState().subreddit);
        expect(screen.queryByText('Loading...')).not.toBe(null);
        jest.useRealTimers();
    });
});