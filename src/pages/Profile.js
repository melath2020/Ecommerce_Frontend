import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useFormik } from 'formik'
import * as yup from 'yup'

const Profile = () => {
  return (
    <>
    <BreadCrumb title='My Profile'/>
    <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className="row">
            <div className="col-12">
            <form>
            <div class="mb-3">
    <label htmlFor="example1" class="form-label">First Name</label>
    <input type="text" name='firstname' className="form-control" id="example1"/>
  </div>
  <div class="mb-3">
    <label htmlFor="example1" class="form-label">Last Name</label>
    <input type="text" name='lastname' className="form-control" id="example1"/>
  </div>
  <div class="mb-3">
    <label htmlFor="exampleInputEmail1" class="form-label">Email Address</label>
    <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
  
  <div class="mb-3">
    <label htmlFor="exampleInputEmail2" class="form-label">Mobile Number</label>
    <input type="number" name='mobile' className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"/>
    
  </div>
  
  <button type="submit" className="btn btn-primary">Save</button>
</form>
            </div>
        </div>

    </Container>
    </>
  )
}

export default Profile