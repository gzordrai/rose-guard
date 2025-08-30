import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ApiContainerSummary } from "@/types/api";

export function AppSidebar() {
  const [containers, setContainers] = useState([]);

  async function getContainers() {
    setContainers(await invoke("get_containers"))
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
            {containers.map((container: ApiContainerSummary) =>
              <SidebarMenuItem key={container.name}>
                <SidebarMenuButton>
                  <a href="">
                    -- todo add status icon
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
