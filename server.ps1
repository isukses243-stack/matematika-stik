# Server Lokal Ringan untuk KREASI STIK PINTAR
# Menggunakan .NET HttpListener bawaan Windows PowerShell tanpa perlu instalasi pihak ketiga

$port = 8080
$prefix = "http://localhost:$port/"
$folder = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "🌟 Server Edukasi 'KREASI STIK PINTAR' Berhasil Berjalan!" -ForegroundColor Yellow
    Write-Host "Alamat URL: $prefix" -ForegroundColor Cyan
    Write-Host "Tekan Ctrl+C untuk menghentikan server." -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Green

    # Buka peramban otomatis
    Start-Process $prefix

    $mimeTypes = @{
        ".html" = "text/html; charset=utf-8"
        ".css"  = "text/css; charset=utf-8"
        ".js"   = "application/javascript; charset=utf-8"
        ".json" = "application/json; charset=utf-8"
        ".png"  = "image/png"
        ".jpg"  = "image/jpeg"
        ".jpeg" = "image/jpeg"
        ".svg"  = "image/svg+xml"
        ".ico"  = "image/x-icon"
    }

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($urlPath) -or $urlPath -eq "/") {
            $urlPath = "index.html"
        }

        # Cegah path traversal
        $safePath = [System.IO.Path]::Combine($folder, $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

        if ([System.IO.File]::Exists($safePath)) {
            $ext = [System.IO.Path]::GetExtension($safePath).ToLower()
            $mime = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $mime = $mimeTypes[$ext]
            }

            $response.ContentType = $mime
            $response.AddHeader("Cache-Control", "no-cache")

            $bytes = [System.IO.File]::ReadAllBytes($safePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Berkas Tidak Ditemukan: $urlPath")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }

        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Catatan Server: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    $listener.Stop()
}
