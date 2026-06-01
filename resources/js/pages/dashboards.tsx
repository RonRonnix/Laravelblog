import { Form, Head, Link } from '@inertiajs/react';
import { dashboards } from '@/routes';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Post = {
    id: number;
    title: string;
    description: string | null;
    image_url: string | null;
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

                <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">Create a post</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Share a new story that will appear on the blog.
                    </p>
                    <Form
                        method="post"
                        action="/posts"
                        encType="multipart/form-data"
                        resetOnSuccess={['title', 'description', 'body', 'image']}
                        className="mt-6 grid gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" placeholder="Post title" />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Short summary for the blog feed"
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="body">Body</Label>
                                    <Textarea
                                        id="body"
                                        name="body"
                                        className="min-h-40"
                                        placeholder="Write the full post content"
                                    />
                                    <InputError message={errors.body} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image">Image (optional)</Label>
                                    <Input id="image" name="image" type="file" />
                                    <InputError message={errors.image} />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="cursor-pointer rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition hover:border-foreground/40 duration-150 hover:scale-[1.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Publishing...' : 'Publish post'}
                                </Button>
                            </>
                        )}
                    </Form>
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
                                            {post.description ?? 'No description yet.'}
                                        </p>
                                        {post.image_url && (
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="mt-4 h-32 w-full rounded-xl object-cover"
                                                loading="lazy"
                                            />
                                        )}
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
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                                    <span>
                                        {post.published_at
                                            ? `Published ${post.published_at}`
                                            : 'Not published yet'}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/posts/${post.id}/edit`}
                                            className="cursor-pointer rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-sm transition hover:border-foreground/40 duration-150 hover:scale-[1.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            Edit
                                        </Link>
                                        <Form
                                            method="post"
                                            action={`/posts/${post.id}`}
                                            className="inline-flex"
                                        >
                                            {({ processing }) => (
                                                <>
                                                    <input
                                                        type="hidden"
                                                        name="_method"
                                                        value="delete"
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="cursor-pointer rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-sm transition hover:border-foreground/40 duration-150 hover:scale-[1.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </Form>
                                    </div>
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
