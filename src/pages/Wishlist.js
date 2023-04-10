import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";


const Wishlist = () => {
    const dispatch=useDispatch()
    const wishlistState=useSelector((state)=>state?.auth?.wishlist?.wishlist)
    useEffect(()=>{
        getWishlistFromDb()
    },[])
    const getWishlistFromDb=()=>{
        dispatch(getUserProductWishlist())
    }
    
    const removeFromWishlist=(id)=>{
        dispatch(addToWishlist(id))
        setTimeout(()=>{
            dispatch(getUserProductWishlist())
        },300)
    }

    return (
        <>
            <Meta title={"Wishlist"} />
            <BreadCrumb title="Wishlist" />
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
            <div className="row">
                {wishlistState?.length === 0 && <div className="text-center fs-3" >No Data</div>}
                {
                    wishlistState?.map((item,index)=>{
                        return (
                            <div className="col-3" key={index}>
                            <div className="wishlist-card position-relative">
                                <img src='images/cross.svg' alt="cross" className="position-absolute cross img-fluid" onClick={()=>{removeFromWishlist(item?._id)}} />
                                <div className="wishlist-card-image bg-white">
                                    <img src={item?.images[0]?.url ? item?.images[0].url : "images/watch.jpg"} alt="watch" className="img-fluid w-100 d-block mx-auto" />
                                </div>
                                <div className="py-3 px-3">
                <h5 className="title">
                  {item?.title}
                </h5>
                <h6 className="price">$  {item?.price}</h6>
              </div>
                            </div>
                        </div>
                        )
                    })
                }
                      

                        
                    </div>
            </Container>
            
        </>
    );
};

export default Wishlist;
