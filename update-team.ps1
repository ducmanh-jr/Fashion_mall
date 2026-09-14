Write-Host ">> [1/2] Dang tai ma nguon moi nhat tu GitHub nhom (git fetch origin)..." -ForegroundColor Cyan
git fetch origin

$members = @(
    @{ Name = "Huy Hoang"; Branch = "origin/huyhoang"; Path = "branches/huyhoang" },
    @{ Name = "Long";      Branch = "origin/long1";     Path = "branches/long1" },
    @{ Name = "Bac";       Branch = "origin/sprint2-Bac"; Path = "branches/sprint2-Bac" },
    @{ Name = "Tri Cong";  Branch = "origin/tricong";   Path = "branches/tricong" },
    @{ Name = "Nhom Main"; Branch = "origin/main";      Path = "branches/main-team" }
)

Write-Host "`n>> [2/2] Dang dong bo ma nguon vao cac thu muc tuong ung..." -ForegroundColor Cyan
foreach ($m in $members) {
    if (Test-Path $m.Path) {
        git -C $m.Path checkout $m.Branch --quiet 2>$null
    }
}

Write-Host "`n================================================================================" -ForegroundColor Green
Write-Host "   CAP NHAT THANH CONG! TRANG THAI COMMITS MOI NHAT CUA CAC THANH VIEN" -ForegroundColor Green
Write-Host "================================================================================" -ForegroundColor Green

foreach ($m in $members) {
    $commitInfo = git log -1 --format="%h | %cd | %s" --date=relative $m.Branch
    Write-Host ("  - {0,-12}: {1}" -f $m.Name, $commitInfo) -ForegroundColor Yellow
}

Write-Host "================================================================================" -ForegroundColor Green
Write-Host "  Thu muc lam viec cua ban (main/, sprint/) HOAN TOAN AN TOAN, khong bi anh huong!" -ForegroundColor White
Write-Host "================================================================================`n" -ForegroundColor Green
