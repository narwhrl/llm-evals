$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$evidenceRoot = Join-Path (Get-Location) 'evidence'
$physicsEvidence = @()
$distances = 24, 25, 28, 16
$fovs = 42, 48, 47, 57
foreach ($preset in 0..3) {
    $image = [System.Drawing.Bitmap]::FromFile((Join-Path $evidenceRoot "desktop-p$preset-d3.png"))
    if ($image.Width -ne 1440 -or $image.Height -ne 900) { throw 'Incorrect desktop capture dimensions' }
    $xs = @(); $ys = @()
    for ($x = 1; $x -lt $image.Width; $x++) {
        $color = $image.GetPixel($x, [int]($image.Height / 2))
        if ($color.R -gt 220 -and $color.G -gt 220 -and $color.B -gt 220) { $xs += $x }
    }
    for ($y = 1; $y -lt $image.Height; $y++) {
        $color = $image.GetPixel([int]($image.Width / 2), $y)
        if ($color.R -gt 220 -and $color.G -gt 220 -and $color.B -gt 220) { $ys += $y }
    }
    $expected = 450 * [math]::Tan([math]::Asin((3 * [math]::Sqrt(3) / 2) * [math]::Sqrt(1 - 1 / $distances[$preset]) / $distances[$preset])) / [math]::Tan($fovs[$preset] * [math]::PI / 360)
    $actualX = ($xs[-1] - $xs[0] + 1) / 2
    $actualY = ($ys[-1] - $ys[0] + 1) / 2
    $passed = [math]::Abs($actualX - $expected) -lt 1.5 -and [math]::Abs($actualY - $expected) -lt 1.5
    $physicsEvidence += [pscustomobject]@{ Preset = $preset; ExpectedRadiusPixels = $expected; ObservedRadiusX = $actualX; ObservedRadiusY = $actualY; Pass = $passed }
    $image.Dispose()
}
$physicsEvidence | ConvertTo-Json | Set-Content (Join-Path $evidenceRoot 'gpu-shadow-validation.json') -Encoding utf8
$physicsEvidence | Format-Table
if ($physicsEvidence.Pass -contains $false) { throw 'GPU capture radius differs from the analytic prediction' }

foreach ($preset in 0..3) {
    $sheet = [System.Drawing.Bitmap]::new(1440, 420)
    $graphics = [System.Drawing.Graphics]::FromImage($sheet)
    $graphics.Clear([System.Drawing.Color]::FromArgb(12, 18, 25))
    $font = [System.Drawing.Font]::new('Consolas', 12)
    foreach ($debug in 0..9) {
        $image = [System.Drawing.Image]::FromFile((Join-Path $evidenceRoot "desktop-p$preset-d$debug.png"))
        if ($image.Width -ne 1440 -or $image.Height -ne 900) { throw 'Incorrect desktop capture dimensions' }
        $x = ($debug % 5) * 288; $y = [int][math]::Floor($debug / 5) * 210
        $graphics.DrawString("PRESET $preset / DEBUG $debug", $font, [System.Drawing.Brushes]::LightGray, $x + 6, $y + 5)
        $graphics.DrawImage($image, $x, $y + 30, 288, 180)
        $image.Dispose()
    }
    $sheet.Save((Join-Path $evidenceRoot "contact-p$preset.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $font.Dispose(); $graphics.Dispose(); $sheet.Dispose()
}
$sheet = [System.Drawing.Bitmap]::new(1560, 936)
$graphics = [System.Drawing.Graphics]::FromImage($sheet)
$graphics.Clear([System.Drawing.Color]::FromArgb(12, 18, 25))
$font = [System.Drawing.Font]::new('Consolas', 11)
$index = 0
foreach ($quality in 'standard', 'high', 'cinematic') {
    foreach ($preset in 0..3) {
        $image = [System.Drawing.Image]::FromFile((Join-Path $evidenceRoot "mobile-$quality-p$preset.png"))
        if ($image.Width -ne 390 -or $image.Height -ne 844) { throw 'Incorrect mobile capture dimensions' }
        $x = ($index % 6) * 260; $y = [int][math]::Floor($index / 6) * 468
        $graphics.DrawString("$quality / preset $preset", $font, [System.Drawing.Brushes]::LightGray, $x + 4, $y + 5)
        $graphics.DrawImage($image, $x + 28, $y + 32, 195, 422)
        $image.Dispose(); $index++
    }
}
$sheet.Save((Join-Path $evidenceRoot 'mobile-contact.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$font.Dispose(); $graphics.Dispose(); $sheet.Dispose()
Write-Output '52 matrix screenshots validated; contact sheets generated.'
