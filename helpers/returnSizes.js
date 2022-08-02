export default function returnSizes(prod) {
    if (["sweaters", "scarves", "belts", "masks", "jewellery"].includes(prod.category))
        return Object.keys(prod.inventory).filter((key) => prod.inventory[key] > 0).map((item) => item.toUpperCase());
    else {
        let sizes = JSON.parse(prod.size_avail.replace(/=>/g, ":"))
        let sizeSymbols = sizes.filter((item) => item["AvailQty"] > 0).map((item) => item[Object.keys(sizes[0])[0]].toUpperCase())
        sizeSymbols.push("T")
        return sizeSymbols;
    }
}