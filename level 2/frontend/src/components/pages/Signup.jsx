import React,{useEffect,useMemo} from "react";
import { Link , useNavigate} from "react-router-dom";
import Navbar from "../Navbar";
import {useFormik} from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux";
import { signupAPI } from "../../store/thunks/authThunk";
import toast from "react-hot-toast";
import { routes } from "../../App";
import useAuthState from "../../hooks/useAuthState"


export default function SignupPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuthenticated, email} = useAuthState();

  useEffect(()=>{
    if(email){
      navigate(routes.login)
    }else if (isAuthenticated){
      navigate(routes.ProtectedRoutes.welcome)
    }
  })

  //Rules
  const validationSchema = useMemo(()=>{
     const schema = Yup.object().shape({
      username:Yup.string().trim().required("User Name is Required"),
      email:Yup.string().trim().email("Invalid email id").required("Email is reuired"),
      password: Yup.string().trim().required("Password is req"),
      confirmPassword: Yup.string().trim().oneOf([Yup.ref("password"),null], "Password must match"),
     })
     return schema;
  },[])

  //
  const formik = useFormik({
    initialValues:{
      username:"",
      email:"",
      password:"",
      confirmPassword:"",
    },
      validationSchema,
      onSubmit:(values) =>{
        dispatch(signupAPI(values));
        navigate(routes.login);
        toast.success("Signup Successfull") 
    }
  })

  return (
    <>
      <Navbar variant="signup" />

      <div className="hero bg-base-200 flex-1">
        <div className="hero-content">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Signup now!</h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="card bg-base-100 w-xl shadow-2xl">
                <div className="card-body">
                  
                  <div className="form-control mb-6 flex justify-around">
                    <label className="label mb-2">
                      <span className="label-text text-lg">Username</span>
                    </label>
                    <input
                      name="username"
                      type="text"
                      className="input input-bordered text-lg"
                      placeholder="Enter username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.username && formik.errors.username && (
                      <p className="text-red-500 text-sm">
                          {formik.errors.username}
                    </p>
                  )}
                  </div>

                  <div className="form-control mb-6 flex justify-around">
                    <label className="label mb-2">
                      <span className="label-text text-lg">Email</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="input input-bordered text-lg"
                      placeholder="Enter email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm">
                          {formik.errors.email}
                    </p>
                  )}
                  </div>

                  <div className="form-control mb-6 flex justify-around">
                    <label className="label mb-2">
                      <span className="label-text text-lg">Password</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="input input-bordered text-lg"
                      placeholder="Enter password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                     {formik.touched.password && formik.errors.password && (
                      <p className="text-red-500 text-sm">
                          {formik.errors.password}
                    </p>
                  )}
                  </div>

                  <div className="form-control mb-6 flex justify-around">
                    <label className="label mb-2">
                      <span className="label-text text-lg">Confirm Password</span>
                    </label>
                    <input
                    name="confirmPassword"
                      type="password"
                      className="input input-bordered text-lg"
                      placeholder="Confirm password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                     {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                          {formik.errors.confirmPassword}
                    </p>
                  )}
                  </div>

                  <Link to="/login" className="link link-primary mt-4 text-lg">
                    I already have an account
                  </Link>

                  <button className="btn btn-primary mt-6 text-lg" type="submit">
                    Signup
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}
