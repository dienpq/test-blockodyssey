"use client";

import { useEffect, useState } from "react";

type Post = {
    id: number;
    title: string;
    content: string;
};

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/posts.json");
            const data = await res.json();

            if (Array.isArray(data)) {
                setPosts(data);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mx-auto max-w-6xl py-24">
            <div className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-bold">Posts</h1>
                <div>
                    <a
                        href="/posts/create"
                        type="button"
                        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create post
                    </a>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="rounded-xl shadow bg-slate-100 px-4 py-3"
                        >
                            <h2 className="text-xl font-semibold mb-6">
                                {post.title}
                            </h2>
                            <p>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </div>
        </div>
    );
}
