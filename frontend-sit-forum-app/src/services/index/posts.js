import axios from "axios";

export const getAllPost = async (searchKeyword = "", page = 1, limit = 5) => {
    try {
        const { data, headers } = await axios.get(
            `http://localhost:5000/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
        );
    
        console.log('Response Headers:', headers['x-totalpagecount']);
        console.log('Response Headers:', headers['x-totalcount']);
        console.log('Response Headers:', headers['x-page']);
        return { data, headers };
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};
 
// export const getAllPost = async (searchKeyword = "", page = 1, limit = 5) => {
//     try {
//         const response = await axios.get(`http://localhost:5000/api/posts`, {
//             params: {
//                 searchKeyword,
//                 page,
//                 limit
//             }
//         });

//         console.log('Axios Response:', response);
//         console.log('x-totalpagecount:', response.headers['x-totalpagecount']);

//         // Rest of your code to process the response and return the necessary data

//         return response.data; // Return the data from the response
//     } catch (error) {
//         if (error.response && error.response.data.message)
//             throw new Error(error.response.data.message);
//         throw new Error(error.message);
//     }
// };


//single post
export const getSinglePost = async ({ slug }) => {
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
