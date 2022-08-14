import React from "react";

const inputSelect = 'font-600 text-xs focus:ring-transparent focus:border-black';

export const heightF = ['4', '5', '6'];
export const heightI = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
export const shoulder = ['13', '13.5', '14', '14.5', '15', '15.5', '16', '16.5', '17'];
export const biceps = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

export const heightFOptions = () => {
    return (
        <>
            <option className={inputSelect} value=''>
                Select Ft
            </option>
            {heightF.map((value, index) =>
                <option className={inputSelect} value={value} key={index}>
                    {value}
                </option>
            )}
            <option className={inputSelect} value='custom'>
                Other
            </option>
        </>
    );
};
export const heightIOptions = () => {
    return (
        <>
            <option className={inputSelect} value=''>
                Select Inch
            </option>
            {heightI.map((item, index) =>
                <option className={inputSelect} value={item} key={index}>
                    {item}
                </option>
            )}
        </>
    );
};
export const shoulderOptions = () => {
    return (
        <>
            <option className={inputSelect} value=''>
                Select
            </option>
            {shoulder.map((item,index)=>
                <option className={inputSelect} value={item} key={index}>
                    {item}
                </option>
            )}
            <option className={inputSelect} value='custom'>
                Other
            </option>
        </>
    );
};
export const bicepsOptions = () => {
    return(
        <>
            <option className={inputSelect} value=''>
                Select
            </option>
            {biceps.map((item,index)=>
                <option className={inputSelect} value={item} key={index}>
                    {item}
                </option>
            )}
            <option className={inputSelect} value='custom'>
                Other
            </option>
        </>
    );
};

const inputSelect2 = "w-[105px] font-600 text-xs focus:ring-transparent focus:border-black";

export const braSizes = [
    "30 C", "30 D", "30 DD", "30 E", "30 F", "30 FF", "30G", "30 H",
    "32 A", "32 B", "32 C", "32 D", "32 DD", "32 E", "32 F", "32 G", "32 H",
    "34 A", "34 B", "34 C", "34 D", "34 DD", "34 E", "34 F", "34 FF", "34 G",
    "36 B", "36 C", "36 D", "36 DD", "36 E", "36 F", "36 FF", "36 G", "36 H",
    "38 B", "38 C", "38 D", "38 DD", "38 E", "38 F", "38 FF", "38 G", "38 H",
    "40 A", "40 B", "40 C"
]
export const jeansPantSizes = ["26", "28", "30", "32", "34", "36", "38"]
export const brands = ["Marks & Sprencer's", "Zara", "H&M", "Allen Sally", "Van Heusen", "Vero Moda", "Mango"]
export const sizes = [
    "UK 6", "UK 8", "UK 10", "UK 12", "UK 14", "UK 16", "UK 18",
    "EU 34", "EU 36", "EU 38", "EU 40", "EU 42", "EU 44", "EU 46",
    "x-Small", "Medium", "Large", "X-Large"
]

export const braSizeOptions = <>
    <option className={inputSelect2} value="">Select</option>
    {braSizes.map((item, index) => <option className={inputSelect2} value={item} key={index}>{item}</option>)}
    <option className={inputSelect2} value="custom">Other</option>
</>
export const jeansPantSizeOptions = <>
    <option className={inputSelect2} value="">Select</option>
    {jeansPantSizes.map((item, index) =>
        <option className={inputSelect2} value={item} key={index}>{item}</option>
    )}
    <option className={inputSelect2} value="custom">Other</option>
</>
export const brandOptions = <>
    <option className={inputSelect2} value="">Select</option>
    {brands.map((item, index) =>
        <option className={inputSelect2} value={item} key={index}>{item}</option>
    )}
    <option className={inputSelect2} value="custom">Other</option>
</>
export const sizeOptions = <>
    <option className={inputSelect2} value="">Select</option>
    {sizes.map((item, index) =>
        <option className={inputSelect2} value={item} key={index}>{item}</option>
    )}
    <option className={inputSelect2} value="custom">Other</option>
</>