<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

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
                    $response = Http::timeout(10)->get('https://api.spoonacular.com/recipes/complexSearch', [
                        'apiKey' => $apiKey,
                        'query' => $query,
                        'number' => 12,
                        'addRecipeInformation' => true,
                        'fillIngredients' => true,
                    ]);

                    if ($response->successful()) {
                        $recipes = collect($response->json('results', []))
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
                    } else {
                        $error = 'Recipe search failed. Please try again later.';
                    }
                } catch (ConnectionException) {
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
}
