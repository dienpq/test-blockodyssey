"use client";

import CardPost from "@/components/CardPost";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch("/posts.json");
        const data = await res.json();

        if (Array.isArray(data)) {
            setPosts(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeletePost = async (id: string) => {
        try {
            const response = await fetch("/api/posts/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const data = await response.json();

            if (data.success) {
                fetchData();
            }
        } catch (error) {
            console.error("There was an error deleting the post:", error);
        }
    };

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
                {!loading && posts && posts.length > 0
                    ? posts.map((post) => (
                          <CardPost
                              post={post}
                              key={post.id}
                              handleDeletePost={handleDeletePost}
                          />
                      ))
                    : !loading && <p>No posts found.</p>}
            </div>
        </div>
    );
}
