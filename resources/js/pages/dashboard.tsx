import { Form, Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dashboard } from '@/routes';

type Post = {
    id: number;
    title: string;
    description: string | null;
    image_url: string | null;
    published_at: string | null;
    submitted_at?: string | null;
    status: 'pending' | 'published';
    is_published: boolean;
    author?: {
        name: string | null;
    };
};

type Props = {
    posts: Post[];
    review_posts: Post[];
    can_write_posts: boolean;
    can_publish_posts: boolean;
};

export default function Dashboard({
    posts,
    review_posts,
    can_write_posts,
    can_publish_posts,
}: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isObjectUrl, setIsObjectUrl] = useState(false);

    useEffect(() => {
        return () => {
            if (previewUrl && isObjectUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl, isObjectUrl]);

    return (
        <>
            <Head title="dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                            Author studio
                        </p>
                        <h1 className="text-2xl font-semibold">Your posts</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {can_write_posts
                                ? 'Manage stories and review publishing status.'
                                : 'Your account can read and comment on published stories.'}
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition duration-150 hover:scale-[1.06] hover:border-foreground/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Back to blog
                    </Link>
                </div>

                {can_write_posts ? (
                    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Create a post</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {can_publish_posts
                                ? 'Publish a story directly to the blog.'
                                : 'Submit a story for owner review before it appears on the blog.'}
                        </p>
                        <Form
                            method="post"
                            action="/posts"
                            encType="multipart/form-data"
                            resetOnSuccess={[
                                'title',
                                'description',
                                'body',
                                'image',
                            ]}
                            className="mt-6 grid gap-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            placeholder="Post title"
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Short summary for the blog feed"
                                        />
                                        <InputError
                                            message={errors.description}
                                        />
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
                                        <Label htmlFor="image">
                                            Image (optional)
                                        </Label>
                                        <Input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            className="cursor-pointer transition hover:border-foreground/40"
                                            onChange={(event) => {
                                                const file =
                                                    event.target.files?.[0] ??
                                                    null;

                                                if (previewUrl && isObjectUrl) {
                                                    URL.revokeObjectURL(
                                                        previewUrl,
                                                    );
                                                }

                                                if (file) {
                                                    setPreviewUrl(
                                                        URL.createObjectURL(
                                                            file,
                                                        ),
                                                    );
                                                    setIsObjectUrl(true);
                                                } else {
                                                    setPreviewUrl(null);
                                                    setIsObjectUrl(false);
                                                }
                                            }}
                                        />
                                        <InputError message={errors.image} />
                                    </div>

                                    {previewUrl && (
                                        <img
                                            src={previewUrl}
                                            alt="Selected preview"
                                            className="h-40 w-full rounded-xl object-cover"
                                            loading="lazy"
                                        />
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="cursor-pointer rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition duration-120 hover:scale-[1.02] hover:border-foreground/40 hover:bg-black/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {processing
                                            ? 'Saving...'
                                            : can_publish_posts
                                              ? 'Publish post'
                                              : 'Submit for review'}
                                    </Button>
                                </>
                            )}
                        </Form>
                    </div>
                ) : (
                    <div className="rounded-xl border border-border bg-muted/20 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">
                            Reader account
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            You can view published posts and manage your own
                            comments. Blog writing requires an admin or owner
                            role.
                        </p>
                    </div>
                )}

                {can_publish_posts && review_posts.length > 0 && (
                    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Owner review queue
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Approve submitted admin posts before they go
                                    public.
                                </p>
                            </div>
                            <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                                {review_posts.length} pending
                            </span>
                        </div>

                        <div className="mt-5 grid gap-4 lg:grid-cols-2">
                            {review_posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="rounded-xl border border-border bg-muted/10 p-5"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-base font-semibold">
                                                {post.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {post.description ??
                                                    'No description yet.'}
                                            </p>
                                            <p className="mt-3 text-xs text-muted-foreground">
                                                Submitted by{' '}
                                                {post.author?.name ??
                                                    'Unknown author'}
                                                {post.submitted_at
                                                    ? ` on ${post.submitted_at}`
                                                    : ''}
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                            Pending
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <Link
                                            href={`/posts/${post.id}/edit`}
                                            className="cursor-pointer rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-sm transition duration-150 hover:scale-[1.06] hover:border-foreground/40 active:scale-95"
                                        >
                                            Review
                                        </Link>
                                        <Form
                                            method="post"
                                            action={`/posts/${post.id}/publish`}
                                        >
                                            {({ processing }) => (
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="cursor-pointer rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-sm transition duration-150 hover:scale-[1.06] hover:border-foreground/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    Publish
                                                </button>
                                            )}
                                        </Form>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}

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
                                            {post.description ??
                                                'No description yet.'}
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
                                        {post.is_published
                                            ? 'Published'
                                            : 'Pending'}
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
                                            className="cursor-pointer rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-sm transition duration-150 hover:scale-[1.06] hover:border-foreground/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
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
                                                        className="cursor-pointer rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-sm transition duration-150 hover:scale-[1.06] hover:border-foreground/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
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

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'dashboard',
            href: dashboard(),
        },
    ],
};
