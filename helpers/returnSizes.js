export default function returnSizes(prod) {
    if (typeof prod.inventory === typeof "")
        prod.inventory = JSON.parse(prod.inventory.replace(/=>/g, ":"))
    let sizeSymbols = []
    if (["sweaters", "scarves", "belts", "masks", "jewellery"].includes(prod.category)) {
        sizeSymbols = Object.keys(prod.inventory).filter((key) => prod.inventory[key] > 0 && (prod.hide_sizes ? !prod.hide_sizes.includes(key) : true)).map((item) => item.toUpperCase());
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
            sizeSymbols = Object.keys(prod.inventory).filter((key) => prod.inventory[key] > 0).map((item) => item.toUpperCase());
            let index = sizeSymbols.indexOf("F")
            if (index > -1) {
                sizeSymbols.splice(index, 1)
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
    if (typeof prod.inventory === typeof "")
        prod.inventory = JSON.parse(prod.inventory.replace(/=>/g, ":"))
    let inventory = Object.keys(prod.inventory).filter(key => prod.inventory[key] > 0 && (prod.hide_sizes ? !prod.hide_sizes.includes(key) : true))
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

export function getQty(prod) {
    if (typeof prod.inventory === typeof "")
        prod.inventory = JSON.parse(prod.inventory.replace(/=>/g, ":"))
    let total = 0;
    prod.inv_sizes.forEach((size)=>{
        total+=prod.inventory[size.toLowerCase()]
    })
    return total;
}