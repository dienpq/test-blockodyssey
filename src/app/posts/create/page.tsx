"use client";

import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    title: Yup.string().required("Title is required"),
    message: Yup.string().required("Message is required"),
});

export default function Contact() {
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            title: "",
            message: "",
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
            setLoading(true);
            const notification = { status: true, message: "" };

            try {
            } catch (error) {
                notification.status = false;
                notification.message = "Failed to send email";
            } finally {
                setLoading(false);
                setStatus(notification.status);
                setMessage(notification.message);
                setTimeout(() => setMessage(""), 3000);
            }
        },
    });
    const { errors, touched, values, handleChange, handleSubmit, handleBlur } =
        formik;

    return (
        <>
            <form
                onSubmit={handleSubmit}
                method="POST"
                className="px-6 lg:px-8 py-32"
            >
                <div className="mx-auto max-w-xl lg:max-w-lg">
                    <h3 className="mb-14 text-3xl font-semibold text-center">
                        Create Post
                    </h3>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="phone-number"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Title
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="tel"
                                    name="title"
                                    id="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="tel"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.title && touched.title && (
                                    <span className="text-red-600">
                                        {errors.title}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Content
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.message && touched.message && (
                                    <span className="text-red-600">
                                        {errors.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            disabled={loading}
                            type="submit"
                            className={`relative rounded-md w-full ${
                                loading ? "bg-indigo-400" : "bg-indigo-600"
                            }  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${
                                !loading
                                    ? "hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    : null
                            } `}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
