import {
  ErrorMessage,
  FastField,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormik,
} from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextError from "./TextError";

function OldYoutubeForm() {

    const [formValues, setFormValues] = useState(null)

  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
  };

  const savedValues = {
    name: "Vishwas",
    email: "v@example.com",
    channel: "codevolution",
    comments: "Welcome to formil",
    address: "221b Baker Street",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    console.log("Submit props", onSubmitProps);
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
  };

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }

    if (!values.channel) {
      errors.channel = "Required";
    }

    return errors;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    channel: Yup.string().required("Required"),
  });

  const validateComments = (value) => {
    let error;
    if (!value) {
      error = "Required";
    }

    return error;
  };

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    //   validateOnMount
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form action="">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component={TextError}></ErrorMessage>

            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email">
              {(errorMsg) => {
                <div className="error">{errorMsg}</div>;
              }}
            </ErrorMessage>

            <label htmlFor="channel">Channel</label>
            <Field
              type="text"
              id="channel"
              name="channel"
              placeholder="Youtube channel name"
            />
            <ErrorMessage name="channel"></ErrorMessage>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                validate={validateComments}
                as="textarea"
                id="comments"
                name="comments"
              ></Field>
              <ErrorMessage
                name="comments"
                component={TextError}
              ></ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  console.log("Render props", props);
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div style={{ color: "red" }}>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook profile</label>
              <Field type="text" id="facebook" name="social.facebook"></Field>
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter profile</label>
              <Field type="text" id="twitter" name="social.twitter"></Field>
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary Phone Number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]"></Field>
            </div>

            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary Phone Number</label>
              <Field
                type="text"
                id="secondaryPh"
                name="phoneNumbers[1]"
              ></Field>
            </div>

            <div className="form-control">
              <label htmlFor=""> List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  console.log(fieldArrayProps);
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;

                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`}></Field>
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              {" "}
                              -{" "}
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <button type="button" onClick={() => formik.validateForm("comments")}>Validate comments</button>
            <button type="button">Validate all</button>
            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>

            <button type='button' onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
            <button type="reset">Reset</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default OldYoutubeForm;
