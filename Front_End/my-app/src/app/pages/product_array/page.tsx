'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import Product from '@/app/components/product_in_list_column/page';
import RemoveProduct from '../delete_product/page';
import UpdateProduct from '../../update_product/id/[id]';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import avatar from "@/assets/images/omrp_logo_white.png"


const actions = [
    {
        title: 'Hồ sơ doanh nghiệp',
        to: '/partner_profile',
    },
    {
        title: 'Chọn sản phẩm',
        to: '/choose_product',
    },
    {
        title: 'Danh sách sản phẩm',
        to: '/product_array',
    },
    {
        title: 'Hợp đồng',
        to: '/make_contract',
    },
]
  
type PRODUCT = {
    ID_PRODUCTS: number,
    NAME: string,
    INFOR_PRODUCTS: string | null,
    QUANTITY: number,
    PRICE: number,
    URL: string,
    TYPE_PROD: string
}

type ApiResponse = {
    message: string;
    products: PRODUCT[];
    totalItems: string;
    perPage: number;
    currentPage: number;
};

const cx = classNames.bind(styles);
function ProductArray() {
    const [products, setProducts] = useState<PRODUCT[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
        .get<ApiResponse>('https://project-ec-tuankhanh.onrender.com/v1/api/consumer/product')
        .then((response) => setProducts(response.data.products))
        .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleRemove = () => {
    }
    const handleUpdate = () => {
    }
    return ( <div className={cx('product_array')}>
        <div className={cx('product_array-wrapper')}>
        <Header name_view='Doanh nghiệp'/>
        <div className={cx('product_array-middle')}>
            <div className={cx('product_array-middle__wrapper')}>
                <Sidebar author='Doanh nghiệp' page_path='/list_product' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('product_array-content')}>
                    {products.map((product) => {
                        return (
                        <div key={product.ID_PRODUCTS} >
                            <Product  info={[product]} view='list_product_business' />
                            <button className={cx("product-btn__remove")} onClick={handleRemove}>
                            <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} size="2x"/>
                                Gỡ sản phẩm
                            </button>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ProductArray;
