import React,{useEffect,useMemo} from "react";
import { Link , useNavigate} from "react-router-dom";
import Navbar from "../Navbar";
import {useFormik} from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux";
import { loginAPI } from "../../store/thunks/authThunk";
import toast from "react-hot-toast";
import { routes } from "../../App";
import useAuthState from "../../hooks/useAuthState"


export default function SignupPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuthenticated, loading, error, email} = useAuthState();

  useEffect(()=>{
    if(isAuthenticated){
      navigate(routes.ProtectedRoutes.welcome)
    }
  }, [isAuthenticated,navigate])

  //Rules
  const validationSchema = useMemo(()=>{
     const schema = Yup.object().shape({
      email:Yup.string().trim().email("Invalid email id").required("Email is reuired"),
      password: Yup.string().trim().required("Password is req"),
     })
     return schema;
  },[])

  //
  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
      validationSchema,
      onSubmit:(values) =>{
        dispatch(loginAPI(values));
        toast.success("Login Successfull")
    }
  })


  return (
    <>
      <Navbar variant="login" />

      <div className="hero bg-base-200 flex-1">
        <div className="hero-content">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Login</h1>

            <div className="card bg-base-100 w-xl shadow-2xl">
              <div className="card-body">

                <form onSubmit={formik.handleSubmit}>
                  {Boolean(error) && <p>{error}</p>}

                  {/* Email */}
                  <div className="form-control mb-6 flex justify-around">
                    <label className="label mb-2">
                      <span className="label-text text-lg">Email</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="input input-bordered text-lg"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.email}
                    />
                  </div>

                  {/* Password */}
                  <div className="form-control mb-6 flex justify-around">
                    <label className="label mb-2">
                      <span className="label-text text-lg">Password</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="input input-bordered text-lg"
                      placeholder="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.password}
                    />
                  </div>

                  {/* Switch to Signup */}
                  <Link to="/signup" className="link link-primary mt-4 text-lg">
                    Don’t have an account? Signup here
                  </Link>

                  {/* Submit */}
                  <button className="btn btn-primary mt-6 text-lg" type="submit" disabled={loading}>
                   {loading ? "Logging in...." : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
