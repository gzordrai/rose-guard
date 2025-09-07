import { cn } from "@/lib/utils"
import { StatusDotEntry, StatusDotProps } from "@/types"

const colorByState: Record<StatusDotEntry, string> = {
    // HealthStatus
    ok: "bg-emerald-500",
    degraded: "bg-amber-500",
    down: "bg-rose-500",

    // ContainerSummaryState
    "": "bg-slate-400", // empty state
    created: "bg-slate-400",
    running: "bg-emerald-500",
    paused: "bg-yellow-500",
    restarting: "bg-amber-500 animate-pulse",
    exited: "bg-rose-500",
    removing: "bg-slate-400",
    dead: "bg-slate-400",
}

const sizeBySize: Record<string, string> = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
}

export function StatusDot({ state, size = "sm", className }: Readonly<StatusDotProps>) {
    return (
        <span
            className={cn(
                "inline-block rounded-full",
                sizeBySize[size],
                colorByState[state],
                className
            )}
        />
    )
}
