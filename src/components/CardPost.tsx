import { Post } from "@/types";
import React from "react";

type CardPostProps = {
    post: Post;
    handleDeletePost: (id: string) => void;
};

const CardPost: React.FC<CardPostProps> = ({ post, handleDeletePost }) => {
    return (
        <div className="rounded-xl shadow bg-slate-100 px-4 py-3">
            <div className="flex gap-4 justify-between">
                <h2 className="text-xl font-semibold mb-6">{post.title}</h2>
                <div>
                    <button
                        type="button"
                        className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={() => handleDeletePost(post.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <p>{post.content}</p>
        </div>
    );
};

export default CardPost;
