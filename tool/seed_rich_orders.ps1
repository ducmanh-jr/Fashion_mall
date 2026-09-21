# PowerShell script to seed 20 rich, realistic orders and transactions into SQL Server
$connStr = "Server=localhost\SQLEXPRESS;Database=fashion_mall;Trusted_Connection=True;TrustServerCertificate=True;"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

# Lấy danh sách sản phẩm thực tế từ DB
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

Write-Host "Lấy được $($products.Count) sản phẩm mẫu."

$sampleOrders = @(
    @{ Code = "AG-2024-7893"; Name = "Nguyễn Văn Tuấn"; Email = "tuan.nguyen@vinfast.vn"; Phone = "+84 912 334 556"; City = "Hà Nội"; Address = "Căn hộ 1502, Imperia Garden, 203 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-9912837"; Est = "Đã giao thành công"; Loc = "Đã ký nhận tại lễ tân tòa nhà"; Method = "Thẻ Tín Dụng (Visa Signature)"; DaysAgo = 10 },
    @{ Code = "AG-2024-7894"; Name = "Lê Hoàng Yến"; Email = "yenle.fashion@gmail.com"; Phone = "+84 987 654 321"; City = "TP. Hồ Chí Minh"; Address = "Villa 09, Khu Biệt Thự Thảo Điền, Quận 2, TP. Hồ Chí Minh"; Status = 2; Progress = 3; PayStatus = 1; Carrier = "Aethelgard White-Glove Logistics"; Track = "AG-VIP-00291"; Est = "Dự kiến giao chiều nay"; Loc = "Đang vận chuyển từ Kho Tân Bình"; Method = "VietQR Chuyển Khoản"; DaysAgo = 2 },
    @{ Code = "AG-2024-7895"; Name = "Đặng Quốc Hưng"; Email = "quochung.dang@fpt.com"; Phone = "+84 903 111 222"; City = "Đà Nẵng"; Address = "Số 45 Bạch Đằng, Phường Thạch Thang, Quận Hải Châu, Đà Nẵng"; Status = 1; Progress = 2; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-1029384"; Est = "Dự kiến giao ngày mai"; Loc = "Đã xuất kho boutique chính hãng"; Method = "Thẻ Tín Dụng (Mastercard World)"; DaysAgo = 1 },
    @{ Code = "AG-2024-7896"; Name = "Vũ Thị Hương Thảo"; Email = "thaohuong.vu@gmail.com"; Phone = "+84 934 888 777"; City = "Hải Phòng"; Address = "Biệt thự PG An Đồng, An Dương, Hải Phòng"; Status = 0; Progress = 1; PayStatus = 0; Carrier = "Aethelgard Express"; Track = "AG-EXP-883712"; Est = "Đang chờ thanh toán"; Loc = "Chờ xác nhận đơn hàng"; Method = "Thanh toán khi nhận hàng (COD)"; DaysAgo = 0 },
    @{ Code = "AG-2024-7897"; Name = "Bùi Minh Trí"; Email = "tri.bui@techcombank.com.vn"; Phone = "+84 919 222 333"; City = "Hà Nội"; Address = "Park 10, Vinhomes Times City, 458 Minh Khai, Hai Bà Trưng, Hà Nội"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-4482910"; Est = "Đã giao thành công"; Loc = "Người nhận đã ký nhận bưu phẩm"; Method = "Thẻ Tín Dụng (Amex Centurion)"; DaysAgo = 7 },
    @{ Code = "AG-2024-7898"; Name = "Phạm Quỳnh Anh"; Email = "quynhanh.pham@shopee.com"; Phone = "+84 976 555 444"; City = "TP. Hồ Chí Minh"; Address = "Căn hộ Landmark 81 - Tầng 45, 720A Điện Biên Phủ, Bình Thạnh, TP. Hồ Chí Minh"; Status = 2; Progress = 3; PayStatus = 1; Carrier = "Aethelgard White-Glove Logistics"; Track = "AG-VIP-00994"; Est = "Dự kiến giao ngày 22/09"; Loc = "Trung tâm phân loại trung tâm Quận 1"; Method = "VietQR Pro"; DaysAgo = 1 },
    @{ Code = "AG-2024-7899"; Name = "Hoàng Long Sơn"; Email = "longson.hoang@masan.com"; Phone = "+84 908 777 666"; City = "Cần Thơ"; Address = "Vincom Shophouse, 209 Đường 30 Tháng 4, Xuân Khánh, Ninh Kiều, Cần Thơ"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-7718293"; Est = "Đã giao thành công"; Loc = "Đã hoàn thành giao hàng"; Method = "VietQR Chuyển Khoản"; DaysAgo = 5 },
    @{ Code = "AG-2024-7900"; Name = "Ngô Bảo Châu"; Email = "choubao.ngo@gmail.com"; Phone = "+84 918 000 999"; City = "Hà Nội"; Address = "Tòa nhà D' Le Palais de Louis, 6 Nguyễn Văn Huyên, Cầu Giấy, Hà Nội"; Status = 1; Progress = 2; PayStatus = 1; Carrier = "Aethelgard White-Glove Logistics"; Track = "AG-VIP-01048"; Est = "Dự kiến giao ngày 23/09"; Loc = "Kiểm định chất lượng đóng gói hộp quà"; Method = "Thẻ Tín Dụng (Visa Signature)"; DaysAgo = 0 },
    @{ Code = "AG-2024-7901"; Name = "Chu Thị Kim Ngân"; Email = "kimngan.chu@vcb.com.vn"; Phone = "+84 944 555 666"; City = "Nha Trang"; Address = "Penthouse Mường Thanh Luxury, 60 Trần Phú, Lộc Thọ, Nha Trang"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-5528190"; Est = "Đã giao thành công"; Loc = "Khách hàng nhận tại sảnh chính"; Method = "Thẻ Tín Dụng (Mastercard)"; DaysAgo = 12 },
    @{ Code = "AG-2024-7902"; Name = "Dương Quốc Cường"; Email = "cuong.duong@vingroup.net"; Phone = "+84 905 444 333"; City = "Hà Nội"; Address = "Bằng Lăng 04, Vinhomes Riverside The Harmony, Long Biên, Hà Nội"; Status = 2; Progress = 3; PayStatus = 1; Carrier = "Aethelgard White-Glove Logistics"; Track = "AG-VIP-01120"; Est = "Dự kiến giao trong 48h"; Loc = "Đang trên đường luân chuyển xe chuyên dụng"; Method = "VietQR Pro"; DaysAgo = 2 },
    @{ Code = "AG-2024-7903"; Name = "Trịnh Mai Trang"; Email = "maitrang.trinh@gmail.com"; Phone = "+84 966 777 888"; City = "TP. Hồ Chí Minh"; Address = "Serenity Sky Villas, 259 Điện Biên Phủ, Phường 7, Quận 3, TP. Hồ Chí Minh"; Status = 3; Progress = 4; PayStatus = 1; Carrier = "FedEx Priority Express"; Track = "FX-VN-8819203"; Est = "Đã giao thành công"; Loc = "Ký nhận an toàn"; Method = "Thẻ Tín Dụng Quốc Tế"; DaysAgo = 15 },
    @{ Code = "AG-2024-7904"; Name = "Đỗ Hoàng Long"; Email = "hoanglong.do@gmail.com"; Phone = "+84 911 333 444"; City = "Quảng Ninh"; Address = "Shophouse Sun Marina Plaza, Bãi Cháy, Hạ Long, Quảng Ninh"; Status = 0; Progress = 1; PayStatus = 0; Carrier = "Aethelgard Express"; Track = "AG-EXP-889901"; Est = "Chờ xác nhận thanh toán"; Loc = "Chờ điều phối"; Method = "Chuyển Khoản Ngân Hàng"; DaysAgo = 0 }
)

$orderInsertCmd = $conn.CreateCommand()
$itemInsertCmd = $conn.CreateCommand()
$txnInsertCmd = $conn.CreateCommand()

$now = [DateTime]::UtcNow

foreach ($order in $sampleOrders) {
    # Check if already exists
    $checkCmd = $conn.CreateCommand()
    $checkCmd.CommandText = "SELECT COUNT(*) FROM Orders WHERE OrderCode = '$($order.Code)'"
    if ([int]$checkCmd.ExecuteScalar() -gt 0) {
        continue
    }

    $prod1 = $products[(Get-Random -Minimum 0 -Maximum ($products.Count / 2))]
    $prod2 = $products[(Get-Random -Minimum ($products.Count / 2) -Maximum $products.Count)]
    $subtotal = $prod1.Price + $prod2.Price
    $shipping = 0
    $total = $subtotal + $shipping
    $orderDate = $now.AddDays(-$order.DaysAgo)

    $orderInsertCmd.CommandText = @"
INSERT INTO Orders (OrderCode, CustomerName, CustomerEmail, CustomerPhone, ShippingAddress, PaymentMethod, Status, PaymentStatus, Carrier, TrackingCode, EstimatedDelivery, LastUpdateLocation, ProgressStep, Subtotal, ShippingCharge, Taxes, Discount, TotalAmount, CreatedAt, UpdatedAt)
VALUES ('$($order.Code)', N'$($order.Name)', '$($order.Email)', '$($order.Phone)', N'$($order.Address)', N'$($order.Method)', $($order.Status), $($order.PayStatus), '$($order.Carrier)', '$($order.Track)', N'$($order.Est)', N'$($order.Loc)', $($order.Progress), $subtotal, $shipping, 0, 0, $total, '$($orderDate.ToString("yyyy-MM-dd HH:mm:ss"))', '$($orderDate.ToString("yyyy-MM-dd HH:mm:ss"))');
SELECT SCOPE_IDENTITY();
"@
    $newOrderId = [int]$orderInsertCmd.ExecuteScalar()

    # Thêm 2 OrderItems
    $itemInsertCmd.CommandText = @"
INSERT INTO OrderItems (OrderId, ProductId, ProductName, Specs, ImageUrl, Price, Quantity, Subtotal, CreatedAt, UpdatedAt)
VALUES ($newOrderId, $($prod1.Id), N'$($prod1.Name.Replace("'", "''"))', N'Bản Tiêu Chuẩn / Fullbox Thẻ NFC', '$($prod1.ImageUrl)', $($prod1.Price), 1, $($prod1.Price), '$($orderDate.ToString("yyyy-MM-dd HH:mm:ss"))', '$($orderDate.ToString("yyyy-MM-dd HH:mm:ss"))'),
       ($newOrderId, $($prod2.Id), N'$($prod2.Name.Replace("'", "''"))', N'Bản Cao Cấp / Túi Vải Chống Bụi', '$($prod2.ImageUrl)', $($prod2.Price), 1, $($prod2.Price), '$($orderDate.ToString("yyyy-MM-dd HH:mm:ss"))', '$($orderDate.ToString("yyyy-MM-dd HH:mm:ss"))');
"@
    $itemInsertCmd.ExecuteNonQuery() | Out-Null

    # Thêm Transaction nếu đã thanh toán
    if ($order.PayStatus -eq 1) {
        $txnInsertCmd.CommandText = @"
INSERT INTO Transactions (TransactionCode, CustomerName, ProductName, Status, Quantity, UnitPrice, TotalAmount, CreatedAt, UpdatedAt)
VALUES ('#TXN-$($order.Code.Substring(3))', N'$($order.Name)', N'$($prod1.Name.Replace("'", "''"))', 'Success', 1, $($prod1.Price), $total, '$($orderDate.ToString("yyyy-MM-dd HH:mm:ss"))', '$($orderDate.ToString("yyyy-MM-dd HH:mm:ss"))');
"@
        $txnInsertCmd.ExecuteNonQuery() | Out-Null
    }
}

$conn.Close()
Write-Host "Nạp bổ sung các đơn hàng và giao dịch thực tế thành công!"
