import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Post = {
    id: number;
    title: string;
    description: string;
    body: string;
    image_url: string | null;
};

type Props = {
    post: Post;
};

export default function EditPost({ post }: Props) {
    return (
        <>
            <Head title="Edit post" />
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            Manage post
                        </p>
                        <h1 className="text-2xl font-semibold">Edit post</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Update your story and keep it fresh for readers.
                        </p>
                    </div>
                    <Link
                        href="/dashboards"
                        className="cursor-pointer rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition hover:border-foreground/40 duration-150 hover:scale-[1.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Back to dashboard
                    </Link>
                </div>

                <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                    <Form
                        method="post"
                        action={`/posts/${post.id}`}
                        encType="multipart/form-data"
                        resetOnSuccess={[]}
                        className="grid gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <input type="hidden" name="_method" value="put" />
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        defaultValue={post.title}
                                        placeholder="Post title"
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={post.description}
                                        placeholder="Short summary for the blog feed"
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="body">Body</Label>
                                    <Textarea
                                        id="body"
                                        name="body"
                                        defaultValue={post.body}
                                        className="min-h-40"
                                        placeholder="Write the full post content"
                                    />
                                    <InputError message={errors.body} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image">Replace image (optional)</Label>
                                    {post.image_url && (
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="h-40 w-full rounded-xl object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                    <Input id="image" name="image" type="file" />
                                    <InputError message={errors.image} />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="cursor-pointer rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition hover:border-foreground/40 duration-150 hover:scale-[1.06] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Saving...' : 'Save changes'}
                                </Button>
                             </>
                         )}
                     </Form>
                 </div>
             </div>
         </>
     );
}
