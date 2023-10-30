import React from "react";
import MainLayout from "../../components/MainLayout";
import ListPosts from "./container/ListPosts";

const PostsPage = () => {
    return (
        <MainLayout>
            <ListPosts numOfPost={100} />
        </MainLayout>
    );
};

export default PostsPage