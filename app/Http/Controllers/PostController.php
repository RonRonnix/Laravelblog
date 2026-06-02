<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'description' => ['required', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        $baseSlug = Str::slug($data['title']);
        $slug = $baseSlug;
        $suffix = 1;

        while (Post::query()->where('slug', $slug)->exists()) {
            $suffix++;
            $slug = $baseSlug.'-'.$suffix;
        }

        $imagePath = $request->file('image')?->store('posts', 'public');

        Post::create([
            'user_id' => $request->user()->id,
            'title' => $data['title'],
            'slug' => $slug,
            'description' => $data['description'],
            'excerpt' => Str::limit($data['description'], 200, '...'),
            'body' => $data['body'],
            'image_path' => $imagePath,
            'published_at' => now(),
        ]);

        return back()->with('status', 'Post published.');
    }

    public function edit(Request $request, Post $post): Response
    {
        $this->authorizePost($request, $post);

        return Inertia::render('posts/edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'description' => $post->description,
                'body' => $post->body,
                'image_url' => $post->image_path
                    ? Storage::url($post->image_path)
                    : $post->image_url,
            ],
        ]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $this->authorizePost($request, $post);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'description' => ['required', 'string', 'max:500'],
            'body' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            if ($post->image_path) {
                Storage::disk('public')->delete($post->image_path);
            }

            $post->image_path = $request->file('image')->store('posts', 'public');
            $post->image_url = null;
        }

        $post->fill([
            'title' => $data['title'],
            'description' => $data['description'],
            'excerpt' => Str::limit($data['description'], 200, '...'),
            'body' => $data['body'],
        ])->save();

        return redirect()->route('dashboard')->with('status', 'Post updated.');
    }

    public function destroy(Request $request, Post $post): RedirectResponse
    {
        $this->authorizePost($request, $post);

        if ($post->image_path) {
            Storage::disk('public')->delete($post->image_path);
        }

        $post->delete();

        return back()->with('status', 'Post deleted.');
    }

    private function authorizePost(Request $request, Post $post): void
    {
        if ($post->user_id !== $request->user()->id) {
            abort(403);
        }
    }
}
