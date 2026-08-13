import { Trash2Icon } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface DeleteDialogProps {
  onDelete: () => void
  title: string
  description: string
  buttonText?: string
}

export function DeleteDialog({
  onDelete,
  title,
  description,
  buttonText,
}: DeleteDialogProps) {
  const { t } = useTranslation()
  const btnText = buttonText ?? t("deleteDialog.deleteNote")

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{btnText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">
            {t("deleteDialog.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} variant="destructive">
            {t("deleteDialog.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
