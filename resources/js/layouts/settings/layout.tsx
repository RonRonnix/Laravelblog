import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: null,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="min-h-screen bg-[#e7ded4] px-6 py-10 text-[#25211c]">
            <div className="mx-auto w-full max-w-6xl">
                <Heading
                    title="Settings"
                    description="Manage your profile and account settings"
                />

                <div className="rounded-[28px] border border-[#d8cfc4] bg-[#fffaf4] p-6 shadow-[0_18px_55px_-45px_rgba(63,48,36,0.45)]">
                    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                        <aside className="w-full lg:w-52">
                            <nav
                                className="flex flex-col gap-2"
                                aria-label="Settings"
                            >
                                {sidebarNavItems.map((item, index) => (
                                    <Button
                                        key={`${toUrl(item.href)}-${index}`}
                                        size="sm"
                                        variant="ghost"
                                        asChild
                                        className={cn(
                                            'w-full justify-start rounded-full text-[#5f554b] transition duration-150 hover:scale-[1.03] hover:bg-[#f1e8dd] hover:text-[#25211c]',
                                            {
                                                'bg-black text-white hover:bg-black/90 hover:text-white':
                                                    isCurrentOrParentUrl(
                                                        item.href,
                                                    ),
                                            },
                                        )}
                                    >
                                        <Link href={item.href}>
                                            {item.icon && (
                                                <item.icon className="h-4 w-4" />
                                            )}
                                            {item.title}
                                        </Link>
                                    </Button>
                                ))}
                            </nav>
                        </aside>

                        <Separator className="lg:hidden" />

                        <div className="flex-1">
                            <section className="max-w-2xl space-y-12">
                                {children}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
