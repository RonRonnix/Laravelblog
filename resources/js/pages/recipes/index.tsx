import { Head, Link, router } from '@inertiajs/react';
import { Search, Timer, UsersRound } from 'lucide-react';
import { FormEvent, useState } from 'react';

type Recipe = {
    id: number | null;
    title: string;
    image: string | null;
    readyInMinutes: number | null;
    servings: number | null;
    sourceName: string | null;
    sourceUrl: string | null;
};

type Props = {
    query: string;
    recipes: Recipe[];
    error: string | null;
};

export default function RecipeIndex({ query, recipes, error }: Props) {
    const [search, setSearch] = useState(query);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/recipes',
            { query: search },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <Head title="Recipe Search" />
            <div className="min-h-screen bg-[#e7ded4] px-6 py-10 text-[#25211c]">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                        <div>
                            <p className="text-xs tracking-[0.35em] text-[#7a6f63] uppercase">
                                Food finder
                            </p>
                            <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
                                Search recipes before writing your next food
                                story.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f554b]">
                                Look up dishes, ingredients, and meal ideas,
                                then bring the best discoveries back into your
                                blog drafts.
                            </p>
                        </div>

                        <form
                            onSubmit={submit}
                            className="rounded-[28px] border border-[#d8cfc4] bg-[#fffaf4] p-5 shadow-[0_18px_55px_-45px_rgba(63,48,36,0.45)]"
                        >
                            <label
                                htmlFor="recipe-search"
                                className="text-sm font-medium"
                            >
                                Search Spoonacular
                            </label>
                            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#7a6f63]" />
                                    <input
                                        id="recipe-search"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        className="h-11 w-full rounded-full border border-[#d8cfc4] bg-white/80 pr-4 pl-11 text-sm transition outline-none focus:border-[#9f8f7e]"
                                        placeholder="Search pasta, adobo, mango dessert..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition duration-150 hover:scale-[1.04] hover:bg-black/90 active:scale-95"
                                >
                                    Find recipes
                                </button>
                            </div>
                        </form>
                    </div>

                    {error && (
                        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-xl font-semibold">
                            {query
                                ? `Results for "${query}"`
                                : 'Start a search'}
                        </h2>
                        <Link
                            href="/blog"
                            className="rounded-full border border-[#d8cfc4] bg-[#fffaf4] px-4 py-2 text-sm shadow-sm transition duration-150 hover:scale-[1.04] hover:border-[#b8aa9a] active:scale-95"
                        >
                            Back to blog
                        </Link>
                    </div>

                    {recipes.length > 0 ? (
                        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {recipes.map((recipe) => (
                                <article
                                    key={recipe.id ?? recipe.title}
                                    className="overflow-hidden rounded-[24px] border border-[#d8cfc4] bg-[#fffaf4] shadow-[0_18px_55px_-48px_rgba(63,48,36,0.55)]"
                                >
                                    {recipe.image && (
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="h-48 w-full object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold">
                                            {recipe.title}
                                        </h3>
                                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#5f554b]">
                                            {recipe.sourceName && (
                                                <span className="inline-flex items-center rounded-full border border-[#d8cfc4] px-3 py-1">
                                                    {recipe.sourceName}
                                                </span>
                                            )}
                                            {recipe.readyInMinutes && (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-[#d8cfc4] px-3 py-1">
                                                    <Timer className="size-3" />
                                                    {recipe.readyInMinutes} min
                                                </span>
                                            )}
                                            {recipe.servings && (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-[#d8cfc4] px-3 py-1">
                                                    <UsersRound className="size-3" />
                                                    {recipe.servings} servings
                                                </span>
                                            )}
                                        </div>
                                        {recipe.id && (
                                            <Link
                                                href={`/recipes/${recipe.id}`}
                                                className="mt-5 inline-flex rounded-full border border-black/10 bg-black px-4 py-2 text-xs font-medium text-white transition duration-150 hover:scale-[1.04] hover:bg-black/90 active:scale-95"
                                            >
                                                View recipe
                                            </Link>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 rounded-[24px] border border-dashed border-[#cbbdaf] bg-[#fffaf4]/70 p-8 text-center text-sm text-[#5f554b]">
                            Search for a dish or ingredient to see recipe ideas.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
