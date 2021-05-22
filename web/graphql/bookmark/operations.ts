import { BookmarkFragments, ErrorFragments } from '@graphql/fragments';
import gql from 'graphql-tag';

export const SOFT_DELETE_BOOKMARK = gql`
    mutation softDeleteBookmark($id: Int!) {
        softDeleteBookmark(id: $id) {
            ...Bookmark
            ...BaseError
        }
    }

    ${ErrorFragments.base}
    ${BookmarkFragments.bookmark}
`;

export const HARD_DELETE_BOOKMARK = gql`
    mutation hardDeleteBookmark($id: Int!) {
        hardDeleteBookmark(id: $id) {
            ...Bookmark
            ...BaseError
        }
    }

    ${ErrorFragments.base}
    ${BookmarkFragments.bookmark}
`;

export const HARD_DELETE_BOOKMARKS = gql`
    mutation hardDeleteBookmarks($ids: [Int!]!) {
        hardDeleteBookmarks(ids: $ids) {
            ...Bookmarks
            ...BaseError
        }
    }

    ${ErrorFragments.base}
    ${BookmarkFragments.bookmark}
`;

export const DELTED_BOOMARKS = gql`
    query deletedBookmarks {
        bookmarks(deleted: true) {
            ...Bookmarks
            ...BaseError
        }
    }
    ${ErrorFragments.base}
    ${BookmarkFragments.bookmarks}
`;

export const MOVE_BOOKMARKS_MUATION = gql`
    mutation moveBookmark($id: Int!, $folderId: Int!) {
        updateBookmark(data: { id: $id, folderId: $folderId }) {
            ...Bookmark
        }
    }

    ${ErrorFragments.base}
    ${BookmarkFragments.bookmark}
`;

export const ALL_BOOKMARKS_QUERY = gql`
    query allBookmarks {
        bookmarks(deleted: false) {
            ...Bookmarks
        }
    }

    ${BookmarkFragments.bookmarks}
`;
