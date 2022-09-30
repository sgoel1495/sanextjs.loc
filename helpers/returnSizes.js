export default function returnSizes(prod) {
    let sizeSymbols = []
    if (["sweaters", "scarves", "belts", "masks", "jewellery"].includes(prod.category)) {
        sizeSymbols = Object.keys(prod.inventory).filter((key) => prod.inventory[key] > 0 && !prod.hide_sizes.includes(key)).map((item) => item.toUpperCase());
        if (["sweaters", "belts"].includes(prod.category)) {
            let index = sizeSymbols.indexOf("F")
            if (index > -1) {
                sizeSymbols.splice(index, 1)
            }
        } else if (["scarves", "masks", "jewellery"].includes(prod.category)) {
            sizeSymbols = ["F"]
        }

    } else {

        if (prod.is_sale) {
            if (prod.size_avail) {
                sizeSymbols = Object.keys(prod.inventory).filter((key) => prod.inventory[key] > 0).map((item) => item.toUpperCase());
                let index = sizeSymbols.indexOf("F")
                if (index > -1) {
                    sizeSymbols.splice(index, 1)
                }
            }
        } else {
            sizeSymbols = ["XS", "S", "M", "L", "XL", "XXL", "T"]
        }
    }
    return sizeSymbols
}

export function isTailored(prod) {
    return !["sweaters", "scarves", "belts", "masks", "jewellery"].includes(prod.category)
}

function checkInventoryWithoutF(prod) {
    let inventory = Object.keys(prod.inventory).filter(key => prod.inventory[key] > 0 && !prod.hide_sizes.includes(key))
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
        if (checkInventoryWithoutF(prod)) {
            return false
        }
    } else {
        if (prod.is_sale) {
            if (checkInventoryWithoutF(prod)) {
                return false
            }
        } else if (prod.in_stock !== "true") {
            return false
        }
    }
    return true
}