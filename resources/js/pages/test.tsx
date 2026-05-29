import { Head, Link } from '@inertiajs/react';

const cards = [
    {
        title: 'Design notes',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, lacus non blandit posuere, justo sapien feugiat orci, sed aliquet arcu lectus at lorem.',
    },
    {
        title: 'Product brief',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at sapien vel justo viverra elementum. Curabitur euismod nisi in metus aliquet, a vulputate justo commodo.',
    },
    {
        title: 'Research',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt, velit quis viverra finibus, mauris ligula faucibus massa, sed finibus neque lorem ac orci.',
    },
    {
        title: 'Draft copy',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat, orci vitae egestas viverra, lectus risus gravida arcu, eget cursus justo lectus in nulla.',
    },
];

export default function TestPage() {
    return (
        <>
            <Head title="Test" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex justify-end">
                    <Link
                        href="/blog"
                        className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition hover:border-foreground/40"
                    >
                        Back to blog
                    </Link>
                </div>

                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                        Sandbox
                    </p>
                    <h1 className="mt-3 text-2xl font-semibold">
                        Test workspace
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Use this page to experiment with layout ideas and content blocks.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {cards.map((card) => (
                        <article
                            key={card.title}
                            className="rounded-2xl border border-border bg-background p-5 shadow-sm"
                        >
                            <h2 className="text-lg font-semibold">
                                {card.title}
                            </h2>
                            <p className="mt-3 text-sm text-muted-foreground">
                                {card.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}
