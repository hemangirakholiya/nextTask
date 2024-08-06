import ProductsTable from '@/Components/productTable'
import React from 'react'
import { GetServerSideProps } from 'next';
import axios from 'axios';

const index = (props: any) => {
    return (
        <>
            <ProductsTable products={props.products} />
        </>
    )
}

export default index;

export const getServerSideProps: GetServerSideProps = async () => {
    console.log('getServerSideProps is running');

    try {
        const res = await axios.get('https://dummyjson.com/products');
        const products = res.data.products;

        console.log('Fetched products:', products);

        return {
            props: {
                products,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                products: [],
            },
        };
    }
};