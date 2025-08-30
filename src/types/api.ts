
export type ContainerSummaryStateEnum = "running" | "exited" | "paused" | "restarting" | "dead" | string;

export interface ApiContainerSummary {
    id: string;
    name: string;
    image: string;
    state: ContainerSummaryStateEnum;
    status: string;
    created: number; // Unix timestamp
}
