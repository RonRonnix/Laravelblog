<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function __invoke(): Response
    {
        $posts = Post::query()
            ->with('author:id,name')
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->take(9)
            ->get()
            ->map(fn (Post $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'description' => $post->description ?? $post->excerpt,
                'image_url' => $post->image_url,
                'published_at' => optional($post->published_at)->toDateString(),
                'author' => [
                    'name' => $post->author?->name,
                ],
            ]);

        return Inertia::render('blog/index', [
            'posts' => $posts,
        ]);
    }
}
