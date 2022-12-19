import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';

const CompareProduct = () => {
  return (
   <>
    <Meta title="Compare Products" />
    <BreadCrumb title="Compare Products" />
    <div className="compare-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-3">
                    <div className="compare-product-card position-relative">
                        <img src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                        <div className="product-card-image ">
                            <img src="images/watch.jpg" alt="watch" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
   
   </>
  )
}

export default CompareProduct