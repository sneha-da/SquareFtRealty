$files = @(
    "reference\src\imports\HomePage.tsx"
)

foreach ($filePath in $files) {
    $fullPath = Join-Path $PWD $filePath
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        # Replace src={imgVariable} with src={imgVariable.src}
        $content = $content -replace 'src=\{(img[A-Za-z0-9]+)\}', 'src={$1.src}'
        Set-Content -Path $fullPath -Value $content -NoNewline
        Write-Host "Fixed: $filePath"
    }
}

Write-Host "`nAll image sources fixed!"
