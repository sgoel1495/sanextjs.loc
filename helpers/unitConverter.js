export function cmToInch(cm) {
    return Math.round(cm * 0.39370)
}

export function inchToCm(inch) {
    return Math.round(inch / 0.39370)
}

export function cmToInchP(cm, precision) {
    let value = (cm * 0.3937).toFixed(precision)
    let valueStr = value.toString().split(".")
    if (parseFloat("0."+valueStr[1]) <= 0.5) {
        return parseFloat(valueStr[0] + ".5")
    } else {
        return parseInt(valueStr[0]) + 1
    }
}