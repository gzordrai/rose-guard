import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { StatusDot } from "@/components/StatusDot";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ContainerResponse, ContainerSummary, HealthResponse } from "@/types/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronUp } from "lucide-react";

export function AppSidebar() {
  const [health, setHealth] = useState<HealthResponse>({ status: "down", version: "", uptime_seconds: 0 });
  const [containers, setContainers] = useState<ContainerSummary[]>([]);

  async function getHealth(): Promise<void> {
    const health = await invoke<HealthResponse>("get_health");

    setHealth(health);
  }

  async function getContainers() {
    invoke<ContainerResponse>("get_containers")
      .then(response => setContainers(response.items))
      .catch(_ => setTimeout(getContainers, 5000));
  }

  useEffect(() => {
    getHealth();
    getContainers();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Servers</SidebarGroupLabel>
          <SidebarMenu>
            {containers.map((container: ContainerSummary) =>
              <SidebarMenuItem key={container.id}>
                <SidebarMenuButton asChild>
                  <a href="">
                    <StatusDot state={container.state} size="sm" />
                    <span>{container.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <StatusDot state={health.status} /> Api status
                  <ChevronUp className="m1-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <StatusDot state={health.status} size="sm" /> Api
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Api version: {health.version}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <StatusDot state={health.status} size="sm" /> Docker {/* Maybe add later docker status in api response */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
