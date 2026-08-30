Add-Type -AssemblyName System.Drawing

$framesDir = "c:\Users\hacke\OneDrive\Desktop\ss x 3d\sai saran sports demo 2\public\frames"
$pngs = Get-ChildItem -Path $framesDir -Filter "*.png"

Write-Host "Compressing $($pngs.Count) frames to JPEG..."

foreach ($png in $pngs) {
    $imgPath = $png.FullName
    $jpgPath = $imgPath -replace '\.png$', '.jpg'
    
    $img = [System.Drawing.Image]::FromFile($imgPath)
    
    # Create an empty bitmap with the same size
    $bmp = New-Object System.Drawing.Bitmap $img.Width, $img.Height
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    
    # Fill with black background (in case of transparency)
    $graphics.Clear([System.Drawing.Color]::Black)
    $graphics.DrawImage($img, 0, 0, $img.Width, $img.Height)
    
    # Save as JPEG
    $bmp.Save($jpgPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    
    $graphics.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    
    # Delete original PNG
    Remove-Item $imgPath
    
    Write-Host "." -NoNewline
}

Write-Host "`nDone!"
