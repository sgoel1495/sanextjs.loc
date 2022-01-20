/**
 *
 * @param word contains the dictionary word to look up
 * @returns {null}
 */
export const apiDictionary = (word,apiToken="")=>{
    const apiServer = "http://103.90.241.54:2023/api/v1";
    let returnValue = null;
    const headers= {
        'Accept': 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8'
    };
    const query = [];
    const body = {};
    const getFetcher =  {
        method: "GET",
        headers: headers
    };
    const postFetcher =  {
        method: "POST",
        headers: headers,
        body: ""
    };

    switch (word){
        case "getToken":
            returnValue = {
                url: "/get_authenticate_token",
                fetcher: getFetcher
            }
            break;

        case "getProducts":
            break;

        default:
            break;
    }

    returnValue.url = apiServer + returnValue.url;
    return returnValue;
}

