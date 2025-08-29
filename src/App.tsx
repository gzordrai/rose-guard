import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import "./App.css";

function App() {
  return (

    <SidebarProvider defaultOpen={true}>
      <main >
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}

export default App;
