/*
@TODO: Sizes are hardcoded for now
 */
export default function returnSizes(category){
    if(["sweaters","scarves","jewellery"].includes(category))
        return ["F"];
    else
        return ["XS", "S", "M", "L", "XL", "XXL", "T"]
}