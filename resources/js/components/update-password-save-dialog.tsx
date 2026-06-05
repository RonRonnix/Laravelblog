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
};

export default function UpdatePasswordSaveDialog({
    formId,
    isDisabled,
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
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    disabled={disabled}
                    data-test="update-password-button"
                    className="cursor-pointer"
                >
                    Save
                </Button>
            </DialogTrigger>

            <DialogContent>
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
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        form={formId}
                        className="cursor-pointer"
                        data-test="confirm-update-password"
                        disabled={disabled}
                    >
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
