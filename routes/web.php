<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', BlogController::class)->name('home');
Route::get('/blog', BlogController::class)->name('blog.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboards', DashboardController::class)->name('dashboards');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::inertia('/test', 'test')->name('test');
});

require __DIR__.'/settings.php';
