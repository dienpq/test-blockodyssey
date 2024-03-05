"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
});

export default function Contact() {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
                const response = await fetch("/api/posts/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok)
                    throw new Error("Network response was not ok.");

                const responseData = await response.json();
                console.log(responseData);
                if (responseData && responseData.success) {
                    router.push("/posts");
                }
            } catch (error) {
                console.log(error);
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
                                htmlFor="content"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Content
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="content"
                                    id="content"
                                    rows={4}
                                    value={values.content}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.content && touched.content && (
                                    <span className="text-red-600">
                                        {errors.content}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
