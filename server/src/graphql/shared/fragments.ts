import { gql } from 'apollo-server-express';

export const BaseErrorFragment = gql`
    fragment BaseError on BaseError {
        path
        message
    }
`;

export const FolderFragments = {
    withChildren: gql`
        fragment FolderWithChildren on Folder {
            id
            parentId
            depth
            nae
            children {
                id
                name
            }
        }
    `,
    withBookmarks: gql`
        fragment FolderWithBookmarks on Folder {
            id
            parentId
            depth
            name
            bookmarks {
                id
                title
                url
                description
            }
        }
    `,
    base: gql`
        fragment Folder on Folder {
            id
            parentId
            depth
            name
        }
    `,
};

export const BookmarkFragments = {
    base: gql`
        fragment Bookmark on Bookmark {
            id
            title
            url
            description
            createdDate
            folderId
        }
    `,
};

const Fragments = {
    BaseErrorFragment,
};
export default Fragments;
