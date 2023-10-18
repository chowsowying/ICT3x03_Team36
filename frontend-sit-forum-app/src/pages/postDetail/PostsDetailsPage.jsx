import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import BreadCrumbs from '../../components/BreadCrumbs';
import { images, stables } from "../../constants"
import { Link, useParams } from 'react-router-dom';
import { generateHTML } from '@tiptap/html';
import SuggestedPost from './container/SuggestedPost';
import CommentsContainer from '../../components/comments/CommentsContainer';
import SocialShareButtons from '../../components/SocialShareButtons';
import { useQuery } from '@tanstack/react-query';
import { getAllPost, getSinglePost } from '../../services/index/posts';
//body
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import Bold from '@tiptap/extension-bold'
//parse html
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';


const tagsData = [
    "IT",
    "Machine Learning",
    "C#",
    "Java",
    "MySql",
];

const PostsDetailsPage = () => {
    //get slug, slug must be name as the app.js 
    const { slug } = useParams();
    //for comment user id 
    const userState = useSelector((state => state.user));
    const [breadCrumbsData, setbreadCrumbsData] = useState([]);
    //create state 
    const [body, setBody] = useState(null);


    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: ['post', slug],
        onSuccess: (data) => {
            setbreadCrumbsData([
                { name: "Home", link: '/' },
                { name: "Post", link: '/post' },
                { name: "Post Title", link: `/post/${data.slug}` },
            ]);
            setBody(
                parse(generateHTML(data?.body, [
                    Document,
                    Paragraph,
                    Text,
                    Bold,
                    Italic,
                ]))
            );

        },
    });

    const { data: postsData } = useQuery({
        queryFn: () => getAllPost(),
        queryKey: ['posts'],
    });

    return (
        <MainLayout>
            <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                <article className="flex-1">
                    <BreadCrumbs data={breadCrumbsData} />
                    <img className="rounded-xl w-full"
                        src={data?.photo ? stables.UPLOAD_FOLDER_BASE_URL | data?.photo : images.samplePostImg}
                        alt={data?.title} />
                    <div className="mt-4 flex gap-3">
                        {data?.categories.map((category) => (
                            <Link to={`/post?category=${category.name}`} className="text-primary text-sm font-roboto inline-block md:text-base">
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
                        {data?.title}
                    </h1>
                    <div className="mt-4 prose prose-sm sm:prose-base">
                        {body}
                    </div>
                    <CommentsContainer
                        comments={data?.comments}
                        className="mt-10"
                        logginedUserId={userState?.userInfo?._id}
                        postSlug={slug}
                    />
                </article>
                <div>
                    <SuggestedPost header="Latest Posts"
                        posts={postsData?.data}
                        text={data?.text}
                        className="mt-8 lg:mt-0 lg:max-w-xs" />
                    <div className="mt-7">
                        <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                            Share on:
                        </h2>
                        <SocialShareButtons url={encodeURI("https://www.google.com/")} title={encodeURIComponent("share share")} />
                    </div>
                </div>

            </section>
        </MainLayout>
    );
};

export default PostsDetailsPage