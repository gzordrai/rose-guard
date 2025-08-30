import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ContainerResponse, ContainerSummary } from "@/types/api";

export function AppSidebar() {
  const [containers, setContainers] = useState<ContainerSummary[]>([]);

  async function getContainers() {
    invoke<ContainerResponse>("get_containers")
      .then(response => setContainers(response.items))
      .catch(_ => setTimeout(getContainers, 5000));
  }

  useEffect(() => {
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
                <SidebarMenuButton>
                  <a href="">
                    {/* todo add status icon */}
                    <span>{container.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
