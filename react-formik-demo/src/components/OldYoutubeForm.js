import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"
function YoutubeForm() {

    const initialValues = {
        name: "",
        email: "",
        channel: ""
    }

    const onSubmit =  values => {
        console.log("Form data", values);
    }

    const validate =  values => {
        let errors = {}

        if (!values.name) {
            errors.name = "Required"
        }

        if (!values.email) {
            errors.email= "Required"
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email = "Invalid email format"
        }

        if (!values.channel) {
            errors.channel = "Required"
        }

        return errors
    } 


    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email format").required("Required"),
        channel: Yup.string().required("Required")
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    console.log("Form values", formik.values);

  return (
    <div>
        <form onSubmit={formik.handleSubmit} action="">
            <label htmlFor="name">Name</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" id='name' name='name' />
            {formik.touched.name && formik.errors.name ? <div style={{color: "red"}}>{formik.errors.name}</div> : null}

            <label htmlFor="email">Email</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email' />
            {formik.touched.email && formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}

            <label htmlFor="channel">Channel</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.channel} type="text" id='channel' name='channel' />
            {formik.touched.channel && formik.errors.channel ? <div style={{color: "red"}}>{formik.errors.channel}</div> : null}

            <button>Submit</button>
        </form>
    </div>
  )
}

export default YoutubeForm