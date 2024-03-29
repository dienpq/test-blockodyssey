import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { generateUniqueId } from "@/helper";

type Post = {
    id: string;
    title: string;
    content: string;
};

export async function POST(req: Request) {
    const result = {
        success: true,
        message: "Create post successfully",
    };
    const { title, content } = await req.json();

    try {
        const filePath = path.join(process.cwd(), "public", "posts.json");
        const fileData = fs.readFileSync(filePath, "utf8");
        const posts: Post[] = JSON.parse(fileData);

        const newPost: Post = {
            id: generateUniqueId(),
            title: title,
            content: content,
        };

        posts.push(newPost);

        fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), "utf8");
    } catch (error) {
        result.success = false;
        result.message = "Create post failed";
    }
    return NextResponse.json({
        ...result,
    });
}
