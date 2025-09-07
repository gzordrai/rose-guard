export type HealthStatus =
    | "ok"
    | "degraded"
    | "down";

// See https://docs.rs/bollard/latest/bollard/models/enum.ContainerSummaryStateEnum.html for reference
export type ContainerSummaryState =
    | "" // empty state
    | "created"
    | "running"
    | "paused"
    | "restarting"
    | "exited"
    | "removing"
    | "dead";

export type StatusDotEntry = HealthStatus | ContainerSummaryState;

export interface HealthResponse {
    status: HealthStatus;
    version: string;
    uptime_seconds: number;
}

export interface ContainerResponse {
    items: ContainerSummary[],
    count: number
}

export interface ContainerSummary {
    id: string;
    name: string;
    image: string;
    state: ContainerSummaryState;
    status: string;
    created: number; // Unix timestamp
}
