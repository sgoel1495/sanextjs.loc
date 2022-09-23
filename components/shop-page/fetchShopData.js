import {apiCall} from "../../helpers/apiCall";
import _ from "lodash";

export default async function fetchShopData(category) {
    let gotData = false;
    const callObject = await apiCall("getProducts", process.env.API_TOKEN,
        {category: category, limit: 18, skip: 0}
    )
    if (callObject.hasOwnProperty("response") && callObject.response.hasOwnProperty("data")) {
        if (callObject
            && callObject.response
            && callObject.response.data
        )
            gotData = true;
    }
    return (gotData) ? callObject.response : null
}

export function fetchQueryData(props, data, setLoading, query, setQuery, setVisibleData, setTotal,setPage) {
    const filterCategories = Object.keys(props.filterCheckboxes)

    //case before init
    if (filterCategories.length === 0)
        return

    // create query object
    const queryObject = {
        category: props.category.replace("tailored-",""),
        skip: 0,
        limit: 18,
        filter_by: {}
    }
    for (let x = 0; x < filterCategories.length; x++) {
        if (props.filterCheckboxes[filterCategories[x]].length > 0) {
            queryObject.filter_by[filterCategories[x]] = props.filterCheckboxes[filterCategories[x]]
        }
    }
    if (props.sortBy) {
        queryObject['sorted_by'] = props.sortBy;
    }

    //set original data is not filter or sort is applied
    if (queryObject['sorted_by'] === "" && Object.keys(queryObject.filter_by).length === 0) {
        fetchQueryData(data.data)
        return
    }

    //if no new query is added, return
    if (_.isEqual(query, queryObject)) {
        return
    }

    // get new products
    setLoading(true)
    apiCall("getProducts", props.appConfig.apiToken, queryObject)
        .then(resp => {
            if (resp.response && resp.response.data) {
                setVisibleData([...resp.response.data.filter(item => item.is_visible)])
                setQuery(queryObject)
                setTotal(resp.response.total_products_exist)
                setPage(1)
            }
        })
        .catch(e => console.log(e.message))
        .finally(() => {
            setLoading(false)
        })
}