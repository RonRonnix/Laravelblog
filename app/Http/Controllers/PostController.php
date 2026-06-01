<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'description' => ['required', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'image_url' => ['nullable', 'url', 'max:2048'],
        ]);

        $baseSlug = Str::slug($data['title']);
        $slug = $baseSlug;
        $suffix = 1;

        while (Post::query()->where('slug', $slug)->exists()) {
            $suffix++;
            $slug = $baseSlug.'-'.$suffix;
        }

        Post::create([
            'user_id' => $request->user()->id,
            'title' => $data['title'],
            'slug' => $slug,
            'description' => $data['description'],
            'excerpt' => Str::limit($data['description'], 200, '...'),
            'body' => $data['body'],
            'image_url' => $data['image_url'] ?? null,
            'published_at' => now(),
        ]);

        return back()->with('status', 'Post published.');
    }
}
