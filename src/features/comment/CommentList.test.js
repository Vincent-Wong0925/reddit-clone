import React from "react";
import CommentList from "./CommentList";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { storeConfig } from "../../app/store";

describe(CommentList, () => {
    let store;
    beforeEach(() => {
        store = configureStore(storeConfig);
    });

    it('should render comments correctly', async () => {
        const mockComments = [
            {
                kind: 't1',
                data: {
                    author: 'mockAuthor1',
                    body: 'mock body 1',
                    id: '1'
                }
            },
            {
                kind: 't1',
                data: {
                    author: 'mockAuthor2',
                    body: 'mock body 2',
                    id: '2'
                }
            },
            {
                kind: 't1',
                data: {
                    author: 'mockAuthor3',
                    body: 'mock body 3',
                    id: '3'
                }
            }
        ];

        render(
            <Provider store={store}>
                <CommentList id='1' comments={mockComments} nested={false} />
            </Provider>
        );

        await waitFor(() => expect(screen.queryAllByTestId('Comment').length).toBe(3));
    });

    it('should have the correct className', () => {
        const mockComments = [
            {
                kind: 't1',
                data: {
                    author: 'mockAuthor1',
                    body: 'mock body 1',
                    id: '1'
                }
            },
            {
                kind: 't1',
                data: {
                    author: 'mockAuthor2',
                    body: 'mock body 2',
                    id: '2'
                }
            },
            {
                kind: 't1',
                data: {
                    author: 'mockAuthor3',
                    body: 'mock body 3',
                    id: '3'
                }
            }
        ];

        render(
            <Provider store={store}>
                <CommentList nested={true} comments={mockComments} id="1" />
                <CommentList nested={false} comments={mockComments} id="2" />
            </Provider>
        );

        const list = screen.getAllByTestId("CommentList");
        expect(list[0]).toHaveClass("nested CommentList");
        expect(list[1]).toHaveClass("CommentList");
    });
});