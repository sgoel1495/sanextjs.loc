export default function currencyFormatter (currency) {
    const dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });
    const rupeeIndian = Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    });

    switch (currency){
        case "USD":
            return dollarUS
            break
        case "INR":
            return rupeeIndian
            break
        default:
            return null
            break
    }
}