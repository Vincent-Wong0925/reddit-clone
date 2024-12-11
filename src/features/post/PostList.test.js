import React from "react";
import PostList from "./PostList";
import { configureStore } from "@reduxjs/toolkit";
import { storeConfig } from "../../app/store";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

describe(PostList, () => {
    let store;

    beforeEach(() => {
        jest.clearAllMocks();
        store = configureStore(storeConfig);
    });

    it('should render posts from redux store', async () => {
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
                <PostList />
            </Provider>
        );

        await waitFor(() => expect(store.getState().post.posts).toEqual(expectedState));
        expect(screen.getByTestId(expectedState[0].data.id)).toBeInTheDocument();
        expect(screen.getByTestId(expectedState[1].data.id)).toBeInTheDocument();
        expect(screen.getByTestId(expectedState[2].data.id)).toBeInTheDocument();
    });

    it('should return null when no posts are in store', async () => {
        const mockResponse = {
            data: {
                children: []
            }
        };
        const expectedState = [];
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve(mockResponse)
        });

        render(
            <Provider store={store}>
                <PostList />
            </Provider>
        );

        await waitFor(() => expect(store.getState().post.posts).toEqual(expectedState));
        expect(screen.queryByTestId('PostList')).toBe(null);
    });

    it('should render Loading... post when fetching request is pending', () => {
        jest.useFakeTimers();
        const mockResponse = {
            data: {
                children: []
            }
        };
        const expectedState = [];
        global.fetch = jest.fn().mockResolvedValue(() => {
            setTimeout(() => (
                {
                    json: () => Promise.resolve(mockResponse)
                }
            ), 3000)
        });

        render(
            <Provider store={store}>
                <PostList />
            </Provider>
        );

        expect(screen.getByText('Loading post...')).toBeInTheDocument();
        jest.useRealTimers();
    });
});