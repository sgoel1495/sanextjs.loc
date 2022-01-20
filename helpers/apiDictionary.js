/**
 *
 * @params word is the api dictionary word, apiToken is required to make calls, queryObject has special params as may be required
 * @returns {null}
 */
export const apiDictionary = (word,apiToken="",queryObject={})=>{
    const apiServer = "http://103.90.241.54:2023/api/v1";
    let url = apiServer;

    const headers= {
        'Accept': 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8'
    };
    let body = null;
    const getFetcher =  {
        method: "GET",
        headers: headers
    };
    const postFetcher =  {
        method: "POST",
        headers: headers,
        body: ""
    };
    let finalFetcher = null;

    switch (word){
        case "getToken":
            url += "/get_authenticate_token";
            finalFetcher = {...getFetcher};
            break;

        case "getProducts":
            url += "/get_products";
            body = {
                product: {
                    token: apiToken,
                    category: queryObject.category,
                    skip: queryObject.skip || 0,
                    limit: queryObject.limit || 10
                }
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "getLooksData":
            url += "/get_looks_data";
            body = {
                token: apiToken,
                look_id: queryObject.look_id,
                skip: queryObject.skip || 0,
                limit: queryObject.limit || 10
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        case "exploreNewArrivals":
            url += "/explore_new_arrivals";
            body = {
                token: apiToken
            };
            postFetcher.body = JSON.stringify(body);
            finalFetcher = {...postFetcher}
            break;

        default:
            url=null;
            break;
    }

    if(url==null || finalFetcher==null)
        return null;
    else
        return {
            url: url,
            fetcher: finalFetcher
        };
}

