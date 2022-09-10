export default function returnSizes(prod) {
    let sizeSymbols = []
    if (["sweaters", "scarves", "belts", "masks", "jewellery"].includes(prod.category)) {
        sizeSymbols = Object.keys(prod.inventory).filter((key) => prod.inventory[key] > 0).map((item) => item.toUpperCase());
        if (["sweaters", "belts"].includes(prod.category)) {
            let index = sizeSymbols.indexOf("F")
            if (index > -1) {
                sizeSymbols.splice(index, 1)
            }
        } else if (["scarves", "masks", "jewellery"].includes(prod.category)) {
            sizeSymbols = ["F"]
        }

    } else {
        if (prod.size_avail) {
            if (prod.is_sale) {
                sizeSymbols = Object.keys(prod.inventory).filter((key) => prod.inventory[key] > 0).map((item) => item.toUpperCase());
                let index = sizeSymbols.indexOf("F")
                if (index > -1) {
                    sizeSymbols.splice(index, 1)
                }
            } else {
                let sizes = JSON.parse(prod.size_avail.replace(/=>/g, ":"))
                sizeSymbols = sizes.filter((item) => item["AvailQty"] > 0).map((item) => item[Object.keys(sizes[0])[0]].toUpperCase())
                sizeSymbols.push("T")
            }
        }
    }
    return sizeSymbols
}

export function isTailored(prod) {
    return !["sweaters", "scarves", "belts", "masks", "jewellery"].includes(prod.category)
}

function checkInventoryWithoutF(prod){
    let inventory = Object.keys(prod.inventory).filter(key => prod.inventory[key] > 0)
    let index = inventory.indexOf("f")
    if (index > -1) {
        inventory.splice(index, 1)
    }
    return inventory.length === 0;

}

export function isInStock(prod) {
    if (prod.in_stock !== "true") {
        return false
    }
    if (["scarves", "masks", "jewellery"].includes(prod.category)) {
        if (!prod.inventory["f"]) {
            return false
        }
    } else if (["sweaters", "belts"].includes(prod.category)) {
       if(checkInventoryWithoutF(prod)){
           return false
       }
    } else {
        if (prod.is_sale) {
            if(checkInventoryWithoutF(prod)){
                return false
            }
        } else if (!prod.size_avail) {
            return false
        } else {
            let sizes = JSON.parse(prod.size_avail.replace(/=>/g, ":"))
            if (sizes.filter((item) => item["AvailQty"] > 0).length === 0) {
                return false
            }
        }
    }
    return true
}