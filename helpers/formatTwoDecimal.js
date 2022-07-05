export default function formatTwoDecimal (n){
    const formatter = new Intl.NumberFormat('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formatter.format(n)
}