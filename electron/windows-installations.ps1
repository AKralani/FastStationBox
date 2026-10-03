$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = New-Object System.Text.UTF8Encoding($false)
$result = @{ programs = @(); ubisoft = @(); xbox = @(); errors = @() }
if ($scanSources | Where-Object { $_ -in @('gog', 'ubisoft', 'ea', 'battlenet') }) { try {
    foreach ($root in @('HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall', 'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall', 'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall')) {
        if (!(Test-Path -LiteralPath $root)) { continue }
        foreach ($key in Get-ChildItem -LiteralPath $root) {
            $entry = Get-ItemProperty -LiteralPath $key.PSPath
            if ($entry.Publisher -notmatch 'GOG|Ubisoft|Electronic Arts|Blizzard' -and $entry.UninstallString -notmatch 'Battle\.net') { continue }
            $result.programs += @{ id = $key.PSChildName; name = $entry.DisplayName; publisher = $entry.Publisher; directory = $entry.InstallLocation; icon = $entry.DisplayIcon; uninstall = $entry.UninstallString }
        }
    }
    foreach ($root in @('HKLM:\SOFTWARE\WOW6432Node\Ubisoft\Launcher\Installs', 'HKLM:\SOFTWARE\Ubisoft\Launcher\Installs')) {
        if (!(Test-Path -LiteralPath $root)) { continue }
        foreach ($key in Get-ChildItem -LiteralPath $root) {
            $entry = Get-ItemProperty -LiteralPath $key.PSPath
            $result.ubisoft += @{ id = $key.PSChildName; directory = $entry.InstallDir }
        }
    }
} catch { $result.errors += 'registry' } }

function Read-SafeXml($file) {
    $settings = New-Object System.Xml.XmlReaderSettings
    $settings.DtdProcessing = [System.Xml.DtdProcessing]::Prohibit
    $settings.XmlResolver = $null
    $reader = [System.Xml.XmlReader]::Create($file, $settings)
    try { $doc = New-Object System.Xml.XmlDocument; $doc.Load($reader); return $doc }
    finally { $reader.Dispose() }
}

if ('xbox' -in $scanSources) { try {
    foreach ($package in Get-AppxPackage -PackageTypeFilter Main) {
        if (!$package.InstallLocation -or $package.IsFramework -or $package.IsResourcePackage) { continue }
        if ($package.Name -in @('Microsoft.GamingApp', 'Microsoft.GamingServices', 'Microsoft.XboxGamingOverlay', 'Microsoft.XboxIdentityProvider')) { continue }
        try {
            $configPath = Join-Path $package.InstallLocation 'MicrosoftGame.config'
            $manifest = Read-SafeXml (Join-Path $package.InstallLocation 'AppxManifest.xml')
            $gameMarker = $manifest.SelectSingleNode("//*[local-name()='Extension' and @Category='windows.xboxlive'] | //*[local-name()='PackageDependency' and @Name='Microsoft.GamingServices']")
            if (!(Test-Path -LiteralPath $configPath) -and !$gameMarker) { continue }
            $config = $null
            if (Test-Path -LiteralPath $configPath) { $config = Read-SafeXml $configPath }
            foreach ($application in $manifest.SelectNodes("//*[local-name()='Applications']/*[local-name()='Application']")) {
                $visual = $application.SelectSingleNode("*[local-name()='VisualElements']")
                $name = $visual.DisplayName
                if ($config -and $config.Game.ShellVisuals.DefaultDisplayName) { $name = $config.Game.ShellVisuals.DefaultDisplayName }
                if (!$name -or $name.StartsWith('ms-resource:')) { $name = $package.Name }
                $logo = $visual.Square150x150Logo
                $result.xbox += @{ id = "$($package.PackageFamilyName)!$($application.Id)"; name = $name; directory = $package.InstallLocation; logo = $logo }
            }
        } catch { $result.errors += 'xbox' }
    }
} catch { $result.errors += 'xbox' } }
$result | ConvertTo-Json -Depth 6 -Compress
