/**
 *
 * @param word contains the dictionary word to look up
 * @returns {null}
 */
export const apiDictionary = (word)=>{
    const apiServer = "http://103.90.241.54:2023/api/v1";
    let returnValue = null;

    switch (word){
        case "getToken":
            returnValue = {
                method: "GET",
                url: apiServer + "/get_authenticate_token",
                query: [],
                body: {}
            }
            break;

        case "getProducts":
            break;

        default:
            break;
    }

    return returnValue;
}

