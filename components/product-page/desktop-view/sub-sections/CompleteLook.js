import React from 'react';
import ProductCard from "../ProductCard";

const CompleteLook = ({data}) => {
    return (
        <div>
            <span className={"block"}>Complete The LOOK</span>
            <div className={"flex justify-center"}>
                {
                    data.paired_products.map((look, index) => {
                        return look.products.map((product, i) => {
                            if (data.asset_id === product['old_product_id'])
                                return <></>
                            product['asset_id'] = product['old_product_id']
                            return <div className={"w-[20vw]"}>
                                <ProductCard portrait={true} prod={product} key={index + "_" + i}/>
                            </div>
                        })
                    })
                }
            </div>
        </div>
    );
};

export default CompleteLook;