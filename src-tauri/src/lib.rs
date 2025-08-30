use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct ContainersResponse {
    items: Vec<ApiContainerSummary>,
    count: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
/// Represents a minimal version of `ContainerSummary` from Bollard, designed to avoid sending unnecessary data in API responses.
pub struct ApiContainerSummary {
    /// The unique identifier of the Docker container.
    pub id: String,

    /// The name of the Docker container.
    pub name: String,

    /// The image used to create the container.
    pub image: String,

    /// The current state of the container (e.g., running, exited).
    pub state: String,

    /// The status description of the container (e.g., "Up 5 minutes").
    pub status: String,

    /// The creation timestamp of the container (Unix time).
    pub created: i64,
}

#[tauri::command]
async fn get_containers() -> Result<ContainersResponse, String> {
    let resp = reqwest::get("http://127.0.0.1:3000/containers")
        .await
        .map_err(|e| e.to_string())?
        .json::<ContainersResponse>()
        .await
        .map_err(|e| e.to_string())?;

    Ok(resp)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_containers])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
