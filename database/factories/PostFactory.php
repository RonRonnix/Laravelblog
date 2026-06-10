<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->sentence(6);
        $description = fake()->paragraph();
        $publishedAt = fake()->dateTimeBetween('-2 months', 'now');

        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $description,
            'excerpt' => Str::limit($description, 200, '...'),
            'body' => collect(fake()->paragraphs(6))->join("\n\n"),
            'image_url' => fake()->boolean(30) ? fake()->imageUrl(1200, 800, 'abstract') : null,
            'image_path' => null,
            'status' => 'published',
            'submitted_at' => $publishedAt,
            'reviewed_at' => $publishedAt,
            'published_at' => $publishedAt,
        ];
    }
}
