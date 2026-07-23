<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        abort_unless($user->canWritePosts(), 403);

        $posts = Post::query()
            ->where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(fn (Post $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'description' => $post->description ?? $post->excerpt,
                'image_url' => $post->image_path
                    ? Storage::url($post->image_path)
                    : $post->image_url,
                'published_at' => optional($post->published_at)->toDateString(),
                'status' => $post->status,
                'is_published' => $post->isPublished(),
            ]);

        $reviewPosts = $user->canPublishPosts()
            ? Post::query()
                ->with('author:id,name')
                ->where('status', 'pending')
                ->latest('submitted_at')
                ->get()
                ->map(fn (Post $post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'description' => $post->description ?? $post->excerpt,
                    'image_url' => $post->image_path
                        ? Storage::url($post->image_path)
                        : $post->image_url,
                    'published_at' => optional($post->published_at)->toDateString(),
                    'submitted_at' => optional($post->submitted_at)->toDateString(),
                    'status' => $post->status,
                    'is_published' => $post->isPublished(),
                    'author' => [
                        'name' => $post->author?->name,
                    ],
                ])
            : [];

        return Inertia::render('dashboard', [
            'posts' => $posts,
            'review_posts' => $reviewPosts,
            'can_write_posts' => $user->canWritePosts(),
            'can_publish_posts' => $user->canPublishPosts(),
        ]);
    }
}
