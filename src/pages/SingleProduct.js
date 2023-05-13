import React, { useState } from 'react';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { TbGitCompare } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import Container from '../components/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addRating, getAProduct, getAllProducts } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addProdToCart, getUserCart } from '../features/user/userSlice';
import ProductCardPopu from '../components/ProductCardPopu';

const SingleProduct = () => {
    const [color,setColor]=useState(null)
    const [quantity,setQuantity]=useState(1)
    const [alreadyAdded,setAlreadyAdded]=useState(false)
    const location=useLocation()
    const naviate=useNavigate()
    const getProductId=location.pathname.split("/")[2]
    const dispatch=useDispatch()
    const productState=useSelector(state=>state.product?.singleproduct)
    const cartState=useSelector(state=>state?.auth?.cartProducts)
    const productsState=useSelector((state)=>state?.product.product)
    useEffect(()=>{
        dispatch(getAProduct(getProductId))
        dispatch(getUserCart())
        getProducts()
        
        
    },[])
    
    useEffect(()=>{
        for (let index = 0; index < cartState?.length; index++) {
            if(getProductId===cartState[index]?.productId?._id){
                setAlreadyAdded(true)

            }

            
        }
    },[])

   

    const getProducts=()=>{
        dispatch(getAllProducts())
        
      }
  
    const props = { width: 400, height: 500, zoomWidth: 600, img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"};
    const [orderedProduct, setorderedProduct] = useState(true);
    const uploadCart=()=>{
        if(color===null){
            toast.error("Please Choose Color")
            return false
        }else{
            dispatch(addProdToCart({productId:productState?._id,quantity,color,price:productState?.price}))
            naviate('/cart')
            
        }
    }
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }


    const [star,setStar]=useState(null)
    const [comment,setComment]=useState(null)
    const addRatingToProduct=()=>{
        if(star===null){
            toast.error("Please add star rating")
            return false
        }else if(comment===null){
            toast.error("Please write review about the product")
            return false
        }else{
            dispatch(addRating({star:star,comment:comment,prodId:getProductId}))
            setTimeout(() => {
                dispatch(getAProduct(getProductId))
            }, 100);
            
        }
        return false
    }

    return (
        <>
            <Meta title="Product Names" />
            <BreadCrumb title={productState?.title} />

            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {productState?.images.map((item,index)=>{
                                return(
                                    <div key={index}>
                                    <img src={item?.url} className='img-fluid' alt="" />
                                    </div>
                                )
                            })}
                           
                           
                        

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className='border-bottom'>
                                <h3 className='title'>
                                  {productState?.title}
                                </h3>

                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">
                                    $  {productState?.price}
                                </p>
                                <div className='d-flex align-items-center gap-10'>

                                    <ReactStars
                                        edit={false}
                                        count={5}
                                        value={productState?.totalrating}
                                        size={24}
                                        isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                    />
                                    <p className='mb-0 t-review'>(2 Reviews)</p>
                                </div>
                                <a className='review-btn' href="#review">Write a Review</a>
                            </div>
                            <div className=" py-3">
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className="product-heading">
                                        Type :
                                    </h3><p className='product-data'>Gfd</p>

                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className="product-heading">
                                        Brand :
                                    </h3><p className='product-data'> {productState?.brand}</p>

                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className="product-heading">
                                        Category :
                                    </h3><p className='product-data'>{productState?.category}</p>

                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className="product-heading">
                                        Tags :
                                    </h3><p className='product-data'> {productState?.tags}</p>

                                </div>

                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className="product-heading">
                                        Availiability :
                                    </h3><p className='product-data'>In Stock</p>

                                </div>

                                <div className='d-flex gap-10 flex-column  mb-3 mt-2'>
                                    <h3 className="product-heading">
                                        Sizes :
                                        <div className="d-flex flex-wrap gap-15">
                                            <div className="badge border-1 bg-white text-dark border-secondary">S</div>
                                            <div className="badge border-1 bg-white text-dark border-secondary">M</div>
                                            <div className="badge border-1 bg-white text-dark border-secondary">XL</div>
                                            <div className="badge border-1 bg-white text-dark border-secondary">XXL</div>
                                        </div>
                                    </h3>

                                </div>
                                <div className='d-flex gap-10 flex-column  mb-3 mt-2'>
                                    {alreadyAdded===false && <>
                                        <h3 className="product-heading">
                                        Colors :
                                    </h3><Color setColor={setColor} colorData={productState?.color}/>
</>}
                                </div>

                                <div className='d-flex align-items-center gap-15 flex-row  mb-3 mt-2'>
                                    {alreadyAdded === false && <>
                                        <h3 className="product-heading">
                                        Quantity :</h3>
                                    <div className=''>
                                        <input type="number" name="" min={1} max={10} step={{ width: "70px" }} className="form-control" id=""  onChange={(e)=>{setQuantity(e.target.value)}} value={quantity}/>
                                    </div>
                                    </>}

                                    <div className={alreadyAdded?"ms-0":"ms-5"+'d-flex align-items-center gap-30 ms-5'}>
                                        <button className='button border-0' onClick={()=>{alreadyAdded? naviate('/cart'):uploadCart()}}>{alreadyAdded ? "Go to Cart" :"Added to cart" }</button>
                                        {/* <button className='button signup'>Buy it Now</button> */}
                                    </div>

                                </div>
                                <div className='d-flex align-items-center gap-15'>
                                    <div>
                                        <a href=""><AiOutlineHeart className='fs-5 me-2' /> Add to compare</a>
                                    </div>
                                    <div>
                                        <a href=""><TbGitCompare className='fs-5 me-2' /> Add to wishlist</a>
                                    </div>
                                </div>

                                <div className='d-flex gap-10 flex-column  my-3'>
                                    <h3 className="product-heading">
                                        Shipping & Returns
                                    </h3><p className="product-data">
                                        Free shipping and returns available on all orders! <br /> We
                                        ship all US domestic orders within
                                        <b> 5-10 business days!</b>
                                    </p>

                                </div>

                                <div className='d-flex gap-10 align-items-center my-3'>
                                    <h3 className="product-heading">
                                        Product Link
                                    </h3><a href="javascript:void(0);" onClick={() => copyToClipboard(window.location.href)}>
                                        Copy Product Link
                                    </a>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>


            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>
                            Description
                        </h4>
                        <div className='bg-white p-3'>

                            <p dangerouslySetInnerHTML={{__html:productState?.description}}>
                           
                            </p>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="reviews-wrapper pb-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id='review'>Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className='mb-2'>Customer Reviews</h4>
                                    <div className='d-flex gap-10'>
                                        <ReactStars
                                            edit={false}
                                            count={5}
                                            value={4}
                                            size={24}
                                            isHalf={true}
                                            onChange={(e)=>{
                                                setStar(e)
                                            }}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />
                                        <p className='mb-0 align-items-center'>Based on 2 Reviews</p>
                                    </div>
                                </div>
                                {
                                    orderedProduct && (
                                        <div>
                                            <a className='text-dark text-decoration-underline' href="">Write a Review</a>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="review-form py-4">
                                <h4>Write a Review</h4>
                               

                                    <div>

                                        <ReactStars
                                            edit={true}
                                            count={5}
                                            value={4}
                                            size={24}
                                            isHalf={true}
                                            onChange={(e)=>{
                                                setStar(e)
                                            }}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />
                                    </div>

                                    <div>
                                        <textarea name="" className='w-100 form-control'
                                         id="" cols="30" rows="4" placeholder='Comments'
                                         onChange={(e)=>{
                                            setComment(e.target.value)
                                        }}></textarea>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='button border-0 mt-2' onClick={addRatingToProduct}>Submit Review</button>
                                    </div>
                                
                            </div>
                            <div className="reviews mt-4">
                                {productState && productState?.ratings?.map((item,index)=>{
                                    return(
                                        <div key={index} className="review ">
                                    <div className='d-flex gap-10 align-items-center'>
                                        <h6 className='mb-0'>{item?.title}</h6>
                                        <ReactStars
                                            edit={false}
                                            count={5}
                                            value={item?.star}
                                            size={24}
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <p className='mt-3'>{item?.comment}</p>
                                </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">
                            Our Popular Products
                        </h3>
                    </div>


                </div>
                <div className="row">

                <div className="row">
        {productsState && productsState?.map((item,index)=>{
            if(item.tags==="popular"){
              return(  <ProductCardPopu
                key={index} 
                id={item?._id}
                title={item?.title} 
                brand={item?.brand} 
                totalrating={item?.totalrating.toString()} 
                price={item?.price} 
                sold={item?.sold}
                quantity={item?.quantity}
                description={item?.description}
                images={item?.images}
                
                />)
            }
           
          })}

        </div>
                </div>
            </Container>



        </>
    )
}

export default SingleProduct