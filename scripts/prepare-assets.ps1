Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$assetRoot = Join-Path $projectRoot 'public\images'
New-Item -ItemType Directory -Path $assetRoot -Force | Out-Null

function Save-Photo($source, $name, $crop = $null) {
    $image = [System.Drawing.Image]::FromFile($source)
    if ($null -eq $crop) { $crop = New-Object System.Drawing.Rectangle 0,0,$image.Width,$image.Height }
    $scale = [Math]::Min(1, 1600 / [Math]::Max($crop.Width, $crop.Height))
    $target = New-Object System.Drawing.Bitmap ([int]($crop.Width*$scale)),([int]($crop.Height*$scale))
    $g = [System.Drawing.Graphics]::FromImage($target)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $dest = New-Object System.Drawing.Rectangle 0,0,$target.Width,$target.Height
    $g.DrawImage($image, $dest, $crop, [System.Drawing.GraphicsUnit]::Pixel)
    $target.Save((Join-Path $assetRoot $name),[System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose(); $target.Dispose(); $image.Dispose()
}

Save-Photo (Join-Path $projectRoot 'IMG_2630.PNG') 'hero-model.jpg'
Save-Photo (Join-Path $projectRoot '863504AA-E7F1-4296-BC66-45A318D3985F.PNG') 'chandelier-earrings.jpg'
Save-Photo (Join-Path $projectRoot 'IMG_1926.JPG') 'essentials.jpg'
Save-Photo (Join-Path $projectRoot '3E758D2D-E783-49A7-B81F-0C90331F95C0.PNG') 'charm-bracelet.jpg'
Save-Photo (Join-Path $projectRoot '202D55C6-8950-4908-AD65-F4D73B648520.PNG') 'bow-earrings.jpg'
Save-Photo (Join-Path $projectRoot 'IMG_2654.JPG') 'leaf-earrings.jpg'
Save-Photo (Join-Path $projectRoot 'IMG_2627.JPG') 'floral-earrings.jpg'
Save-Photo (Join-Path $projectRoot 'IMG_2601.JPG') 'pearl-earrings.jpg'

$downloads = 'C:\Users\anisr\Downloads'
Save-Photo (Join-Path $downloads 'Split-Screen Silver Jewelry Showcase.png') 'exclusive-editorial.jpg' (New-Object System.Drawing.Rectangle 958,8,958,690)
Save-Photo (Join-Path $downloads 'The Onyx Experience Showcase.png') 'boutique-reference.jpg' (New-Object System.Drawing.Rectangle 24,206,540,507)
Save-Photo (Join-Path $downloads 'The Onyx Experience Showcase.png') 'gift-edit.jpg' (New-Object System.Drawing.Rectangle 579,206,515,507)
Save-Photo (Join-Path $downloads 'The Onyx Experience Showcase.png') 'wholesale-edit.jpg' (New-Object System.Drawing.Rectangle 1109,206,539,507)
Save-Photo (Join-Path $downloads 'Luxury Jewelry Picks Carousel.png') 'heart-cherry-charms.jpg' (New-Object System.Drawing.Rectangle 883,110,408,364)
Save-Photo (Join-Path $downloads 'Luxury Jewelry Picks Carousel.png') 'angel-charm.jpg' (New-Object System.Drawing.Rectangle 1747,110,403,364)

# Derive a transparent copy of the supplied logo, preserving its original letterforms.
$logo = [System.Drawing.Bitmap]::FromFile((Join-Path $projectRoot 'logo.jpg'))
$left=$logo.Width; $top=$logo.Height; $right=0; $bottom=0
for ($y=0; $y -lt $logo.Height; $y++) {
    for ($x=0; $x -lt $logo.Width; $x++) {
        $p=$logo.GetPixel($x,$y)
        if ($p.R -lt 100 -and $p.G -lt 100 -and $p.B -lt 100) {
            $left=[Math]::Min($left,$x); $right=[Math]::Max($right,$x)
            $top=[Math]::Min($top,$y); $bottom=[Math]::Max($bottom,$y)
        }
    }
}
$result=New-Object System.Drawing.Bitmap ($right-$left+17),($bottom-$top+17)
for ($y=0; $y -lt $result.Height; $y++) {
    for ($x=0; $x -lt $result.Width; $x++) {
        $p=$logo.GetPixel($left+$x-8,$top+$y-8)
        $brightness=($p.R+$p.G+$p.B)/3
        $alpha=[int][Math]::Min(255,[Math]::Max(0,(230-$brightness)/230*255))
        $result.SetPixel($x,$y,[System.Drawing.Color]::FromArgb($alpha,0,0,0))
    }
}
$result.Save((Join-Path $assetRoot 'onyx-logo.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$logo.Dispose(); $result.Dispose()
Write-Output 'Prepared original assets and clean reference crops in public/images.'
