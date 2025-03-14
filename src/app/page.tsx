import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <Link href="/x2kers">

                <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700">
                    Click Me
                </button>
            </Link>

        </div>
    );
}