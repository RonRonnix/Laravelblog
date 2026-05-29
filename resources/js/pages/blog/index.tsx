import { Form, Head, Link, usePage } from '@inertiajs/react';
import { logout, login } from '@/routes';

type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    published_at: string | null;
    author: {
        name: string | null;
    };
};

type Props = {
    posts: Post[];
};

export default function BlogIndex({ posts }: Props) {
    const { auth } = usePage().props as {
        auth: { user?: { name: string } | null };
    };

    const featured = posts[0];
    const rest = posts.slice(1);

    return (
        <>
            <Head title="Blog" />
            <div className="min-h-screen bg-[#fbf7f2] text-[#1c1a16]">
                <div className="relative overflow-hidden border-b border-black/10 bg-[radial-gradient(900px_400px_at_15%_-10%,#ffe6d2,transparent),radial-gradient(700px_300px_at_85%_0%,#d8f1ff,transparent)]">
                    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                        <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#1c1a16] text-sm font-semibold text-[#fbf7f2]">
                                LB
                            </div>
                            <div className="leading-tight">
                                <div className="text-sm uppercase tracking-[0.2em] text-black/50">
                                    Lampblack
                                </div>
                                <div className="text-lg font-semibold">Slow ideas for a fast web</div>
                            </div>
                        </div>
                        <nav className="flex items-center gap-3 text-sm">
                            <Link href="/blog" className="rounded-full border border-black/10 bg-white/70 px-4 py-2 shadow-sm transition hover:border-foreground/40 duration-150 hover:scale-[1.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
                                Latest
                            </Link>
                            {auth.user ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-black/70">
                                        Hi, {auth.user.name}
                                    </span>
                                    <Form {...logout.form()}>
                                        {({ processing }) => (
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="cursor-pointer rounded-full border border-black/10 bg-black px-4 py-2 text-sm text-white transition hover:bg-black/90 hover:border-foreground/40 duration-150 hover:scale-[1.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Log out
                                            </button>
                                        )}
                                    </Form>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={login()}
                                        className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-full border border-black/10 bg-black px-4 py-2 text-sm text-white"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>

                    <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-16 pt-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-black/50">
                                The Editorial Room
                            </p>
                            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                                Essays, field notes, and dev diaries for the curious.
                            </h1>
                            <p className="mt-4 max-w-xl text-base text-black/70">
                                Welcome to a gentle corner of the web where product
                                thinking, code craft, and storytelling live side by side.
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                <button className="rounded-full bg-black px-5 py-2 text-sm text-white cursor-pointer transition hover:bg-black/90">
                                    Start reading
                                </button>
                                <button className="rounded-full border border-black/15 bg-white px-5 py-2 text-sm cursor-pointer transition hover:bg-white/90">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#f7c4a7] blur-3xl" />
                            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[#b7e4ff] blur-2xl" />
                            <div className="relative rounded-3xl border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.4)]">
                                <p className="text-xs uppercase tracking-[0.3em] text-black/50">
                                    This week
                                </p>
                                <div className="mt-4 space-y-3">
                                    <div className="rounded-2xl border border-black/10 bg-[#f8efe6] p-4">
                                        <div className="text-sm font-semibold">
                                            The slow-burn UI audit
                                        </div>
                                        <p className="mt-2 text-xs text-black/60">
                                            Reading time: 8 min
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-black/10 bg-[#eef7fb] p-4">
                                        <div className="text-sm font-semibold">
                                            Postgres stories from the field
                                        </div>
                                        <p className="mt-2 text-xs text-black/60">
                                            Reading time: 6 min
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12">
                    {posts.length === 0 ? (
                        <div className="rounded-3xl border border-black/10 bg-white p-10 text-center">
                            <h2 className="text-xl font-semibold">No posts yet</h2>
                            <p className="mt-2 text-sm text-black/60">
                                Run the database seeder to load sample stories.
                            </p>
                        </div>
                    ) : (
                        <>
                            {featured && (
                                <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                                    <div className="rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.45)]">
                                        <div className="text-xs uppercase tracking-[0.35em] text-black/40">
                                            Featured
                                        </div>
                                        <h2 className="mt-3 text-2xl font-semibold">
                                            {featured.title}
                                        </h2>
                                        <p className="mt-3 text-sm text-black/70">
                                            {featured.excerpt}
                                        </p>
                                        <div className="mt-6 flex items-center justify-between text-xs text-black/50">
                                            <span>{featured.author.name}</span>
                                            <span>{featured.published_at}</span>
                                        </div>
                                    </div>
                                    <div className="rounded-[28px] border border-black/10 bg-[#111010] p-8 text-white">
                                        <div className="text-xs uppercase tracking-[0.35em] text-white/60">
                                            The blueprint
                                        </div>
                                        <h3 className="mt-3 text-xl font-semibold">
                                            A lightweight CMS strategy for tiny teams
                                        </h3>
                                        <p className="mt-3 text-sm text-white/70">
                                            Draft a thoughtful publishing workflow without
                                            losing speed. Includes content modelling, roles,
                                            and a pragmatic review loop.
                                        </p>
                                        <div className="mt-6 text-xs text-white/60">
                                            Bonus: Postgres + Laravel snippets included
                                        </div>
                                    </div>
                                </section>
                            )}

                            <section className="mt-12">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">
                                        Latest dispatches
                                    </h3>
                                    <span className="text-xs uppercase tracking-[0.3em] text-black/40">
                                        {posts.length} posts
                                    </span>
                                </div>
                                <div className="mt-6 grid gap-6 md:grid-cols-2">
                                    {rest.map((post) => (
                                        <article
                                            key={post.id}
                                            className="group rounded-3x1 border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_22px_50px_-40px_rgba(0,0,0,0.6)]"
                                        >
                                            <div className="text-xs uppercase tracking-[0.3em] text-black/40">
                                                {post.published_at}
                                            </div>
                                            <h4 className="mt-3 text-lg font-semibold">
                                                {post.title}
                                            </h4>
                                            <p className="mt-3 text-sm text-black/65">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-6 flex items-center justify-between text-xs text-black/50">
                                                <span>{post.author.name}</span>
                                                <span className="rounded-full border border-black/10 px-3 py-1">
                                                    Read
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
