import React from 'react';
import { createPost } from '../../../../services/index/posts';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
    

const NewPost = () => {
  const navigate = useNavigate();
  const userState = useSelector(state => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const caption = e.target.caption.value;
    let tags = e.target.tag.value;
    tags = tags.split(";");
    const content = e.target.content.value;
    const token = userState.userInfo.token;
    const response = await createPost({ token, title, caption, tags, content});
    navigate(`/post/${response.slug}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1 className='text-2xl font-semibold'>Create New Post</h1>
      </div>
      <div className="bg-white rounded-lg shadow sm:max-w-2xl sm:w-full sm:mx-auto sm:overflow-hidden">
        <div className="px-4 py-8 sm:px-10">
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm leading-5">
              <span className="px-2 text-gray-500 bg-white">New Post</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="w-full space-y-6">
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="caption"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Caption"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="tag"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="tag1;tag2;tag3;tag4..."
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="relative">
                  <textarea
                    name="content"
                    rows="10"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Content"
                  ></textarea>
                </div>
              </div>
              <div></div>
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    Submit
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default NewPost