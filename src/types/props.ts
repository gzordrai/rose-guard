import { StatusDotEntry } from "@/types";

export type StatusDotSize = "sm" | "md" | "lg";

export interface StatusDotProps {
  readonly state: StatusDotEntry;
  readonly size?: StatusDotSize;
  readonly className?: string;
}
