import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
    isDisabled?: boolean;
    confirmLabel?: ReactNode;
    description?: ReactNode;
    formId: string;
    processing?: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function UpdatePasswordSaveDialog({
    formId,
    isDisabled,
    open,
    onOpenChange,
    confirmLabel = 'Update password',
    description = (
        <>
            Are you sure you want to update your password? You may need to use
            your new password the next time you sign in.
        </>
    ),
    processing = false,
}: Props) {
    const disabled = Boolean(isDisabled || processing);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    disabled={disabled}
                    data-test="update-password-button"
                    className="cursor-pointer rounded-full border border-black/15 bg-white px-5 py-2 text-sm text-[#25211c] transition duration-150 hover:scale-[1.06] hover:bg-white/80 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#4a4036] dark:bg-[#181511] dark:text-[#f4eadf] dark:hover:bg-[#2c261f]"
                >
                    Save
                </Button>
            </DialogTrigger>

            <DialogContent
                onOpenAutoFocus={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle>Confirm password update</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="secondary"
                            type="button"
                            disabled={processing}
                            className="cursor-pointer rounded-full border border-black/15 bg-black px-5 py-2 text-sm text-white transition duration-150 hover:scale-[1.06] hover:bg-black/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#4a4036] dark:bg-[#181511] dark:text-[#f4eadf] dark:hover:bg-[#2c261f]"
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        type="submit"
                        form={formId}
                        disabled={disabled}
                        className="cursor-pointer rounded-full border border-black/15 bg-white px-5 py-2 text-sm text-[#25211c] transition duration-150 hover:scale-[1.06] hover:bg-white/80 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#f4eadf]/20 dark:bg-[#f4eadf] dark:text-[#151311] dark:hover:bg-white"
                        data-test="confirm-update-password"
                    >
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
