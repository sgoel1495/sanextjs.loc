const qtyInCart = (ds)=>{
    if(!ds || ds.userCart.length === 0)
        return null

    console.log("========= QTY in Cart",ds.userCart)
    let count = 0
    ds.userCart.forEach(p=>count += parseInt(p.qty))
    console.log("COUNT",count)
    return count
}
export default qtyInCart