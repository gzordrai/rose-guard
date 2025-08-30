
export type ContainerSummaryStateEnum = "running" | "exited" | "paused" | "restarting" | "dead" | string;

export interface ContainerResponse {
    items: ContainerSummary[],
    count: number
}

export interface ContainerSummary {
    id: string;
    name: string;
    image: string;
    state: ContainerSummaryStateEnum;
    status: string;
    created: number; // Unix timestamp
}
