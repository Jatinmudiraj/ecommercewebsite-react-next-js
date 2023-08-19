import Layout from "@/components/layout";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function EditProductPage(){
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response=>{
            setProductInfo(response.data);
        })
    })
    return(
        <Layout>
            <h1>Edit product</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </Layout>
    );
}