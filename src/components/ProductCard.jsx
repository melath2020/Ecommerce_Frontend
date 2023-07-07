import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice';

const ProductCard = (props) => {
    const { grid ,data} = props;
    const dispatch=useDispatch()
    console.log(data);
    let location = useLocation();
    const addToWish=(prodId)=>{
        alert(prodId)
        dispatch(addToWishlist(prodId))
    }
    return (

        <>
{
    data?.map((item,index)=>{
        
        return(
            <div key={index} className={` ${location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}>
        <div
   
    className="product-card position-relative mt-2">
            <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent" onClick={(e)=>{addToWish(item?._id)}}><img src={wish} alt="wishlist" /></button>
            </div>
            <div className="product-image">

                <img src={item?.images[0]?.url ? item.images[0].url:watch} className='img-fluid w-100' alt="product-image" srcset="" />
                <img src={watch2} className='img-fluid' alt="product-image" srcset="" />
            </div>
            <div className="product-details">
                <h6 className="brand">
                {item?.brand}
                </h6>
                <h5 className="product-title">
                {item.title}
                </h5>
                <ReactStars
                    edit={false}
                    count={5}
                    value={item?.totalrating.toString()}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                dangerouslySetInnerHTML={{__html:item?.description}}>
                   
                </p>
                <p className="price">
               $ {item?.price}
                </p>
            </div>

            <div className="action-bar position-absolute">

                <div className="d-flex flex-column ">
                    {/* <button className="border-0 bg-transparent"><img src={prodcompare} alt="compare" /></button> */}
                </div>


                <div className="d-flex flex-column">
                    <Link to={'/product/'+item?._id} className="border-0 bg-transparent"><img src={view} alt="view" /></Link>
                </div>

                <div className="d-flex flex-column">
                    {/* <button className="border-0 bg-transparent"><img src={addcart}  alt="addcart" /></button> */}
                </div>


            </div>
        </div>
    </div >
        )
    })
}
          

        


        </>

    )
}

export default ProductCard