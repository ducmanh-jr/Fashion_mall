package com.dmfashion.datatools.controller;

import com.dmfashion.datatools.model.Product;
import com.dmfashion.datatools.repository.ProductRepository;
import com.dmfashion.datatools.service.ExportService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/api/export")
public class ExportController {

    private final ProductRepository productRepository;
    private final ExportService exportService;

    public ExportController(ProductRepository productRepository, ExportService exportService) {
        this.productRepository = productRepository;
        this.exportService = exportService;
    }

    private List<Product> getExportList(String brandId) {
        if (brandId != null && !brandId.isBlank()) {
            return productRepository.findByBrandIdOrderByScrapedAtDesc(brandId);
        }
        return productRepository.findByQuarantinedFalseOrderByScrapedAtDesc();
    }

    @GetMapping("/excel")
    public void exportExcel(@RequestParam(value = "brandId", required = false) String brandId,
                            HttpServletResponse response) throws IOException {
        List<Product> products = getExportList(brandId);
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        String filename = "Fashion_Data_Export_" + System.currentTimeMillis() + ".xlsx";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");
        exportService.exportExcel(response.getOutputStream(), products);
    }

    @GetMapping("/json")
    public void exportJson(@RequestParam(value = "brandId", required = false) String brandId,
                           HttpServletResponse response) throws IOException {
        List<Product> products = getExportList(brandId);
        response.setContentType("application/json; charset=UTF-8");
        String filename = "Fashion_Master_Dump_" + System.currentTimeMillis() + ".json";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");
        exportService.exportJson(response.getOutputStream(), products);
    }

    @GetMapping("/csv")
    public void exportCsv(@RequestParam(value = "brandId", required = false) String brandId,
                          HttpServletResponse response) throws IOException {
        List<Product> products = getExportList(brandId);
        response.setContentType("text/csv; charset=UTF-8");
        String filename = "Fashion_Data_" + System.currentTimeMillis() + ".csv";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");
        exportService.exportCsv(response.getOutputStream(), products);
    }

    @GetMapping("/html")
    public void exportHtml(@RequestParam(value = "brandId", required = false) String brandId,
                           HttpServletResponse response) throws IOException {
        List<Product> products = getExportList(brandId);
        response.setContentType("text/html; charset=UTF-8");
        String filename = "Fashion_Interactive_Report_" + System.currentTimeMillis() + ".html";
        response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");
        exportService.exportHtmlReport(response.getOutputStream(), products);
    }
}
