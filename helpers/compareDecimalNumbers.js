export default function compareDecimalNumbers (a,b){
    const aa = parseFloat(parseFloat(a).toFixed(2))
    const bb = parseFloat(parseFloat(b).toFixed(2))
    if(aa > bb)
        return ">"
    else if(aa < bb)
        return "<"
    else
        return "="
}