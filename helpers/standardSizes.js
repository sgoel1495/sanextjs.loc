export default function getStandardSizes(prod) {

    console.log(prod.category)
    if (prod.category.includes("pants") || prod.category.includes("skirts") || prod.category.includes("shorts")) {
        return [["waist"], {waist: "26"}, {waist: "28"}, {waist: "30"}, {waist: "32"}, {waist: "34"}, {waist: "36"}]
    }
    if (prod.category.includes("tops") || prod.category.includes("outerwear") || prod.category.includes("shirts") || prod.category.includes("jumpsuits") || prod.category.includes("tunics") || prod.category.includes("sweaters")) {
        return [
            ["size", "bust", "hips"],
            {size: "xs", bust: "32", hip: "35"},
            {size: "s", bust: "34", hip: "37"},
            {size: "m", bust: "36", hip: "39"},
            {size: "l", bust: "38", hip: "41"},
            {size: "xl", bust: "40", hip: "43"},
            {size: "xxl", bust: "42", hip: "45"}
        ]
    }
    if (prod.category.includes("dresses")) {
        return [
            ["size", "bust", "waist", "hips"],
            {size: "xs", bust: "32", waist: "26", hip: "35"},
            {size: "s", bust: "34", waist: "28", hip: "37"},
            {size: "m", bust: "36", waist: "30", hip: "39"},
            {size: "l", bust: "38", waist: "32", hip: "41"},
            {size: "xl", bust: "40", waist: "34", hip: "43"},
            {size: "xxl", bust: "42", waist: "36", hip: "45"}
        ]
    }
}