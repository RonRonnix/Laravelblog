<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function __invoke(): Response
    {
        $posts = Post::query()
            ->with('author:id,name')
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->take(9)
            ->get()
            ->map(fn (Post $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'description' => $post->description ?? $post->excerpt,
                'image_url' => $post->image_path
                    ? Storage::url($post->image_path)
                    : $post->image_url,
                'published_at' => optional($post->published_at)->toDateString(),
                'author' => [
                    'name' => $post->author?->name,
                ],
            ]);

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show(Post $post): Response
    {
        abort_unless($post->isPublished(), 404);

        $post->load([
            'author:id,name',
            'comments.author:id,name',
        ]);

        return Inertia::render('blog/show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'description' => $post->description ?? $post->excerpt,
                'body' => $post->body,
                'image_url' => $post->image_path
                    ? Storage::url($post->image_path)
                    : $post->image_url,
                'published_at' => optional($post->published_at)->toDateString(),
                'author' => [
                    'name' => $post->author?->name,
                ],
            ],
            'comments' => $post->comments
                ->sortByDesc('created_at')
                ->values()
                ->map(fn ($comment) => [
                    'id' => $comment->id,
                    'body' => $comment->body,
                    'created_at' => $comment->created_at->toDateTimeString(),
                    'author' => [
                        'id' => $comment->author?->id,
                        'name' => $comment->author?->name,
                    ],
                ]),
        ]);
    }
}
