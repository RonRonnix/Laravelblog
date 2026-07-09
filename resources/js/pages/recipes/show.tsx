import { Head, Link } from '@inertiajs/react';
import { ChefHat, ExternalLink, Timer, UsersRound } from 'lucide-react';

type Ingredient = {
    id: number | null;
    name: string;
    original: string | null;
};

type Instruction = {
    number: number | null;
    step: string;
};

type Recipe = {
    id: number | null;
    title: string;
    image: string | null;
    summary: string;
    readyInMinutes: number | null;
    servings: number | null;
    sourceName: string | null;
    sourceUrl: string | null;
    diets: string[];
    dishTypes: string[];
    ingredients: Ingredient[];
    instructions: Instruction[];
};

type Props = {
    recipe: Recipe | null;
    error: string | null;
};

export default function RecipeShow({ recipe, error }: Props) {
    return (
        <>
            <Head title={recipe?.title ?? 'Recipe'} />
            <div className="min-h-screen bg-[#e7ded4] px-6 py-10 text-[#25211c]">
                <main className="mx-auto w-full max-w-6xl">
                    <Link
                        href="/recipes"
                        className="inline-flex rounded-full border border-[#d8cfc4] bg-[#fffaf4] px-4 py-2 text-sm shadow-sm transition duration-150 hover:scale-[1.04] hover:border-[#b8aa9a] active:scale-95"
                    >
                        Back to recipes
                    </Link>

                    {error && (
                        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {recipe && (
                        <>
                            <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                                <div>
                                    <p className="text-xs tracking-[0.35em] text-[#7a6f63] uppercase">
                                        {recipe.sourceName ?? 'Spoonacular'}
                                    </p>
                                    <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
                                        {recipe.title}
                                    </h1>

                                    <div className="mt-5 flex flex-wrap gap-2 text-sm text-[#5f554b]">
                                        {recipe.readyInMinutes && (
                                            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8cfc4] bg-[#fffaf4] px-4 py-2">
                                                <Timer className="size-4" />
                                                {recipe.readyInMinutes} min
                                            </span>
                                        )}
                                        {recipe.servings && (
                                            <span className="inline-flex items-center gap-2 rounded-full border border-[#d8cfc4] bg-[#fffaf4] px-4 py-2">
                                                <UsersRound className="size-4" />
                                                {recipe.servings} servings
                                            </span>
                                        )}
                                        {recipe.dishTypes
                                            .slice(0, 2)
                                            .map((type) => (
                                                <span
                                                    key={type}
                                                    className="inline-flex items-center gap-2 rounded-full border border-[#d8cfc4] bg-[#fffaf4] px-4 py-2 capitalize"
                                                >
                                                    <ChefHat className="size-4" />
                                                    {type}
                                                </span>
                                            ))}
                                    </div>

                                    {recipe.summary && (
                                        <div className="mt-6 rounded-[24px] border border-[#d8cfc4] bg-[#fffaf4] p-5 text-sm leading-7 text-[#5f554b]">
                                            <p className="text-xs tracking-[0.25em] text-[#7a6f63] uppercase">
                                                Spoonacular summary
                                            </p>
                                            <p className="mt-3">
                                                {recipe.summary}
                                            </p>
                                        </div>
                                    )}

                                    {recipe.sourceUrl && (
                                        <a
                                            href={recipe.sourceUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition duration-150 hover:scale-[1.04] hover:bg-black/90 active:scale-95"
                                        >
                                            Open original source
                                            <ExternalLink className="size-4" />
                                        </a>
                                    )}
                                </div>

                                {recipe.image && (
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="h-full max-h-[520px] w-full rounded-[28px] object-cover shadow-[0_28px_80px_-55px_rgba(0,0,0,0.55)]"
                                    />
                                )}
                            </section>

                            <section className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                                <div className="rounded-[28px] border border-[#d8cfc4] bg-[#fffaf4] p-6 shadow-[0_18px_55px_-48px_rgba(63,48,36,0.55)]">
                                    <h2 className="text-2xl font-semibold">
                                        Ingredients
                                    </h2>
                                    {recipe.ingredients.length > 0 ? (
                                        <ul className="mt-5 space-y-3 text-sm leading-6 text-[#5f554b]">
                                            {recipe.ingredients.map(
                                                (ingredient, index) => (
                                                    <li
                                                        key={
                                                            ingredient.id ??
                                                            `${ingredient.name}-${index}`
                                                        }
                                                        className="rounded-2xl border border-[#e1d7cc] bg-white/60 p-3"
                                                    >
                                                        {ingredient.original ??
                                                            ingredient.name}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="mt-4 text-sm text-[#5f554b]">
                                            No ingredients were provided for
                                            this recipe.
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-[28px] border border-[#d8cfc4] bg-[#fffaf4] p-6 shadow-[0_18px_55px_-48px_rgba(63,48,36,0.55)]">
                                    <h2 className="text-2xl font-semibold">
                                        Instructions
                                    </h2>
                                    {recipe.instructions.length > 0 ? (
                                        <ol className="mt-5 space-y-4">
                                            {recipe.instructions.map(
                                                (instruction, index) => (
                                                    <li
                                                        key={`${instruction.number ?? index}-${instruction.step}`}
                                                        className="grid gap-3 rounded-2xl border border-[#e1d7cc] bg-white/60 p-4 text-sm leading-7 text-[#5f554b] sm:grid-cols-[auto_1fr]"
                                                    >
                                                        <span className="grid size-8 place-items-center rounded-full bg-black text-xs font-semibold text-white">
                                                            {instruction.number ??
                                                                index + 1}
                                                        </span>
                                                        <span>
                                                            {instruction.step}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ol>
                                    ) : (
                                        <p className="mt-4 text-sm text-[#5f554b]">
                                            Spoonacular did not provide cooking
                                            steps for this recipe. Use the
                                            original source link for the full
                                            method.
                                        </p>
                                    )}
                                </div>
                            </section>
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
