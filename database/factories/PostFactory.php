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

        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title),
            'description' => $description,
            'excerpt' => Str::limit($description, 200, '...'),
            'body' => collect(fake()->paragraphs(6))->join("\n\n"),
            'image_url' => fake()->boolean(60) ? fake()->imageUrl(1200, 800, 'abstract') : null,
            'published_at' => fake()->dateTimeBetween('-2 months', 'now'),
        ];
    }
}
