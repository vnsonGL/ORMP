"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'
import Header from '../components/header/header_cus'
import Footer from '../components/footer/page'
import { arrow_img, arrow_left_product, arrow_right_product, banner_home_customer, product_img_1, product_img_2 } from '@/assets/images'
import ProductItem from '@/components/items/ProductItem/ProductItem'
import { useState, useEffect } from 'react'
import productAPI from './api/productAPI'
import { useActionData } from 'react-router-dom'
import { categoryApi } from './api/apiReponseType'
import { useSelector } from 'react-redux'
const inter = Inter({ subsets: ['latin'] })

type apiResponse ={
  currentPage: number,
  message: string,
  perPage: number,
  products:[],
  totalItems: string
}
type productApi = {
  URL: string,
  NAME: string,
  PRICE: number
}
export default function Home() {
  // const a= [{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},{TYPE_PROD: "thi thi", Img: {product_img_1}},]
  // console.log("a",a)
  const b= [1,2,3,4,5,6,1,2,3,4,5,6,]
  const [curr_productlist, setCurr_Productlist]=useState([])
  const [next_productlist, setNext_Productlist]=useState([])
  const [prev_productlist, setPrev_Productlist]=useState([])
  const [curr_productPointlist, setCurr_ProductPointlist]=useState([])
  const [next_productPointlist, setNext_ProductPointlist]=useState([])
  const [prev_productPointlist, setPrev_ProductPointlist]=useState([])
  const [curr_productExchangePointlist, setCurr_ProductExchangePointlist]=useState([])
  const [next_productExchangePointlist, setNext_ProductExchangePointlist]=useState([])
  const [prev_productExchangePointlist, setPrev_ProductExchangePointlist]=useState([])
  const [categorylist, setCategorylist] = useState<categoryApi[]>([])
  const [cate_idx, setCate_idx] = useState(0)
  const [pagi_idx, setPagi_idx] = useState(1)
  const [numpages, setNumPages] = useState(0)
  const [isIncreasing, setIsIncreasing]=useState(false)
  const [productListTab, setProductListTab] = useState(1) // 1 : all 2: productExchangePoint- đủ điểm đổi 3: productPoint - có thể đổi
  const productListTabName = ["Tất cả sản phẩm", "Sản phẩm đủ điểm đổi","Sản phẩm có thể đổi"]
  const itemPerpage =10;

  const user=useSelector((state:any)=> state.auth.login.currentUser)
  const cusID=user.user.userId
  const fetchProductList = async () => {
    console.log("pageidx", pagi_idx)
    const res = await productAPI.getAllProducts(pagi_idx,itemPerpage);
    setCurr_Productlist(res.data.products)
    console.log(res.data)
    setNumPages(res.data.totalItems/itemPerpage);
    console.log("num pages", res.data.totalItems/itemPerpage)
    
  }
  // 1: all product list
  const fetchNextProductList = async (page_idx: number) => {
    console.log("pageidx", pagi_idx)
    const res = await productAPI.getAllProducts(page_idx,itemPerpage);
    setNext_Productlist(res.data.products) 
    console.log("next: ",res.data)
  }
  const fetchPrevProductList = async (page_idx: number) => {
    console.log("pageidx", pagi_idx)
    const res = await productAPI.getAllProducts(page_idx,itemPerpage);
    setPrev_Productlist(res.data.products) 
    console.log("prev",res.data)
  }
  // get category
  const fetchCategoryList= async() => {
    const res=await productAPI.getAllCatagories();
    const list = res.data.data

    const len=list.length;
    const r=len%6;
    const r_array=list.slice(1,r+1)
    setCategorylist(list.concat(r_array))
  }
  // 2: productExchangePoint- đủ điểm đổi
  const fetchProductExchangePointList = async () => {
    console.log("pageidx", pagi_idx)
    const res = await productAPI.getProductExchangePointList(cusID, pagi_idx,itemPerpage);
    setCurr_ProductExchangePointlist(res.data.products)
    console.log(res.data)
    setNumPages(res.data.totalItems/itemPerpage);
    console.log("num pages", res.data.totalItems/itemPerpage)
    
  }
  const fetchNextProductExchangePointList = async (page_idx: number) => {
    console.log("pageidx", pagi_idx)
    const res = await productAPI.getProductExchangePointList(cusID, page_idx,itemPerpage);
    setNext_ProductExchangePointlist(res.data.products) 
    console.log("next: ",res.data)
  }
  const fetchPrevProductExchangePointList = async (page_idx: number) => {
    console.log("pageidx", pagi_idx)
    const res = await productAPI.getProductExchangePointList(cusID, page_idx,itemPerpage);
    setPrev_ProductExchangePointlist(res.data.products) 
    console.log("prev",res.data)
  }
  // 3: productPoint- co the doi
    const fetchProductPointList = async () => {
    console.log("pageidx", pagi_idx)
    const res = await productAPI.getProductPointList(cusID, pagi_idx,itemPerpage);
    setCurr_ProductPointlist(res.data.products)
    console.log(res.data)
    setNumPages(res.data.totalItems/itemPerpage);
    console.log("num pages", res.data.totalItems/itemPerpage)
    
  }
  const fetchNextProductPointList = async (page_idx: number) => {
    console.log("pageidx", pagi_idx)
    const res = await productAPI.getProductPointList(cusID, page_idx,itemPerpage);
    setNext_ProductPointlist(res.data.products) 
    console.log("next: ",res.data)
  }
  const fetchPrevProductPointList = async (page_idx: number) => {
    console.log("pageidx", pagi_idx)
    const res = await productAPI.getProductPointList(cusID, page_idx,itemPerpage);
    setPrev_ProductPointlist(res.data.products) 
    console.log("prev",res.data)
  }
 
  useEffect(()=> {
    // get product list
    fetchCategoryList();
    fetchProductList();
    fetchNextProductList(pagi_idx+1);
    fetchProductExchangePointList();
    fetchNextProductExchangePointList(pagi_idx+1);
    fetchProductPointList();
    fetchNextProductPointList(pagi_idx+1);

    // console.log(productlist)

  },[])
  const IncreasePagi = () =>{
    setCurr_Productlist(next_productlist);
   
  }
  useEffect(()=> {
    // get product list
    if (productListTab===1) {
      if (isIncreasing===true){
        setPrev_Productlist(curr_productlist)
        setCurr_Productlist(next_productlist);
        fetchNextProductList(pagi_idx+1);
      } else{
        setNext_Productlist(curr_productlist)
        setCurr_Productlist(prev_productlist);
        fetchPrevProductList(pagi_idx-1);
      }
    }
   else if (productListTab===2){
    if (isIncreasing===true){
      setPrev_ProductExchangePointlist(curr_productExchangePointlist)
      setCurr_ProductExchangePointlist(next_productExchangePointlist);
      fetchNextProductExchangePointList(pagi_idx+1);
    } else{
      setNext_ProductExchangePointlist(curr_productExchangePointlist)
      setCurr_ProductExchangePointlist(prev_productExchangePointlist);
      fetchPrevProductExchangePointList(pagi_idx-1);
    }

   }
   else {
    if (isIncreasing===true){
      setPrev_ProductPointlist(curr_productPointlist)
      setCurr_ProductPointlist(next_productPointlist);
      fetchNextProductPointList(pagi_idx+1);
    } else{
      setNext_ProductPointlist(curr_productPointlist)
      setCurr_ProductPointlist(prev_productPointlist);
      fetchPrevProductPointList(pagi_idx-1);
    }

   }

    // console.log(productlist)
  },[pagi_idx])
  return (
    <main  className={styles.main} >
      <div className={styles.banner}><Image src={banner_home_customer} className={styles.banner_img} alt=""/></div>
      <div className={styles.product_catalog}>
        <p className={styles.catalog_title}>Danh mục sản phẩm</p>
        {/* slideshow */}
        <div className={styles.catalog_slideshow}>
             {/* slideshowSlider */}
          <div className={styles.catalog_productList} style={{transform: `translate3d(${-cate_idx*100}%,0,0)`}}>
            {/* mot san pham */}
            {/* slide */}
            {categorylist.map((cate:any, index)=>(
              <div key={index} className={styles.catalog_product}>
                <Image src={cate.Img} width={100} height={120} alt=""></Image>
                <p className={styles.catalog_product_title}>{cate.TYPE_PROD}</p>
              </div>
            ))}
           
          </div>
         
        </div>
        <Image src={arrow_img} width={40} height={40} alt="" className={styles.catalog_arrow} onClick={()=> cate_idx===categorylist.length/6-1?setCate_idx(0): setCate_idx(cate_idx+1)}></Image>
      </div>
      <div className={styles.product_list}>
        <div className={styles.product_list__navbar}>
          {productListTabName.map((tab, index) =>
              <div
               className={`${index+1===productListTab? styles.product_list__navbar_title_current: styles.product_list__navbar_title}`}
               onClick={()=>{setProductListTab(index+1);
                              setPagi_idx(1)}}>{tab}</div>
         
          )}
        
        
        </div>
        <div className={styles.product_list__grid}>
          {productListTab===1?(
            <>
            {curr_productlist.map((prod:productApi)=>(
           
              <ProductItem img={prod.URL} name={prod.NAME} price={prod.PRICE}/>
            ))}
            </>
          ):(productListTab===2?(
            <>
            {curr_productExchangePointlist.map((prod:productApi)=>(
           
              <ProductItem img={prod.URL} name={prod.NAME} price={prod.PRICE}/>
            ))}
            </>
          ):(
            <>
            {curr_productPointlist.map((prod:productApi)=>(
           
              <ProductItem img={prod.URL} name={prod.NAME} price={prod.PRICE}/>
            ))}
            </>
          ))}
        
        </div>
        <div className={styles.pagination}>
          {pagi_idx -1<=0?(<></>):(<>
          <Image onClick={() =>{setPagi_idx(pagi_idx-1); setIsIncreasing(false);}} className={styles.pagination_num} src={arrow_left_product} alt=""/><p onClick={() =>{setPagi_idx(pagi_idx-1); setIsIncreasing(false);}} className={styles.pagination_num}>{pagi_idx-1}</p></>)}
          <p className={styles.pagination_num} style={{color: `var(--primary-color-1)`}}>{pagi_idx}</p>
          {pagi_idx >numpages?(<></>):(<>
          <p onClick={() =>{setPagi_idx(pagi_idx+1); setIsIncreasing(true);}} className={styles.pagination_num}>{pagi_idx+1}</p><Image onClick={() =>{setPagi_idx(pagi_idx+1);setIsIncreasing(true);}} className={styles.pagination_num} src={arrow_right_product} alt=""/></>)}
          
        </div>
      </div>

    </main>
  )
}
