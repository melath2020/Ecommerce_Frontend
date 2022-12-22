import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
const ProductCard = (props) => {
    const { grid } = props;
    console.log(grid);
    let location = useLocation();
    return (

        <>

            <div className={` ${location.pathname == "/product" ? `gr-${grid}` : "col-3"
                } `}>
                <Link to={`${location.pathname == "/"
              ? "/product/:id"
              : location.pathname == "/product/:id"
                ? "/product/:id"
                : ":id"
            }`} className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <Link><img src="images/wish.svg" alt="wishlist" /></Link>
                    </div>
                    <div className="product-image">

                        <img src="images/watch.jpg" className='img-fluid' alt="product-image" srcset="" />
                        <img src="images/watch-1.avif" className='img-fluid' alt="product-image" srcset="" />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">
                            Havels
                        </h6>
                        <h5 className="product-title">
                            Kinds Headphone Bulk 10 pack Multi colored for students
                        </h5>
                        <ReactStars
                            edit={false}
                            count={5}
                            value={4}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                        <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui
                            blanditiis praesentium voluptatum deleniti atque corrupti quos
                            dolores et quas molestias excepturi sint occaecati cupiditate non
                            provident, similique sunt...
                        </p>
                        <p className="price">
                            $100
                        </p>
                    </div>

                    <div className="action-bar position-absolute">

                        <div className="d-flex flex-column ">
                            <Link><img src="images/prodcompare.svg" alt="compare" /></Link>
                        </div>


                        <div className="d-flex flex-column">
                            <Link><img src="images/view.svg" alt="view" /></Link>
                        </div>

                        <div className="d-flex flex-column">
                            <Link><img src="images/add-cart.svg" alt="addcart" /></Link>
                        </div>


                    </div>
                </Link>
            </div >

            <div className={` ${location.pathname == "/product" ? `gr-${grid}` : "col-3"
                } `}>
                <Link  to={`${location.pathname == "/"
              ? "/product/:id"
              : location.pathname == "/product/:id"
                ? "/product/:id"
                : ":id"
            }`} className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <Link><img src="images/wish.svg" alt="wishlist" /></Link>
                    </div>
                    <div className="product-image">

                        <img src="images/watch.jpg" className='img-fluid' alt="product-image" srcset="" />
                        <img src="images/watch-1.avif" className='img-fluid' alt="product-image" srcset="" />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">
                            Havels
                        </h6>
                        <h5 className="product-title">
                            Kinds Headphone Bulk 10 pack Multi colored for students
                        </h5>
                        <ReactStars
                            edit={false}
                            count={5}
                            value={4}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                        <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui
                            blanditiis praesentium voluptatum deleniti atque corrupti quos
                            dolores et quas molestias excepturi sint occaecati cupiditate non
                            provident, similique sunt...
                        </p>
                        <p className="price">
                            $100
                        </p>
                    </div>

                    <div className="action-bar position-absolute">

                        <div className="d-flex flex-column ">
                            <Link><img src="images/prodcompare.svg" alt="compare" /></Link>
                        </div>


                        <div className="d-flex flex-column">
                            <Link><img src="images/view.svg" alt="view" /></Link>
                        </div>

                        <div className="d-flex flex-column">
                            <Link><img src="images/add-cart.svg" alt="addcart" /></Link>
                        </div>


                    </div>
                </Link>
            </div >


        </>

    )
}

export default ProductCard