use rose_bound::{ContainersResponse, HealthResponse};

// use real error handling later instead of just String
#[tauri::command]
async fn get_health() -> Result<HealthResponse, String> {
    let resp = reqwest::get("http://127.0.0.1:3000/health")
        .await
        .map_err(|e| e.to_string())?
        .json::<HealthResponse>()
        .await
        .map_err(|e| e.to_string())?;

    Ok(resp)
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
        .invoke_handler(tauri::generate_handler![get_health, get_containers])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
