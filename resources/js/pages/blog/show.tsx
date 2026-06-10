import { Form, Head, Link, usePage } from '@inertiajs/react';

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

type Comment = {
    id: number;
    body: string;
    created_at: string;
    author: {
        id: number | null;
        name: string | null;
    };
};

type Props = {
    post: Post;
    comments: Comment[];
};

export default function BlogShow({ post, comments }: Props) {
    const { auth } = usePage().props as {
        auth: {
            user?: {
                id: number;
                name: string;
                role: string;
            } | null;
        };
    };

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
                            className="rounded-full border border-[#d8cfc4] bg-[#fffaf4] px-4 py-2 text-sm shadow-sm transition duration-150 hover:scale-[1.06] hover:border-[#b8aa9a] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
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

                    <section className="mt-12 rounded-[28px] border border-[#d8cfc4] bg-[#fffaf4] p-8 shadow-[0_18px_55px_-45px_rgba(63,48,36,0.35)]">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    Comments
                                </h2>
                                <p className="mt-1 text-sm text-[#5f554b]">
                                    Readers can join the discussion after
                                    signing in.
                                </p>
                            </div>
                            <span className="text-xs tracking-[0.3em] text-[#7a6f63] uppercase">
                                {comments.length} comments
                            </span>
                        </div>

                        {auth.user ? (
                            <Form
                                method="post"
                                action={`/posts/${post.id}/comments`}
                                resetOnSuccess={['body']}
                                className="mt-6 grid gap-3"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <textarea
                                            name="body"
                                            className="min-h-28 rounded-2xl border border-[#d8cfc4] bg-white/70 p-4 text-sm transition outline-none focus:border-[#9f8f7e]"
                                            placeholder="Write a comment"
                                        />
                                        {errors.body && (
                                            <p className="text-sm text-red-600">
                                                {errors.body}
                                            </p>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-fit cursor-pointer rounded-full border border-black/10 bg-black px-4 py-2 text-sm text-white transition duration-150 hover:scale-[1.04] hover:bg-black/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            {processing
                                                ? 'Posting...'
                                                : 'Post comment'}
                                        </button>
                                    </>
                                )}
                            </Form>
                        ) : (
                            <p className="mt-6 text-sm text-[#5f554b]">
                                <Link
                                    href="/login"
                                    className="font-medium underline underline-offset-4"
                                >
                                    Log in
                                </Link>{' '}
                                to comment.
                            </p>
                        )}

                        <div className="mt-8 grid gap-4">
                            {comments.length === 0 ? (
                                <p className="rounded-2xl border border-dashed border-[#d8cfc4] p-6 text-sm text-[#5f554b]">
                                    No comments yet.
                                </p>
                            ) : (
                                comments.map((comment) => {
                                    const canManageComment =
                                        auth.user?.id === comment.author.id ||
                                        auth.user?.role === 'owner';

                                    return (
                                        <article
                                            key={comment.id}
                                            className="rounded-2xl border border-[#e1d7cc] bg-white/60 p-5"
                                        >
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div>
                                                    <h3 className="text-sm font-semibold">
                                                        {comment.author.name ??
                                                            'Unknown reader'}
                                                    </h3>
                                                    <p className="text-xs text-[#7a6f63]">
                                                        {comment.created_at}
                                                    </p>
                                                </div>
                                            </div>

                                            {canManageComment ? (
                                                <div className="mt-4 grid gap-3">
                                                    <Form
                                                        method="post"
                                                        action={`/comments/${comment.id}`}
                                                        className="grid gap-3"
                                                    >
                                                        {({
                                                            processing,
                                                            errors,
                                                        }) => (
                                                            <>
                                                                <input
                                                                    type="hidden"
                                                                    name="_method"
                                                                    value="put"
                                                                />
                                                                <textarea
                                                                    name="body"
                                                                    defaultValue={
                                                                        comment.body
                                                                    }
                                                                    className="min-h-24 rounded-2xl border border-[#d8cfc4] bg-white/70 p-4 text-sm transition outline-none focus:border-[#9f8f7e]"
                                                                />
                                                                {errors.body && (
                                                                    <p className="text-sm text-red-600">
                                                                        {
                                                                            errors.body
                                                                        }
                                                                    </p>
                                                                )}
                                                                <button
                                                                    type="submit"
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                    className="cursor-pointer rounded-full border border-black/10 bg-black px-4 py-2 text-xs text-white transition duration-150 hover:scale-[1.04] hover:bg-black/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                                                >
                                                                    Save
                                                                </button>
                                                            </>
                                                        )}
                                                    </Form>
                                                    <Form
                                                        method="post"
                                                        action={`/comments/${comment.id}`}
                                                    >
                                                        {({
                                                            processing:
                                                                deleting,
                                                        }) => (
                                                            <>
                                                                <input
                                                                    type="hidden"
                                                                    name="_method"
                                                                    value="delete"
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    disabled={
                                                                        deleting
                                                                    }
                                                                    className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-xs transition duration-150 hover:scale-[1.04] hover:bg-white/80 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </>
                                                        )}
                                                    </Form>
                                                </div>
                                            ) : (
                                                <p className="mt-4 text-sm leading-7 whitespace-pre-line text-[#3b352e]">
                                                    {comment.body}
                                                </p>
                                            )}
                                        </article>
                                    );
                                })
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
