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
                            'sourceName' => $recipe['sourceName'] ?? null,
                            'sourceUrl' => $recipe['sourceUrl'] ?? null,
                        ])
                        ->values();
                } catch (Throwable $exception) {
                    $error = $exception->getMessage();
                }
            }
        }

        return Inertia::render('recipes/index', [
            'query' => $query,
            'recipes' => $recipes,
            'error' => $error,
        ]);
    }

    public function show(int $recipeId): Response
    {
        $recipe = null;
        $error = null;
        $apiKey = config('services.spoonacular.key');

        if (! $apiKey) {
            $error = 'Spoonacular is not configured. Add SPOONACULAR_API_KEY to your .env file.';
        } else {
            try {
                $recipe = $this->formatRecipeDetails($this->getRecipeInformation($apiKey, $recipeId));
            } catch (Throwable $exception) {
                $error = $exception->getMessage();
            }
        }

        return Inertia::render('recipes/show', [
            'recipe' => $recipe,
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
            'type' => 'main course',
            'sort' => 'popularity',
        ]);

        $payload = $this->getJson($url);

        return is_array($payload['results'] ?? null) ? $payload['results'] : [];
    }

    /**
     * @return array<string, mixed>
     */
    private function getRecipeInformation(string $apiKey, int $recipeId): array
    {
        $url = "https://api.spoonacular.com/recipes/{$recipeId}/information?".http_build_query([
            'apiKey' => $apiKey,
            'includeNutrition' => 'false',
        ]);

        $payload = $this->getJson($url);

        if (! is_array($payload)) {
            throw new \RuntimeException('Spoonacular returned invalid JSON.');
        }

        if (($payload['status'] ?? null) === 'failure') {
            throw new \RuntimeException((string) ($payload['message'] ?? 'Spoonacular request failed.'));
        }

        return $payload;
    }

    /**
     * @return array<string, mixed>
     */
    private function getJson(string $url): array
    {
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

        return $payload;
    }

    /**
     * @param  array<string, mixed>  $recipe
     * @return array<string, mixed>
     */
    private function formatRecipeDetails(array $recipe): array
    {
        $instructions = collect($recipe['analyzedInstructions'][0]['steps'] ?? [])
            ->map(fn (array $step) => [
                'number' => $step['number'] ?? null,
                'step' => $step['step'] ?? '',
            ])
            ->filter(fn (array $step) => $step['step'] !== '')
            ->values();

        return [
            'id' => $recipe['id'] ?? null,
            'title' => $recipe['title'] ?? 'Untitled recipe',
            'image' => $recipe['image'] ?? null,
            'summary' => strip_tags((string) ($recipe['summary'] ?? '')),
            'readyInMinutes' => $recipe['readyInMinutes'] ?? null,
            'servings' => $recipe['servings'] ?? null,
            'sourceName' => $recipe['sourceName'] ?? null,
            'sourceUrl' => $recipe['sourceUrl'] ?? null,
            'diets' => $recipe['diets'] ?? [],
            'dishTypes' => $recipe['dishTypes'] ?? [],
            'ingredients' => collect($recipe['extendedIngredients'] ?? [])
                ->map(fn (array $ingredient) => [
                    'id' => $ingredient['id'] ?? null,
                    'name' => $ingredient['nameClean'] ?? $ingredient['name'] ?? 'Ingredient',
                    'original' => $ingredient['original'] ?? null,
                ])
                ->values(),
            'instructions' => $instructions,
        ];
    }
}
