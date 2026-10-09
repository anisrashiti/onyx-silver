Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$source = [System.Drawing.Bitmap]::FromFile((Join-Path $projectRoot 'public\images\onyx-logo.png'))
# The original ONYX letterforms occupy rows 8-274; SILVER starts at row 326.
# Keep their native pixels and antialiasing. No font substitution or auto-tracing.
$wordmark = New-Object System.Drawing.Bitmap $source.Width,283
for ($y=0; $y -lt $wordmark.Height; $y++) {
    for ($x=0; $x -lt $wordmark.Width; $x++) {
        $pixel = $source.GetPixel($x,$y)
        $wordmark.SetPixel($x,$y,[System.Drawing.Color]::FromArgb($pixel.A,201,217,232))
    }
}
$wordmark.Save((Join-Path $projectRoot 'public\images\onyx-wordmark.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$source.Dispose(); $wordmark.Dispose()
Write-Output 'Extracted the original ONYX wordmark at native resolution in icy blue.'
