export const api_post_headers = {
    "Authorization": "Bearer " + process.env.REACT_APP_API_TOKEN +"",
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
    "Content-Language": "en",
    "X-AppApiToken":  + process.env.REACT_APP_API_TOKEN,
    "X-AppType": "docs",
};