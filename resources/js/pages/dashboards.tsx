import { Head, Link } from '@inertiajs/react';
import { dashboards } from '@/routes';

type Post = {
    id: number;
    title: string;
    excerpt: string | null;
    published_at: string | null;
    is_published: boolean;
};

type Props = {
    posts: Post[];
};

export default function Dashboards({ posts }: Props) {
    return (
        <>
            <Head title="Dashboards" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            Author studio
                        </p>
                        <h1 className="text-2xl font-semibold">Your posts</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage the stories you have published or drafted.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition hover:border-foreground/40 duration-150 hover:scale-[1.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Back to blog
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
                        <h2 className="text-lg font-semibold">No posts yet</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Create your first draft to see it listed here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="rounded-xl border border-border bg-background p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {post.title}
                                        </h2>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {post.excerpt ?? 'No excerpt yet.'}
                                        </p>
                                    </div>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            post.is_published
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                        }`}
                                    >
                                        {post.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                                    <span>
                                        {post.published_at
                                            ? `Published ${post.published_at}`
                                            : 'Not published yet'}
                                    </span>
                                    <span className="rounded-full border border-border px-3 py-1">
                                        Manage
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

Dashboards.layout = {
    breadcrumbs: [
        {
            title: 'Dashboards',
            href: dashboards(),
        },
    ],
};
