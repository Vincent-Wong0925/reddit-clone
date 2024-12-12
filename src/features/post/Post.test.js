import React from 'react';
import Post from './Post';
import { render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { storeConfig } from '../../app/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

describe(Post, () => {
    let store;
    beforeEach(() => {
        store = configureStore(storeConfig);
        jest.clearAllMocks();
    });

    it('should render correctly without media', () => {
        const mockProps = {
            title: 'mock title', 
            selftext: 'mock selftext', 
            author: 'mock author',
            ups: '10',
            subreddit_name_prefixed: 'r/mockSubreddit',
            thumbnail: '',
            is_video: false,
            media: '',
            permalink: '',
            id: '1'
        }

        render(
            <Provider store={store}>
                <Post post={mockProps} />
            </Provider>
        );

        expect(screen.getByText(mockProps.subreddit_name_prefixed)).toBeInTheDocument();
        expect(screen.getByText(`u/${mockProps.author}`)).toBeInTheDocument();
        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.selftext)).toBeInTheDocument();
        expect(screen.getByTestId('up vote-button')).toBeInTheDocument();
        expect(screen.getByTestId('down vote-button')).toBeInTheDocument();
        expect(screen.getByText(mockProps.ups)).toBeInTheDocument();
        expect(screen.getByTestId('comments button')).toBeInTheDocument();
        expect(screen.queryByTestId('reddit-video')).not.toBeInTheDocument();
        expect(screen.queryByAltText('thumbnail')).not.toBeInTheDocument();
    });

    it('should render correctly with image', () => {
        const mockProps = {
            title: 'mock title', 
            selftext: 'mock selftext', 
            author: 'mock author',
            ups: '10',
            subreddit_name_prefixed: 'r/mockSubreddit',
            thumbnail: 'http://mock-thumbnail.jpg',
            is_video: false,
            media: '',
            permalink: '',
            id: '1'
        }

        render(
            <Provider store={store}>
                <Post post={mockProps} />
            </Provider>
        );

        expect(screen.getByAltText('thumbnail')).toHaveAttribute('src', mockProps.thumbnail);
    });

    it('should not render image when thumbnail contain default keywords', () => {
        const mockProps1 = {
            title: 'mock title', 
            selftext: 'mock selftext', 
            author: 'mock author',
            ups: '10',
            subreddit_name_prefixed: 'r/mockSubreddit',
            thumbnail: 'self',
            is_video: false,
            media: '',
            permalink: '',
            id: '1'
        }
        const mockProps2 = {
            title: 'mock title', 
            selftext: 'mock selftext', 
            author: 'mock author',
            ups: '10',
            subreddit_name_prefixed: 'r/mockSubreddit',
            thumbnail: 'default',
            is_video: false,
            media: '',
            permalink: '',
            id: '2'
        }
        const mockProps3 = {
            title: 'mock title', 
            selftext: 'mock selftext', 
            author: 'mock author',
            ups: '10',
            subreddit_name_prefixed: 'r/mockSubreddit',
            thumbnail: 'nsfw',
            is_video: false,
            media: '',
            permalink: '',
            id: '3'
        }

        render(
            <Provider store={store}>
                <Post post={mockProps1} />
                <Post post={mockProps2} />
                <Post post={mockProps3} />
            </Provider>
        );

        expect(screen.queryAllByAltText('thumbnail').length).toBe(0);
    });

    it('should render video correctly', () => {
        const mockProps = {
            title: 'mock title', 
            selftext: 'mock selftext', 
            author: 'mock author',
            ups: '10',
            subreddit_name_prefixed: 'r/mockSubreddit',
            thumbnail: '',
            is_video: true,
            media: {
                reddit_video: {
                    fallback_url: 'http://mock-video'
                }
            },
            permalink: '',
            id: '1'
        }

        render(
            <Provider store={store}>
                <Post post={mockProps} />
            </Provider>
        );

        expect(screen.getByTestId('reddit-video')).toBeInTheDocument();
        expect(screen.getByTestId('reddit-video-source')).toHaveAttribute('src', mockProps.media.reddit_video.fallback_url);
    });

    it('should change number of up-votes when vote buttons are clicked', async () => {
        const mockProps = {
            title: 'mock title', 
            selftext: 'mock selftext', 
            author: 'mock author',
            ups: 10,
            subreddit_name_prefixed: 'r/mockSubreddit',
            thumbnail: '',
            is_video: false,
            media: null,
            permalink: '',
            id: '1'
        }

        render(
            <Provider store={store}>
                <Post post={mockProps} />
            </Provider>
        );
        const upButton = screen.getByTestId('up vote-button');
        const downButton = screen.getByTestId('down vote-button');

        expect(screen.getByTestId('upVotes')).toHaveTextContent(mockProps.ups);
        userEvent.click(upButton);
        await waitFor(() => expect(screen.getByTestId('upVotes')).toHaveTextContent(mockProps.ups + 1));
        userEvent.click(upButton);
        await waitFor(() => expect(screen.getByTestId('upVotes')).toHaveTextContent(mockProps.ups));
        userEvent.click(downButton);
        await waitFor(() => expect(screen.getByTestId('upVotes')).toHaveTextContent(mockProps.ups -1));
        userEvent.click(downButton);
        await waitFor(() => expect(screen.getByTestId('upVotes')).toHaveTextContent(mockProps.ups));
    });

    it('should render comments when comment button is clicked', async () => {
        const mockProps = {
            title: 'mock title', 
            selftext: 'mock selftext', 
            author: 'mock author',
            ups: 10,
            subreddit_name_prefixed: 'r/mockSubreddit',
            thumbnail: '',
            is_video: false,
            media: null,
            permalink: 'r/mockSubreddit/comments/',
            id: '1'
        }
        const mockResponse = [
            {},
            {data: {
                children: []
            }}
        ]
        const expectedState = {
            '1': []
        }
        

        render(
            <Provider store={store}>
                <Post post={mockProps} />
            </Provider>
        );
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve(mockResponse)
        });
        const commentButton = screen.getByTestId('comments button');

        expect(screen.queryByTestId('CommentList')).not.toBeInTheDocument();
        userEvent.click(commentButton);
        await waitFor(() => expect(store.getState));
        await waitFor(() => expect(screen.queryByTestId('CommentList')).toBeInTheDocument());
    });

    it('should render Loading Comments... when comment is pending', async () => {
        const mockProps = {
            title: 'mock title', 
            selftext: 'mock selftext', 
            author: 'mock author',
            ups: 10,
            subreddit_name_prefixed: 'r/mockSubreddit',
            thumbnail: '',
            is_video: false,
            media: null,
            permalink: 'r/mockSubreddit/comments/',
            id: '1'
        }
        const mockResponse = [
            {},
            {data: {
                children: []
            }}
        ]
        

        render(
            <Provider store={store}>
                <Post post={mockProps} />
            </Provider>
        );
        global.fetch = jest.fn().mockResolvedValue(() => 
            setTimeout(() => (
                {
                    json: () => Promise.resolve(mockResponse)
                }
            ),3000)
        );
        const commentButton = screen.getByTestId('comments button');

        userEvent.click(commentButton);
        await waitFor(() => expect(screen.queryByText('Loading Comments...')).toBeInTheDocument());
    });
});