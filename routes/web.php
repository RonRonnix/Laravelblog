<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', BlogController::class)->name('home');
Route::get('/blog', BlogController::class)->name('blog.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboards', DashboardController::class)->name('dashboards');
    Route::inertia('/test', 'test')->name('test');
});

require __DIR__.'/settings.php';
