import { ContainerSummaryState } from "./api";

export type StatusDotSize = "sm" | "md" | "lg";

export interface StatusDotProps {
  readonly state: ContainerSummaryState;
  readonly size?: StatusDotSize;
  readonly className?: string;
}
