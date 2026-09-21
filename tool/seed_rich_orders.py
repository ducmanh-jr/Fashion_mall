#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Nạp thêm 12 đơn hàng và giao dịch thực tế vào SQL Server qua ADO.NET / pyodbc / PowerShell một cách an toàn và chuẩn mã hóa UTF-8
"""

import subprocess

PS_SCRIPT = r"""
$connStr = "Server=localhost\SQLEXPRESS;Database=fashion_mall;Trusted_Connection=True;TrustServerCertificate=True;"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT TOP 30 Id, Name, BasePrice, ImageUrl FROM Products ORDER BY Id ASC"
$reader = $cmd.ExecuteReader()
$products = @()
while ($reader.Read()) {
    $products += @{
        Id = $reader["Id"]
        Name = $reader["Name"]
        Price = [decimal]$reader["BasePrice"]
        ImageUrl = $reader["ImageUrl"]
    }
}
$reader.Close()

$orders = @(
    [PSCustomObject]@{ Code = "AG-2024-7893"; Name = "Nguyen Van Tuan"; Email = "tuan.nguyen@vinfast.vn"; Phone = "+84 912 334 556"; Address = "Can ho 1502, Imperia Garden, 203 Nguyen Huy Tuong, Thanh Xuan, Ha Noi"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-9912837"; Est = "Da giao thanh cong"; Loc = "Da ky nhan tai le tan toa nha"; Method = "The Tin Dung (Visa Signature)"; DaysAgo = 10 },
    [PSCustomObject]@{ Code = "AG-2024-7894"; Name = "Le Hoang Yen"; Email = "yenle.fashion@gmail.com"; Phone = "+84 987 654 321"; Address = "Villa 09, Khu Biet Thu Thao Dien, Quan 2, TP. Ho Chi Minh"; Status = 2; Progress = 3; PayStatus = 1; Carrier = "Aethelgard White-Glove Logistics"; Track = "AG-VIP-00291"; Est = "Du kien giao chieu nay"; Loc = "Dang van chuyen tu Kho Tan Binh"; Method = "VietQR Chuyen Khoan"; DaysAgo = 2 },
    [PSCustomObject]@{ Code = "AG-2024-7895"; Name = "Dang Quoc Hung"; Email = "quochung.dang@fpt.com"; Phone = "+84 903 111 222"; Address = "So 45 Bach Dang, Phuong Thach Thang, Quan Hai Chau, Da Nang"; Status = 1; Progress = 2; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-1029384"; Est = "Du kien giao ngay mai"; Loc = "Da xuat kho boutique chinh hang"; Method = "The Tin Dung (Mastercard World)"; DaysAgo = 1 },
    [PSCustomObject]@{ Code = "AG-2024-7896"; Name = "Vu Thi Huong Thao"; Email = "thaohuong.vu@gmail.com"; Phone = "+84 934 888 777"; Address = "Biet thu PG An Dong, An Duong, Hai Phong"; Status = 0; Progress = 1; PayStatus = 0; Carrier = "Aethelgard Express"; Track = "AG-EXP-883712"; Est = "Dang cho thanh toan"; Loc = "Cho xac nhan don hang"; Method = "Thanh toan khi nhan hang (COD)"; DaysAgo = 0 },
    [PSCustomObject]@{ Code = "AG-2024-7897"; Name = "Bui Minh Tri"; Email = "tri.bui@techcombank.com.vn"; Phone = "+84 919 222 333"; Address = "Park 10, Vinhomes Times City, 458 Minh Khai, Hai Ba Trung, Ha Noi"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-4482910"; Est = "Da giao thanh cong"; Loc = "Nguoi nhan da ky nhan buu pham"; Method = "The Tin Dung (Amex Centurion)"; DaysAgo = 7 },
    [PSCustomObject]@{ Code = "AG-2024-7898"; Name = "Pham Quynh Anh"; Email = "quynhanh.pham@shopee.com"; Phone = "+84 976 555 444"; Address = "Can ho Landmark 81 - Tang 45, 720A Dien Bien Phu, Binh Thanh, TP. Ho Chi Minh"; Status = 2; Progress = 3; PayStatus = 1; Carrier = "Aethelgard White-Glove Logistics"; Track = "AG-VIP-00994"; Est = "Du kien giao ngay 22/09"; Loc = "Trung tam phan loai trung tam Quan 1"; Method = "VietQR Pro"; DaysAgo = 1 },
    [PSCustomObject]@{ Code = "AG-2024-7899"; Name = "Hoang Long Son"; Email = "longson.hoang@masan.com"; Phone = "+84 908 777 666"; Address = "Vincom Shophouse, 209 Duong 30 Thang 4, Xuan Khanh, Ninh Kieu, Can Tho"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-7718293"; Est = "Da giao thanh cong"; Loc = "Da hoan thanh giao hang"; Method = "VietQR Chuyen Khoan"; DaysAgo = 5 },
    [PSCustomObject]@{ Code = "AG-2024-7900"; Name = "Ngo Bao Chau"; Email = "choubao.ngo@gmail.com"; Phone = "+84 918 000 999"; Address = "Toa nha D Le Palais de Louis, 6 Nguyen Van Huyen, Cau Giay, Ha Noi"; Status = 1; Progress = 2; PayStatus = 1; Carrier = "Aethelgard White-Glove Logistics"; Track = "AG-VIP-01048"; Est = "Du kien giao ngay 23/09"; Loc = "Kiem dinh chat luong dong goi hop qua"; Method = "The Tin Dung (Visa Signature)"; DaysAgo = 0 },
    [PSCustomObject]@{ Code = "AG-2024-7901"; Name = "Chu Thi Kim Ngan"; Email = "kimngan.chu@vcb.com.vn"; Phone = "+84 944 555 666"; Address = "Penthouse Muong Thanh Luxury, 60 Tran Phu, Loc Tho, Nha Trang"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-5528190"; Est = "Da giao thanh cong"; Loc = "Khach hang nhan tai sanh chinh"; Method = "The Tin Dung (Mastercard)"; DaysAgo = 12 },
    [PSCustomObject]@{ Code = "AG-2024-7902"; Name = "Duong Quoc Cuong"; Email = "cuong.duong@vingroup.net"; Phone = "+84 905 444 333"; Address = "Bang Lang 04, Vinhomes Riverside The Harmony, Long Bien, Ha Noi"; Status = 2; Progress = 3; PayStatus = 1; Carrier = "Aethelgard White-Glove Logistics"; Track = "AG-VIP-01120"; Est = "Du kien giao trong 48h"; Loc = "Dang tren duong luan chuyen xe chuyen dung"; Method = "VietQR Pro"; DaysAgo = 2 },
    [PSCustomObject]@{ Code = "AG-2024-7903"; Name = "Trinh Mai Trang"; Email = "maitrang.trinh@gmail.com"; Phone = "+84 966 777 888"; Address = "Serenity Sky Villas, 259 Dien Bien Phu, Phuong 7, Quan 3, TP. Ho Chi Minh"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-8819203"; Est = "Da giao thanh cong"; Loc = "Ky nhan an toan"; Method = "The Tin Dung Quoc Te"; DaysAgo = 15 },
    [PSCustomObject]@{ Code = "AG-2024-7904"; Name = "Do Hoang Long"; Email = "hoanglong.do@gmail.com"; Phone = "+84 911 333 444"; Address = "Shophouse Sun Marina Plaza, Bai Chay, Ha Long, Quang Ninh"; Status = 0; Progress = 1; PayStatus = 0; Carrier = "Aethelgard Express"; Track = "AG-EXP-889901"; Est = "Cho xac nhan thanh toan"; Loc = "Cho dieu phoi"; Method = "Chuyen Khoan Ngan Hang"; DaysAgo = 0 }
)

$now = [DateTime]::UtcNow
$idx = 0

foreach ($o in $orders) {
    $checkCmd = $conn.CreateCommand()
    $checkCmd.CommandText = "SELECT COUNT(*) FROM Orders WHERE OrderCode = '$($o.Code)'"
    if ([int]$checkCmd.ExecuteScalar() -gt 0) { continue }

    $p1 = $products[$idx % $products.Count]
    $p2 = $products[($idx + 5) % $products.Count]
    $idx++

    $subtotal = $p1.Price + $p2.Price
    $total = $subtotal
    $d = $now.AddDays(-$o.DaysAgo).ToString("yyyy-MM-dd HH:mm:ss")

    $c = $conn.CreateCommand()
    $c.CommandText = "INSERT INTO Orders (OrderCode, CustomerName, CustomerEmail, CustomerPhone, ShippingAddress, PaymentMethod, Status, PaymentStatus, Carrier, TrackingCode, EstimatedDelivery, LastUpdateLocation, ProgressStep, Subtotal, ShippingCharge, Taxes, Discount, TotalAmount, CreatedAt, UpdatedAt) VALUES ('$($o.Code)', N'$($o.Name)', '$($o.Email)', '$($o.Phone)', N'$($o.Address)', N'$($o.Method)', $($o.Status), $($o.PayStatus), '$($o.Carrier)', '$($o.Track)', N'$($o.Est)', N'$($o.Loc)', $($o.Progress), $subtotal, 0, 0, 0, $total, '$d', '$d'); SELECT SCOPE_IDENTITY();"
    $newId = [int]$c.ExecuteScalar()

    $p1Name = $p1.Name.Replace("'", "''")
    $p2Name = $p2.Name.Replace("'", "''")

    $ci = $conn.CreateCommand()
    $ci.CommandText = "INSERT INTO OrderItems (OrderId, ProductId, ProductName, Specs, ImageUrl, Price, Quantity, Subtotal, CreatedAt, UpdatedAt) VALUES ($newId, $($p1.Id), N'$p1Name', N'Ban Tieu Chuan / Fullbox NFC', '$($p1.ImageUrl)', $($p1.Price), 1, $($p1.Price), '$d', '$d'), ($newId, $($p2.Id), N'$p2Name', N'Ban Cao Cap / Dustbag', '$($p2.ImageUrl)', $($p2.Price), 1, $($p2.Price), '$d', '$d');"
    $ci.ExecuteNonQuery() | Out-Null

    if ($o.PayStatus -eq 1) {
        $ct = $conn.CreateCommand()
        $ct.CommandText = "INSERT INTO Transactions (TransactionCode, CustomerName, ProductName, Status, Quantity, UnitPrice, TotalAmount, CreatedAt, UpdatedAt) VALUES ('#TXN-$($o.Code.Substring(3))', N'$($o.Name)', N'$p1Name', 'Success', 1, $($p1.Price), $total, '$d', '$d');"
        $ct.ExecuteNonQuery() | Out-Null
    }
}
$conn.Close()
Write-Host "Nap thanh cong tat ca don hang bo sung!"
"""

with open("seed_orders_temp.ps1", "w", encoding="ascii", errors="ignore") as f:
    f.write(PS_SCRIPT)

res = subprocess.run(["powershell", "-ExecutionPolicy", "Bypass", "-File", "seed_orders_temp.ps1"], capture_output=True, text=True)
print("Stdout:", res.stdout)
print("Stderr:", res.stderr)
