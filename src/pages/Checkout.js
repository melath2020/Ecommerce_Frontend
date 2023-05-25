import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";
import {config} from '../utils/axiosConfig';
import { createAnOrder, deleteUserCart, getUserCart } from "../features/user/userSlice";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName:yup.string().required("Last Name is required"),
  address:yup.string().required("Address details is required"),
  state:yup.string().required("State is required"),
  city:yup.string().required("City is required"),
  country:yup.string().required("Country is required"),
  pincode:yup.string().required("Pincode is required")

});



const Checkout = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [totalAmount,setTotalAmount]=useState(null)
  const cartState=useSelector(state=>state?.auth?.cartProducts)
  const authState=useSelector(state=>state?.auth)
  const [shippingInfo,setShippingInfo]=useState(null)
  const [cartProductsState,setCartProductState]=useState([])

  useEffect(()=>{
    let sum =0;
    for (let index = 0; index < cartState?.length; index++) {
      sum=sum+(Number(cartState[index].quantity)*cartState[index].price)
      setTotalAmount(sum)
      
    }
  },[cartState])

  useEffect(()=>{
    dispatch(getUserCart())
  },[])

  useEffect(()=>{
    if(authState?.orderedProduct !==null && authState?.orderedProduct?.success==true){
      navigate('/my-orders')
    }

  },[authState])

  useEffect(()=>{
    let items=[]
    for (let index = 0; index < cartState?.length; index++) {
     items.push({product:cartState[index].productId._id,quantity:cartState[index].quantity,color:cartState[index].color._id,price:cartState[index].price})
     
    }
    setCartProductState(items)
  },[])

  const loadScript=(src)=>{
    return new Promise((resolve)=>{
      const script=document.createElement("script")
      script.src=src;
      script.onload=()=>{
        resolve(true)
      }
      script.onerror=()=>{
        resolve(false)
      }
      document.body.appendChild(script)
    }) 
  }

  const checkOutHandler=async()=>{
    const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!res){
      alert("Razorpay SDK failed to load")
      return;
    }
    const result=await axios.post("https://restapi-ecomm-new.onrender.com/api/user/order/checkout",{amount:totalAmount+5},config)
    if(!result){
      alert("Something went wrong")
      return;
    }
    const {amount,id:order_id,currency}=result.data.order

    const options = {
            key: "rzp_test_TArLTQzK283PIB", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Aswin Sudhakar",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    // razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("https://restapi-ecomm-new.onrender.com/api/user/order/paymentVerification", data,config);

              
                dispatch(createAnOrder({totalPrice:totalAmount,totalPriceAfterDiscount:totalAmount,orderItems:cartProductsState,paymentInfo:result.data,shippingInfo:JSON.parse(localStorage.getItem("address"))}))
              dispatch(deleteUserCart())
              localStorage.removeItem("address")
            },
            prefill: {
                name: "Aswin",
                email: "aswinsudhakaran98@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "Developer's corner",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

  }
  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName:'',
      address:'',
      state:'',
      city:'',
      country:'',
      pincode:'',
      other:''
    },
    validationSchema:shippingSchema,
    onSubmit:async values => {
      await setShippingInfo(values)
      localStorage.setItem("address",JSON.stringify(values))
      setTimeout(() => {
        checkOutHandler()
      }, 300);
     
    },
  });
 
  return (
    <>
    <Container class1="checkout-wrapper py-5 home-wrapper-2">
    <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Dev Corner</h3>
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="text-dark total-price" to="/cart">
                        Cart
                      </Link>
                    </li>
                    &nbsp; /&nbsp;
                    <li
                      className="breadcrumb-ite total-price active"
                      aria-current="page"
                    >
                      Information
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item total-price active">
                      Shipping
                    </li>
                    &nbsp; /
                    <li
                      className="breadcrumb-item total-price active"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-details total">
                  Aswin Sudhakar (aswinsudhakaran98@gmail.com)
                </p>
                <h4 className="mb-3">Shipping Address</h4>
                <form
                onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select name="country" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} className="form-control form-select" id="">
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      <option value="India" >
                        India
                      </option>
                    </select>
                    <div className="error ms-2">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                    name="firstName"
                      value={formik.values.firstName} 
                      onChange={formik.handleChange("firstName")} 
                      onBlur={formik.handleBlur("firstName")}
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                    />
                     <div className="error ms-2">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                         name="lastName"
                      value={formik.values.lastName} 
                      onChange={formik.handleChange("lastName")} 
                      onBlur={formik.handleBlur("lastName")}
                      placeholder="Last Name"
                      className="form-control"
                    />
                    <div className="error ms-2">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                    name="address"
                    value={formik.values.address} 
                    onChange={formik.handleChange("address")} 
                    onBlur={formik.handleBlur("address")}
                      type="text"
                      placeholder="Address"
                      className="form-control"
                    />
                      <div className="error ms-2">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Apartment, Suite ,etc"
                      className="form-control"
                      name="other"
                    value={formik.values.other} 
                    onChange={formik.handleChange("other")} 
                    onBlur={formik.handleBlur("other")}
                    />
                       <div className="error ms-2">
                      {formik.touched.other && formik.errors.other}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      value={formik.values.city} 
                      onChange={formik.handleChange("city")} 
                      onBlur={formik.handleBlur("city")}
                    />
                      <div className="error ms-2">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <select  name="state"
                      value={formik.values.state} 
                      onChange={formik.handleChange("state")} 
                      onBlur={formik.handleBlur("state")} className="form-control form-select" id="">
                      <option value="" selected disabled>
                        Select State
                      </option>
                      <option value="Kerala" >
                        Kerala
                      </option>
                      <option value="Tamzhnad" >
                        Tamizhnad
                      </option>
                    </select>
                    <div className="error ms-2">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="pincode"
                      className="form-control"
                      name="pincode"
                      value={formik.values.pincode} 
                      onChange={formik.handleChange("pincode")} 
                      onBlur={formik.handleBlur("pincode")}
                    />
                    <div className="error ms-2">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to Cart
                      </Link>
                      <Link to="/cart" className="button">
                        Continue to Shipping
                      </Link>
                      <button className="button" type="submit" onClick={checkOutHandler}>Place Order</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                {
                  cartState && cartState?.map((item,index)=>{
                    return (<div key={index} className="d-flex gap-10 mb-2 align-align-items-center">
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {item?.quantity}
                        </span>
                        <img className="img-fluid" src={item?.productId?.images[0]?.url} alt="product" width={100} height={100}/>
                      </div>
                      <div>
                        <h5 className="total-price">{item?.productId?.title}</h5>
                        <p className="total-price">{item?.color?.title}</p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">$ {item?.price * item?.quantity}</h5>
                    </div>
                  </div>)
                  })
                }
                
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">$ {totalAmount?totalAmount:"0"}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">$ 5</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bootom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">$ {totalAmount?totalAmount+5:"0"}</h5>
              </div>
            </div>
          </div>
    </Container>
    
    </>
  );
};

export default Checkout;
