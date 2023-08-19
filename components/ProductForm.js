import Layout from "./layout";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Spinner from "./Spinner";
export default function ProductForm(
    {
        _id,
        title:existingTitle,
        description:existingDescription,
        price:existingPrice,
        images:existingImages,
    }
){
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [ images, setImages] = useState(existingImages || [])
    const[goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title, description, price, images};
        if (_id){
            await axios.put('/api/products', {...data,_id});
        }else{
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
        
    }
    if(goToProducts){
        router.push('/products');
    }
    async function uploadImage(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for(const file of files) {
                data.append('file',file);
            }
            const res = await axios.post('/api/upload', data,);
            setImages(oldImages=>{
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
            
        }
    }
    function updateImagesOrder(images){
        setImages(images);
    }
    return(
            <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <br/>
            <input type="text" placeholder="product name" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <br/>
            <label>
                Photos
            </label><br/>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
                {!!images?.length && images.map(link => (
                    <div key={link} className="inline-block h-24">
                        <img src={link} alt=" Photo unable to fetch." className="rounded-lg" />
                    </div>
                ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 p-1 bg-gray-200 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                    Upload
                    </div>
                    <input type="file" onChange={uploadImage} className="hidden"></input>
                </label>
            </div>
            <label>Desctription</label>
            <br/>
            <textarea type='text' placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}/>
            <br/>
            <label>Price (in USD)</label>
            <br/>
            <input type="number" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)}/>
            <br/>
            <button className="btn btn-primary" type="submit">Save</button>
            </form>
        
    );
}