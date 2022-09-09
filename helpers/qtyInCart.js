const qtyInCart = (cart)=>{
    if(!cart || cart.length === 0)
        return null

    let count = 0
    cart.forEach(p=>count += parseInt(p.qty))
    return count
}
export default qtyInCart