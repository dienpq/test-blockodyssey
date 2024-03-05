import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between gap-10 py-24">
            <h3 className="text-3xl uppercase font-semibold">
                Test in Blockodyssey
            </h3>
            <a
                href="/posts"
                type="button"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Posts List
            </a>
        </main>
    );
}
