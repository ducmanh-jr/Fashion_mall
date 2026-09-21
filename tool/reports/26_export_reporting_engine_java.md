# BÁO CÁO 26: EXPORT & REPORTING ENGINE IN JAVA (XUẤT DỮ LIỆU EXCEL / JSON)
**Dự án:** DM Fashion Data Tools (Java Web System)  
**Công nghệ:** Apache POI (SXSSF Streaming Workbook), OpenCSV, Jackson Streaming

---

## 1. Yêu cầu nghiệp vụ
Sau khi cào hoàn tất (ví dụ: cào 3,000 sản phẩm tại Gucci Tràng Tiền Plaza), người dùng muốn:
1. Nhấn nút **"Xuất Excel (.xlsx)"** để tải về bảng dữ liệu đầy đủ, có định dạng đẹp mắt, có ảnh thumbnail nhỏ chèn vào ô, phân tách rõ ràng cột thông tin sản phẩm và cột trạng thái tồn kho của từng chi nhánh.
2. Xuất dữ liệu dung lượng lớn (10,000 - 50,000 dòng) mà không gây tràn bộ nhớ RAM (`OutOfMemoryError`).

---

## 2. Giải pháp Streaming với Apache POI SXSSF
Thư viện Apache POI mặc định (`XSSFWorkbook`) tải toàn bộ dữ liệu vào RAM, gây sập server nếu file lớn hơn 20MB. Hệ thống sử dụng **`SXSSFWorkbook` (Streaming POI)** kết hợp cửa sổ trượt (Sliding Window):

```java
@Service
public class ExcelExportService {

    public void exportToStream(List<ProductExportDto> data, OutputStream outputStream) throws IOException {
        // Giữ 100 dòng trong RAM, các dòng cũ tự động xả xuống file tạm trên đĩa
        try (SXSSFWorkbook workbook = new SXSSFWorkbook(100)) {
            SXSSFSheet sheet = workbook.createSheet("Fashion Inventory Data");
            
            // 1. Tạo Header có màu sắc thương hiệu
            Row headerRow = sheet.createRow(0);
            String[] headers = {
                "Mã SKU", "Thương hiệu", "Tên sản phẩm", "Chi nhánh", 
                "Tồn kho", "Giá bán (VND)", "Màu sắc", "Kích cỡ", "Link Ảnh", "Link Gốc"
            };
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            // 2. Ghi từng dòng dữ liệu tuần tự
            int rowNum = 1;
            for (ProductExportDto item : data) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(item.sku());
                row.createCell(1).setCellValue(item.brand());
                row.createCell(2).setCellValue(item.productName());
                row.createCell(3).setCellValue(item.storeName());
                row.createCell(4).setCellValue(item.stockStatus());
                row.createCell(5).setCellValue(item.price() != null ? item.price().doubleValue() : 0);
                row.createCell(6).setCellValue(item.color());
                row.createCell(7).setCellValue(item.size());
                row.createCell(8).setCellValue(item.primaryImageUrl());
                row.createCell(9).setCellValue(item.canonicalUrl());
            }

            workbook.write(outputStream);
            workbook.dispose(); // Dọn dẹp file tạm trên ổ cứng
        }
    }
}
```

---

## 3. Các định dạng xuất dữ liệu hỗ trợ
1. **Excel (.xlsx):** Dành cho bộ phận kinh doanh, kiểm kê kho, đối chiếu giá thị trường.
2. **CSV (UTF-8 with BOM):** Tương thích hoàn hảo với Microsoft Excel tiếng Việt (không bị lỗi font có dấu).
3. **JSON Master Dump:** Xuất nguyên vẹn cấu trúc lồng nhau (Nested JSON Schema) để nhập vào các hệ thống AI hoặc Database khác.
