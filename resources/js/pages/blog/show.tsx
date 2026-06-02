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
            <div className="min-h-screen bg-[#fbf7f2] text-[#1c1a16]">
                <header className="border-b border-black/10 bg-white/70">
                    <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
                        <Link href="/blog" className="text-sm font-semibold">
                            Lampblack
                        </Link>
                        <Link
                            href="/blog"
                            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm transition hover:border-black/30"
                        >
                            Back to blog
                        </Link>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-4xl px-6 py-12">
                    <article>
                        <div className="text-xs tracking-[0.35em] text-black/40 uppercase">
                            {post.published_at}
                            {post.author.name ? ` by ${post.author.name}` : ''}
                        </div>
                        <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
                            {post.title}
                        </h1>
                        {post.description && (
                            <p className="mt-5 max-w-3xl text-lg leading-8 text-black/65">
                                {post.description}
                            </p>
                        )}

                        {post.image_url && (
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="mt-8 h-72 w-full rounded-[28px] object-cover shadow-[0_28px_80px_-55px_rgba(0,0,0,0.55)]"
                            />
                        )}

                        <div className="mt-10 rounded-[28px] border border-black/10 bg-white p-8 text-base leading-8 whitespace-pre-line text-black/75 shadow-[0_24px_70px_-60px_rgba(0,0,0,0.45)]">
                            {post.body}
                        </div>
                    </article>
                </main>
            </div>
        </>
    );
}
