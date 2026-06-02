import { Head, Link } from '@inertiajs/react';

type Post = {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    body: string;
    image_url: string | null;
    published_at: string | null;
    author: {
        name: string | null;
    };
};

type Props = {
    post: Post;
};

export default function BlogShow({ post }: Props) {
    return (
        <>
            <Head title={post.title} />
            <div className="min-h-screen bg-[#e7ded4] text-[#25211c]">
                <header className="border-b border-[#d8cfc4] bg-[#fffaf4]/80">
                    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                        <Link href="/blog" className="text-sm font-semibold">
                            Home
                        </Link>
                        <Link
                            href="/blog"
                            className="rounded-full border border-[#d8cfc4] bg-[#fffaf4] px-4 py-2 text-sm shadow-sm transition hover:border-[#b8aa9a] duration-150 hover:scale-[1.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Back to blog
                        </Link>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-6xl px-6 pt-12 pb-20">
                    <article>
                        <div className="text-xs tracking-[0.35em] text-[#7a6f63] uppercase">
                            {post.published_at}
                            {post.author.name ? ` by ${post.author.name}` : ''}
                        </div>
                        <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
                            {post.title}
                        </h1>
                        {post.description && (
                            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5f554b]">
                                {post.description}
                            </p>
                        )}

                        {post.image_url && (
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="mt-8 h-full w-full rounded-[28px] object-cover shadow-[0_28px_80px_-55px_rgba(0,0,0,0.55)]"
                            />
                        )}

                        <div className="mt-10 rounded-[28px] border border-[#e1d7cc] bg-[#fffaf4] p-8 text-base leading-8 whitespace-pre-line text-[#3b352e] shadow-[0_18px_55px_-45px_rgba(63,48,36,0.45)]">
                            {post.body}
                        </div>
                    </article>
                </main>
            </div>
        </>
    );
}
