import React from "react";
import Comment from "./Comment";
import { configureStore } from "@reduxjs/toolkit";
import { storeConfig } from "../../app/store";
import { queryByRole, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

describe(Comment, () => {
    let store;
    beforeEach(() => {
        store = configureStore(storeConfig);
    });

    it('should render author and body correctly', () => {
        const mockComment = {
            kind: 't1',
            data: {
                author: 'mockAuthor',
                body: 'mock body',
                id: '1'
            }
        }

        render(
            <Provider store={store}>
                <Comment comment={mockComment} id='1' />
            </Provider>
        );

        expect(screen.getByText('u/mockAuthor')).toBeInTheDocument();
        expect(screen.getByText('mock body')).toBeInTheDocument();
    });

    it('should render replies button when there are replies', () => {
        const mockComment = {
            kind: 't1',
            data: {
                author: 'mockAuthor',
                body: 'mock body',
                id: '1',
                replies: {
                    data: {
                        children: [
                            {
                                kind: 't1',
                                data: {
                                    author: 'mockAuthor',
                                    body: 'mock body',
                                    id: '1'
                                }
                            }
                        ]
                    }
                }
            }
        }

        render(
            <Provider store={store}>
                <Comment comment={mockComment} />
            </Provider>
        );

        expect(screen.getByRole('button',{name:'Replies'})).toBeInTheDocument();
    });

    it('should render replies when replies button is clicked', async () => {
        const mockComment = {
            kind: 't1',
            data: {
                author: 'mockAuthor',
                body: 'mock body',
                id: '1',
                replies: {
                    data: {
                        children: [
                            {
                                kind: 't1',
                                data: {
                                    author: 'mockAuthor',
                                    body: 'mock body',
                                    id: '1'
                                }
                            }
                        ]
                    }
                }
            }
        }

        render(
            <Provider store={store}>
                <Comment comment={mockComment} />
            </Provider>
        );
        const button = screen.getByRole('button', {name:'Replies'});

        expect(screen.queryByTestId("CommentList")).not.toBeInTheDocument();
        userEvent.click(button);
        await waitFor(() => expect(screen.queryByTestId("CommentList")).toBeInTheDocument());
    });

    it('should return null when kind is not t1', () => {
        const mockComment = {
            kind: 'mock',
            data: {
                author: 'mockAuthor',
                body: 'mock body',
                id: '1'
            }
        }

        render(
            <Provider store={store}>
                <Comment comment={mockComment} />
            </Provider>
        );

        expect(screen.queryByTestId('Comment')).not.toBeInTheDocument();
    });

    it('should not render replies button when no replies have kind t1', () => {
        const mockComment = {
            kind: 't1',
            data: {
                author: 'mockAuthor',
                body: 'mock body',
                id: '1',
                replies: {
                    data: {
                        children: [
                            {
                                kind: 'mock',
                                data: {
                                    author: 'mockAuthor',
                                    body: 'mock body',
                                    id: '1'
                                }
                            }
                        ]
                    }
                }
            }
        }

        render(
            <Provider store={store}>
                <Comment comment={mockComment} />
            </Provider>
        );

        expect(screen.queryByRole('button', {name:'Replies'})).not.toBeInTheDocument();
    });
});