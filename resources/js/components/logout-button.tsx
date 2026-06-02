import { router } from '@inertiajs/react';
import { forwardRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';
import { logout } from '@/routes';

type LogoutButtonProps = {
    children?: ReactNode;
    confirm?: boolean;
    confirmationTitle?: string;
    confirmationMessage?: string;
    onBeforeConfirm?: () => void;
    onBeforeLogout?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

function LogoutButtonComponent(
    {
        children = 'Log out',
        confirm = true,
        confirmationTitle = 'Log out?',
        confirmationMessage = 'Are you sure you want to log out?',
        disabled,
        onBeforeConfirm,
        onBeforeLogout,
        onClick,
        ...props
    }: LogoutButtonProps,
    ref: Ref<HTMLButtonElement>,
) {
    const [processing, setProcessing] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleLogout = () => {
        onBeforeLogout?.();
        router.flushAll();

        router.post(
            logout.url(),
            {},
            {
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            },
        );
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled || processing) {
            return;
        }

        if (confirm) {
            onBeforeConfirm?.();
            setIsConfirmOpen(true);
            return;
        }

        handleLogout();
    };

    const confirmationDialog =
        isConfirmOpen && typeof document !== 'undefined'
            ? createPortal(
                  <div
                      aria-modal="true"
                      className="fixed inset-0 z-[9999] grid place-items-center bg-black/55 px-4"
                      role="dialog"
                  >
                      <div className="w-full max-w-sm rounded-xl border border-border bg-background p-6 text-foreground shadow-xl">
                          <h2 className="text-lg font-semibold">
                              {confirmationTitle}
                          </h2>
                          <p className="mt-2 text-sm text-muted-foreground">
                              {confirmationMessage}
                          </p>
                          <div className="mt-6 flex justify-end gap-2">
                              <button
                                  type="button"
                                  className="cursor-pointer rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition duration-150 hover:scale-[1.04] hover:border-foreground/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                  disabled={processing}
                                  onClick={() => setIsConfirmOpen(false)}
                              >
                                  Cancel
                              </button>
                              <button
                                  type="button"
                                  className="cursor-pointer rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition duration-150 hover:scale-[1.04] hover:bg-black/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                  disabled={processing}
                                  onClick={handleLogout}
                              >
                                  {processing ? 'Logging out...' : 'Log out'}
                              </button>
                          </div>
                      </div>
                  </div>,
                  document.body,
              )
            : null;

    return (
        <>
            <button
                ref={ref}
                type="button"
                disabled={disabled || processing}
                onClick={handleClick}
                {...props}
            >
                {children}
            </button>

            {confirmationDialog}
        </>
    );
}

export const LogoutButton = forwardRef(LogoutButtonComponent);
