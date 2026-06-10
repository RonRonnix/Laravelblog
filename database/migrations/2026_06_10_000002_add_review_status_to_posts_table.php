<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->string('status')->default('pending')->after('image_path')->index();
            $table->timestamp('submitted_at')->nullable()->after('status');
            $table->timestamp('reviewed_at')->nullable()->after('submitted_at');
        });

        DB::table('posts')->update([
            'status' => DB::raw("CASE WHEN published_at IS NULL THEN 'pending' ELSE 'published' END"),
            'submitted_at' => DB::raw('created_at'),
            'reviewed_at' => DB::raw('published_at'),
        ]);
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['status', 'submitted_at', 'reviewed_at']);
        });
    }
};
