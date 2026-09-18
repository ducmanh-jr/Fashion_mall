package com.dmfashion.datatools.service;

import com.dmfashion.datatools.model.Product;
import com.dmfashion.datatools.model.StoreInventory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExportService {

    private final ObjectMapper objectMapper;

    public ExportService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
    }

    // 1. Export Excel Multi-Sheet (SXSSF Streaming)
    public void exportExcel(OutputStream outputStream, List<Product> products) throws IOException {
        try (SXSSFWorkbook workbook = new SXSSFWorkbook(100)) {
            // Cell Styles
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);

            // --- SHEET 1: Dữ Liệu Sản Phẩm Toàn Diện ---
            SXSSFSheet sheet1 = workbook.createSheet("Dữ Liệu Sản Phẩm Toàn Diện");
            String[] headers1 = {
                "Mã SKU", "Thương hiệu", "Tên sản phẩm", "Bộ sưu tập", "Danh mục", "Giá niêm yết (VND)",
                "Giá gốc ngoại tệ", "Tiền tệ", "Màu sắc", "Phụ kiện kim loại", "Kích cỡ", "Chất liệu chính",
                "Chất liệu lót", "Kích thước túi/đo", "Chiều dài quai đeo", "Xuất xứ", "Mô tả chi tiết",
                "Hướng dẫn bảo quản", "Phụ kiện & Hộp đi kèm", "Điểm chất lượng", "Link hình ảnh", "Link website gốc"
            };

            Row headerRow1 = sheet1.createRow(0);
            for (int i = 0; i < headers1.length; i++) {
                Cell cell = headerRow1.createCell(i);
                cell.setCellValue(headers1[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowIdx1 = 1;
            for (Product p : products) {
                Row row = sheet1.createRow(rowIdx1++);
                row.createCell(0).setCellValue(p.getSku() != null ? p.getSku() : "");
                row.createCell(1).setCellValue(p.getBrandId() != null ? p.getBrandId().toUpperCase() : "");
                row.createCell(2).setCellValue(p.getProductName() != null ? p.getProductName() : "");
                row.createCell(3).setCellValue(p.getCollectionName() != null ? p.getCollectionName() : "");
                row.createCell(4).setCellValue(p.getCategory() != null ? p.getCategory() : "");
                row.createCell(5).setCellValue(p.getPriceVnd() != null ? p.getPriceVnd().doubleValue() : 0.0);
                row.createCell(6).setCellValue(p.getPriceOriginal() != null ? p.getPriceOriginal().doubleValue() : 0.0);
                row.createCell(7).setCellValue(p.getCurrency() != null ? p.getCurrency() : "VND");
                row.createCell(8).setCellValue(p.getColor() != null ? p.getColor() : "");
                row.createCell(9).setCellValue(p.getHardwareColor() != null ? p.getHardwareColor() : "");
                row.createCell(10).setCellValue(p.getSize() != null ? p.getSize() : "");
                row.createCell(11).setCellValue(p.getMaterial() != null ? p.getMaterial() : "");
                row.createCell(12).setCellValue(p.getLiningMaterial() != null ? p.getLiningMaterial() : "");
                row.createCell(13).setCellValue(p.getDimensions() != null ? p.getDimensions() : "");
                row.createCell(14).setCellValue(p.getStrapDrop() != null ? p.getStrapDrop() : "");
                row.createCell(15).setCellValue(p.getCountryOfOrigin() != null ? p.getCountryOfOrigin() : "");
                row.createCell(16).setCellValue(p.getDescription() != null ? p.getDescription() : "");
                row.createCell(17).setCellValue(p.getCareInstructions() != null ? p.getCareInstructions() : "");
                row.createCell(18).setCellValue(p.getPackagingDetails() != null ? p.getPackagingDetails() : "");
                row.createCell(19).setCellValue(p.getQualityScore() != null ? p.getQualityScore() : 0.0);
                row.createCell(20).setCellValue(p.getPrimaryImageUrl() != null ? p.getPrimaryImageUrl() : "");
                row.createCell(21).setCellValue(p.getProductUrl() != null ? p.getProductUrl() : "");
            }

            // --- SHEET 2: Tồn Kho Chi Nhánh ---
            SXSSFSheet sheet2 = workbook.createSheet("Tồn Kho Chi Nhánh");
            String[] headers2 = {
                "Mã SKU", "Tên sản phẩm", "Mã Store", "Tên Chi Nhánh", "Trạng thái kho", "Số lượng tồn", "Thời điểm kiểm tra"
            };

            Row headerRow2 = sheet2.createRow(0);
            for (int i = 0; i < headers2.length; i++) {
                Cell cell = headerRow2.createCell(i);
                cell.setCellValue(headers2[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowIdx2 = 1;
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            for (Product p : products) {
                if (p.getInventories() != null && !p.getInventories().isEmpty()) {
                    for (StoreInventory inv : p.getInventories()) {
                        Row row = sheet2.createRow(rowIdx2++);
                        row.createCell(0).setCellValue(p.getSku() != null ? p.getSku() : "");
                        row.createCell(1).setCellValue(p.getProductName() != null ? p.getProductName() : "");
                        row.createCell(2).setCellValue(inv.getStoreId() != null ? inv.getStoreId() : "");
                        row.createCell(3).setCellValue(inv.getStoreName() != null ? inv.getStoreName() : "");
                        row.createCell(4).setCellValue(inv.getStockStatus() != null ? inv.getStockStatus() : "");
                        row.createCell(5).setCellValue(inv.getAvailableQty() != null ? inv.getAvailableQty().toString() : "Liên hệ store");
                        row.createCell(6).setCellValue(inv.getLastCheckedAt() != null ? inv.getLastCheckedAt().format(dtf) : "");
                    }
                }
            }

            workbook.write(outputStream);
            workbook.dispose();
        }
    }

    // 2. Export Master JSON
    public void exportJson(OutputStream outputStream, List<Product> products) throws IOException {
        objectMapper.writeValue(outputStream, products);
    }

    // 3. Export CSV (UTF-8 with BOM)
    public void exportCsv(OutputStream outputStream, List<Product> products) throws IOException {
        // Write UTF-8 BOM
        outputStream.write(new byte[]{(byte) 0xEF, (byte) 0xBB, (byte) 0xBF}, 0, 3);
        PrintWriter writer = new PrintWriter(outputStream, true, StandardCharsets.UTF_8);

        writer.println("SKU,Brand,ProductName,Category,PriceVND,Color,Size,Material,Dimensions,Origin,QualityScore,ImageUrl,ProductUrl");
        for (Product p : products) {
            writer.printf("\"%s\",\"%s\",\"%s\",\"%s\",%.0f,\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",%.1f,\"%s\",\"%s\"%n",
                escapeCsv(p.getSku()),
                escapeCsv(p.getBrandId()),
                escapeCsv(p.getProductName()),
                escapeCsv(p.getCategory()),
                p.getPriceVnd() != null ? p.getPriceVnd().doubleValue() : 0.0,
                escapeCsv(p.getColor()),
                escapeCsv(p.getSize()),
                escapeCsv(p.getMaterial()),
                escapeCsv(p.getDimensions()),
                escapeCsv(p.getCountryOfOrigin()),
                p.getQualityScore() != null ? p.getQualityScore() : 0.0,
                escapeCsv(p.getPrimaryImageUrl()),
                escapeCsv(p.getProductUrl())
            );
        }
        writer.flush();
    }

    // 4. Export Standalone Interactive HTML Report
    public void exportHtmlReport(OutputStream outputStream, List<Product> products) {
        PrintWriter writer = new PrintWriter(outputStream, true, StandardCharsets.UTF_8);
        DecimalFormat df = new DecimalFormat("#,###");

        writer.println("<!DOCTYPE html>");
        writer.println("<html lang='vi'><head><meta charset='UTF-8'>");
        writer.println("<title>Báo Cáo Thời Trang Độc Lập - DM Fashion Tools</title>");
        writer.println("<script src='https://cdn.tailwindcss.com'></script>");
        writer.println("<link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' rel='stylesheet'>");
        writer.println("</head><body class='bg-slate-50 text-slate-800 p-6 min-h-screen'>");
        
        writer.println("<div class='max-w-7xl mx-auto'>");
        writer.println("<header class='flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-200 mb-8'>");
        writer.println("  <div>");
        writer.println("    <h1 class='text-2xl font-bold text-slate-900 flex items-center gap-2'><i class='fa-solid fa-gem text-indigo-600'></i> Báo Cáo Dữ Liệu Thời Trang Cao Cấp</h1>");
        writer.println("    <p class='text-slate-500 text-sm mt-1'>Hệ thống xuất tự động từ DM Fashion Data Tools • Tổng số: " + products.size() + " sản phẩm</p>");
        writer.println("  </div>");
        writer.println("  <div class='mt-4 sm:mt-0 flex gap-2'>");
        writer.println("    <button onclick='window.print()' class='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition shadow'><i class='fa-solid fa-print mr-1'></i> In Báo Cáo</button>");
        writer.println("  </div>");
        writer.println("</header>");

        // Products Grid
        writer.println("<div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>");
        for (Product p : products) {
            String formattedPrice = p.getPriceVnd() != null ? df.format(p.getPriceVnd()) + " ₫" : "Liên hệ";
            String scoreBadgeClass = (p.getQualityScore() != null && p.getQualityScore() >= 90) ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800";

            writer.println("<div class='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition'>");
            writer.println("  <div class='relative h-64 bg-slate-100 overflow-hidden group'>");
            if (p.getPrimaryImageUrl() != null && !p.getPrimaryImageUrl().isEmpty()) {
                writer.println("    <img src='" + p.getPrimaryImageUrl() + "' alt='" + escapeHtml(p.getProductName()) + "' class='w-full h-full object-cover group-hover:scale-105 transition duration-300' onerror=\"this.src='https://placehold.co/400x400?text=No+Image'\">");
            } else {
                writer.println("    <div class='w-full h-full flex items-center justify-center text-slate-400'><i class='fa-solid fa-image text-4xl'></i></div>");
            }
            writer.println("    <div class='absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold " + scoreBadgeClass + "'>" + (p.getQualityScore() != null ? p.getQualityScore().intValue() + "đ" : "90đ") + "</div>");
            writer.println("    <div class='absolute top-2 left-2 px-2 py-1 bg-black/70 text-white rounded text-xs font-bold uppercase tracking-wider'>" + escapeHtml(p.getBrandId()) + "</div>");
            writer.println("  </div>");

            writer.println("  <div class='p-4 flex-1 flex flex-col justify-between'>");
            writer.println("    <div>");
            writer.println("      <div class='text-xs text-indigo-600 font-semibold mb-1'>" + (p.getCategory() != null ? escapeHtml(p.getCategory()) : "Thời trang") + " • SKU: " + escapeHtml(p.getSku()) + "</div>");
            writer.println("      <h2 class='font-bold text-slate-800 text-sm line-clamp-2 mb-2' title='" + escapeHtml(p.getProductName()) + "'>" + escapeHtml(p.getProductName()) + "</h2>");
            writer.println("      <div class='text-lg font-extrabold text-rose-600 mb-3'>" + formattedPrice + "</div>");
            
            if (p.getMaterial() != null && !p.getMaterial().isEmpty()) {
                writer.println("      <p class='text-xs text-slate-500 mb-1'><strong class='text-slate-700'>Chất liệu:</strong> " + escapeHtml(p.getMaterial()) + "</p>");
            }
            if (p.getDimensions() != null && !p.getDimensions().isEmpty()) {
                writer.println("      <p class='text-xs text-slate-500 mb-1'><strong class='text-slate-700'>Kích thước:</strong> " + escapeHtml(p.getDimensions()) + "</p>");
            }
            if (p.getColor() != null && !p.getColor().isEmpty()) {
                writer.println("      <p class='text-xs text-slate-500 mb-1'><strong class='text-slate-700'>Màu:</strong> " + escapeHtml(p.getColor()) + "</p>");
            }
            writer.println("    </div>");

            // Inventory status list
            if (p.getInventories() != null && !p.getInventories().isEmpty()) {
                writer.println("    <div class='mt-4 pt-3 border-t border-slate-100 text-xs'>");
                writer.println("      <div class='font-semibold text-slate-700 mb-1'>Tình trạng tại cửa hàng:</div>");
                for (StoreInventory inv : p.getInventories()) {
                    String statusBadge = "IN_STOCK".equalsIgnoreCase(inv.getStockStatus()) || "FEW_PIECES".equalsIgnoreCase(inv.getStockStatus())
                        ? "<span class='text-emerald-700 font-bold'>● Còn hàng</span>"
                        : "<span class='text-slate-400'>○ Hết hàng</span>";
                    writer.println("      <div class='flex justify-between py-0.5'><span class='truncate text-slate-600 max-w-[160px]'>" + escapeHtml(inv.getStoreName()) + "</span>" + statusBadge + "</div>");
                }
                writer.println("    </div>");
            }

            if (p.getProductUrl() != null && !p.getProductUrl().isEmpty()) {
                writer.println("    <div class='mt-3 pt-2 text-right'>");
                writer.println("      <a href='" + p.getProductUrl() + "' target='_blank' class='text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1'>Xem web hãng <i class='fa-solid fa-arrow-up-right-from-square'></i></a>");
                writer.println("    </div>");
            }

            writer.println("  </div>");
            writer.println("</div>");
        }
        writer.println("</div>");

        writer.println("</div></body></html>");
        writer.flush();
    }

    private String escapeCsv(String val) {
        if (val == null) return "";
        return val.replace("\"", "\"\"");
    }

    private String escapeHtml(String val) {
        if (val == null) return "";
        return val.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;");
    }
}
