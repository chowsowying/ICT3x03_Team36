import React from "react";
import MainLayout from "../../components/MainLayout";
import ListPosts from "./container/ListPosts";

const PostsPage = () => {
    return (
        <MainLayout>
            <ListPosts />
        </MainLayout>
    );
};

export default PostsPage