$files = Get-ChildItem -Path "reference\src\components\ui\*.tsx" -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Fix escaped quotes back to normal quotes
    $content = $content -replace '\\\"', '"'
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "`nAll escaped quotes fixed!"
