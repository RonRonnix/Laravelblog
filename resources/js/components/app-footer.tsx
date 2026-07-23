import { Link } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerColumns = [
    {
        title: 'Explore',
        links: [
            { label: 'Recipe Index', href: '/recipes' },
            { label: 'Diet Plans', href: '/recipes?query=healthy' },
            { label: 'Fitness Hub', href: '/blog' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms of Service', href: '/terms-of-service' },
            { label: 'Contact Me', href: '/contact' },
        ],
    },
    {
        title: 'Connect',
        links: [
            { label: 'Instagram', href: 'https://www.instagram.com' },
            { label: 'Pinterest', href: 'https://www.pinterest.com' },
            { label: 'YouTube', href: 'https://www.youtube.com' },
        ],
    },
];

function FooterLink({ href, label }: { href: string; label: string }) {
    const className =
        'text-[#5f554b] transition hover:text-[#25211c] dark:text-[#cdbfac] dark:hover:text-white';

    if (href.startsWith('http')) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={className}
            >
                {label}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {label}
        </Link>
    );
}

export function AppFooter() {
    return (
        <footer className="border-t border-[#d8cfc4] bg-[#fffaf4] text-[#25211c] dark:border-[#3a332c] dark:bg-[#151311] dark:text-[#f4eadf]">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10">
                <div className="grid gap-8 border-y border-[#d8cfc4] py-8 sm:grid-cols-4 dark:border-[#3a332c]">
                    <p className="max-w-2xl text-base leading-7 text-[#5f554b] dark:text-[#cdbfac]">
                    Healthy recipes and fitness tips to fuel your daily life.
                    </p>
                    {footerColumns.map((column) => (
                        <div key={column.title}>
                            <h2 className="text-xs font-semibold tracking-[0.28em] text-[#7a6f63] uppercase dark:text-[#a99a88]">
                                {column.title}
                            </h2>
                            <ul className="mt-4 space-y-3 text-sm">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <FooterLink
                                            href={link.href}
                                            label={link.label}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* <form
                    className="flex flex-col gap-3 border-b border-[#d8cfc4] pb-8 sm:flex-row dark:border-[#3a332c]"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Input
                        type="email"
                        aria-label="Newsletter email"
                        placeholder="Email address"
                        className="h-11 rounded-full border-[#d8cfc4] bg-white/70 px-5 text-[#25211c] placeholder:text-[#7a6f63] dark:border-[#4a4036] dark:bg-[#211d19] dark:text-[#f4eadf] dark:placeholder:text-[#8f806f]"
                    />
                    <Button
                        type="submit"
                        className="h-11 rounded-full bg-black px-6 text-white transition duration-150 hover:scale-[1.03] hover:bg-black/90 active:scale-95 dark:bg-[#f4eadf] dark:text-[#151311] dark:hover:bg-white"
                    >
                        <Mail className="size-4" />
                        Subscribe
                    </Button>
                </form> */}

                <div className="flex flex-col gap-4 text-xs leading-6 text-[#7a6f63] sm:flex-row sm:items-end sm:justify-between dark:text-[#a99a88]">
                    <p className="max-w-3xl">
                        Disclaimer: Content on this site is for educational
                        purposes only and should not replace professional
                        medical or nutritional advice.
                    </p>
                    <p className="shrink-0">&copy; 2026 Lampblack Kitchen.</p>
                </div>
            </div>
        </footer>
    );
}
