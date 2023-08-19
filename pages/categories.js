import Layout from "@/components/layout";

export default function categories(){
    return(
        <Layout>
            <h1>Categories</h1>
            <label>New Category Name</label>
            <div className="flex gap-1">
            <input type="text" placeholder={'Category name'} />
            <button className="btn btn-primary py-1">Save</button>
            </div>
        </Layout>
    );
}