<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Post $post): RedirectResponse
    {
        abort_unless($post->published_at, 404);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $post->comments()->create([
            'user_id' => $request->user()->id,
            'body' => $data['body'],
        ]);

        return back()->with('status', 'Comment posted.');
    }

    public function update(Request $request, Comment $comment): RedirectResponse
    {
        $this->authorizeComment($request, $comment);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $comment->update($data);

        return back()->with('status', 'Comment updated.');
    }

    public function destroy(Request $request, Comment $comment): RedirectResponse
    {
        $this->authorizeComment($request, $comment);

        $comment->delete();

        return back()->with('status', 'Comment deleted.');
    }

    private function authorizeComment(Request $request, Comment $comment): void
    {
        if ($comment->user_id !== $request->user()->id && ! $request->user()->isOwner()) {
            abort(403);
        }
    }
}
