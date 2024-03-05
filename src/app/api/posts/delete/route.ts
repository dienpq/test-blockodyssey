import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Post = {
    id: string;
    title: string;
    content: string;
};

export async function DELETE(req: Request) {
    const result = {
        success: true,
        message: "Delete post successfully",
    };
    const { id } = await req.json();

    try {
        const filePath = path.join(process.cwd(), "public", "posts.json");
        const fileData = fs.readFileSync(filePath, "utf8");
        const posts: Post[] = JSON.parse(fileData);

        const newPosts = posts.filter(
            (post) => post.id.toString() !== id.toString()
        );

        // Ghi lại vào file
        fs.writeFileSync(filePath, JSON.stringify(newPosts, null, 2), "utf8");
    } catch (error) {
        result.success = false;
        result.message = "Delete post failed";
    }
    return NextResponse.json({
        ...result,
    });
}
