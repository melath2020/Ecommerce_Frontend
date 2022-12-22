import React, { useState } from 'react';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";


const SingleProduct = () => {
    const [orderedProduct, setorderedProduct] = useState(true);
    return (
        <>
            <Meta title="Product Names" />
            <BreadCrumb title="Product Names" />

            <div className="main-product-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <div className="main-product-image">
                                
                            </div>
                        </div>
                        <div className="col-6">

                        </div>
                    </div>
                </div>

            </div>


            <section className="description-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                        <h4>
                                    Description
                                </h4>
                            <div className='bg-white p-3'>
                               
                                <p>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, consequuntur pariatur earum veniam maiores deserunt, ab totam dolore nisi eum, debitis numquam adipisci. Iure sit incidunt necessitatibus ullam. Numquam, incidunt.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="reviews-wrapper pb-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3>Reviews</h3>
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
                                <form action="" className='d-flex flex-column gap-15'>

                                    <div>

                                    <ReactStars
                                                edit={true}
                                                count={5}
                                                value={4}
                                                size={24}
                                                isHalf={true}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                fullIcon={<i className="fa fa-star"></i>}
                                                activeColor="#ffd700"
                                            />
                                    </div>
                    
                       <div>
                       <textarea name="" className='w-100 form-control' id="" cols="30" rows="4" placeholder='Comments'></textarea>
                      </div>
                      <div className='d-flex justify-content-end'>
                        <button className='button border-0'>Submit Review</button>
                      </div>
                    </form>
                                </div>
                                <div className="reviews mt-4">
                                    <div className="review ">
                                   <div className='d-flex gap-10 align-items-center'>
                                        <h6 className='mb-0'>Navdeep</h6>
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
                                   </div>
                                            <p className='mt-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam est quo esse placeat distinctio quas recusandae ut pariatur aliquam molestiae voluptatum adipisci odit cupiditate, totam error. Optio expedita veniam aperiam.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section className="popular-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">
                                Our Popular Products
                            </h3>
                        </div>


                    </div>
                    <div className="row">


                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </section>

        </>
    )
}

export default SingleProduct