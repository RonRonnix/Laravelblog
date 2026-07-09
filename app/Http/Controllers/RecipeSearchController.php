<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class RecipeSearchController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = trim((string) $request->query('query', ''));
        $recipes = [];
        $error = null;

        if ($query !== '') {
            $apiKey = config('services.spoonacular.key');

            if (! $apiKey) {
                $error = 'Spoonacular is not configured. Add SPOONACULAR_API_KEY to your .env file.';
            } else {
                try {
                    $recipes = collect($this->searchRecipes($apiKey, $query))
                        ->map(fn (array $recipe) => [
                            'id' => $recipe['id'] ?? null,
                            'title' => $recipe['title'] ?? 'Untitled recipe',
                            'image' => $recipe['image'] ?? null,
                            'readyInMinutes' => $recipe['readyInMinutes'] ?? null,
                            'servings' => $recipe['servings'] ?? null,
                            'sourceUrl' => $recipe['sourceUrl'] ?? null,
                            'summary' => strip_tags((string) ($recipe['summary'] ?? '')),
                        ])
                        ->values();
                } catch (Throwable) {
                    $error = 'Could not connect to Spoonacular. Please check your network and try again.';
                }
            }
        }

        return Inertia::render('recipes/index', [
            'query' => $query,
            'recipes' => $recipes,
            'error' => $error,
        ]);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function searchRecipes(string $apiKey, string $query): array
    {
        $url = 'https://api.spoonacular.com/recipes/complexSearch?'.http_build_query([
            'apiKey' => $apiKey,
            'query' => $query,
            'number' => 12,
            'addRecipeInformation' => 'true',
            'fillIngredients' => 'true',
        ]);

        $context = stream_context_create([
            'http' => [
                'timeout' => 10,
                'ignore_errors' => true,
            ],
        ]);

        $body = file_get_contents($url, false, $context);

        if ($body === false) {
            throw new \RuntimeException('Spoonacular request failed.');
        }

        $payload = json_decode($body, true);

        if (! is_array($payload)) {
            throw new \RuntimeException('Spoonacular returned invalid JSON.');
        }

        return is_array($payload['results'] ?? null) ? $payload['results'] : [];
    }
}
