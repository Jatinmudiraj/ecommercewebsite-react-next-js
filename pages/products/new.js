import Layout from "@/components/layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ProductForm from "@/components/ProductForm";
export default function NewProduct(){
    return (
    <Layout>
        <h1> ADD NEW PRODUCT </h1>
        <ProductForm />
    </Layout>
    );

    
}