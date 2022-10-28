import React from 'react';
import ProductCard from "../ProductCard";
import BlockHeader from "../../../common/blockHeader";

const CompleteLook = ({ data }) => {
    return (
        <div id={"complete-the-look"}>
            <BlockHeader space={'pt-16'} titleStyle="text-h4 font-500">Complete The LOOK</BlockHeader>
            <div className={"flex gap-8 justify-center my-12"}>
                {data.paired_products.map((look, index) => {
                    return look.products.map((product, i) => {
                        if (data.asset_id === product['old_product_id'])
                            return <></>
                        product['asset_id'] = product['old_product_id']
                        return (
                            <div className={"w-[20vw]"} key={index}>
                                <ProductCard portrait={true} prod={product} key={index + "_" + i} />
                            </div>
                        )
                    })
                })}
            </div>
        </div>
    );
};

export default CompleteLook;