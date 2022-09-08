const qtyInCart = (ds)=>{
    if(!ds || ds.userCart.length === 0)
        return null

    let count = 0
    ds.userCart.forEach(p=>count += parseInt(p.qty))
    return count
}
export default qtyInCart