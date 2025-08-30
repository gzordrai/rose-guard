import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar";
import "@/App.css";


function App() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main >
      </main>
    </SidebarProvider>
  );
}

export default App;
