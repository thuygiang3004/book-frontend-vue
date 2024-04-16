import axios from "axios";

export const getBooks = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/books');
    return res.data
}
export const getListings = async (currentPage) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/listings?page=${currentPage}`);
    return res.data
}

function getAuthToken() {
    return localStorage.getItem('token') || '';
}

export const getListingInfo = async (listingId) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/listing/${listingId}`);
    console.log(res)
    return res.data
}


export const postListing = async (listingData) => {
    const authToken = getAuthToken();
    return await axios.post('http://127.0.0.1:8000/api/listing', listingData, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    });
}

export const login = async (user) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/login', user)
        return res.data.user
    } catch (e) {
        throw e.response;
    }
}