<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $posts = Post::query()
            ->where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(fn (Post $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'description' => $post->description ?? $post->excerpt,
                'image_url' => $post->image_url,
                'published_at' => optional($post->published_at)->toDateString(),
                'is_published' => $post->published_at !== null,
            ]);

        return Inertia::render('dashboards', [
            'posts' => $posts,
        ]);
    }
}
