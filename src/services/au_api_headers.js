export const au_api_headers = {
    "Authorization": "Bearer " + process.env.REACT_APP_API_TOKEN +"",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Content-Language": "en",
    "X-AppApiToken":  + process.env.REACT_APP_API_TOKEN,
    "X-AppType": "docs",
};