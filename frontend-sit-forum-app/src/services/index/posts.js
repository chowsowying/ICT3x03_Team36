import axios from "axios";

export const getAllPost = async () => {
    try {
        const { data } = await axios.get('http://localhost:5000/api/posts');
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

//single post
export const getSinglePost = async ({slug}) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/api/posts/${slug}`);

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};
