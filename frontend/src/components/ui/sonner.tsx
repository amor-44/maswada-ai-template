import {
  CheckCircle2Icon,
  InfoIcon,
  Loader2Icon,
  XCircleIcon,
  AlertTriangleIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-sans group-[.toaster]:bg-white/85 dark:group-[.toaster]:bg-neutral-900/85 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-black/10 dark:group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:px-4 group-[.toaster]:py-3.5 group-[.toaster]:gap-3 group-[.toaster]:font-medium",
          description: "group-[.toast]:text-muted-foreground text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground text-xs font-medium rounded-lg px-3 py-1.5",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground text-xs font-medium rounded-lg px-3 py-1.5",
          success:
            "group-[.toaster]:!border-emerald-500/30 group-[.toaster]:!bg-emerald-50/90 dark:group-[.toaster]:!bg-emerald-950/60 group-[.toaster]:!text-emerald-900 dark:group-[.toaster]:!text-emerald-200",
          error:
            "group-[.toaster]:!border-destructive/30 group-[.toaster]:!bg-red-50/90 dark:group-[.toaster]:!bg-red-950/60 group-[.toaster]:!text-red-900 dark:group-[.toaster]:!text-red-200",
          warning:
            "group-[.toaster]:!border-amber-500/30 group-[.toaster]:!bg-amber-50/90 dark:group-[.toaster]:!bg-amber-950/60 group-[.toaster]:!text-amber-900 dark:group-[.toaster]:!text-amber-200",
          info:
            "group-[.toaster]:!border-blue-500/30 group-[.toaster]:!bg-blue-50/90 dark:group-[.toaster]:!bg-blue-950/60 group-[.toaster]:!text-blue-900 dark:group-[.toaster]:!text-blue-200",
        },
      }}
      icons={{
        success: <CheckCircle2Icon className="size-4 text-emerald-600 dark:text-emerald-400" />,
        info: <InfoIcon className="size-4 text-blue-600 dark:text-blue-400" />,
        warning: <AlertTriangleIcon className="size-4 text-amber-600 dark:text-amber-400" />,
        error: <XCircleIcon className="size-4 text-destructive" />,
        loading: <Loader2Icon className="size-4 animate-spin text-muted-foreground" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
