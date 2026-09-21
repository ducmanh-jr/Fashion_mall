package com.dmfashion.datatools.controller;

import com.dmfashion.datatools.model.Brand;
import com.dmfashion.datatools.repository.BrandRepository;
import com.dmfashion.datatools.repository.ProductRepository;
import com.dmfashion.datatools.repository.QuarantineRecordRepository;
import com.dmfashion.datatools.repository.ScrapeJobRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class WebController {

    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    private final ScrapeJobRepository jobRepository;
    private final QuarantineRecordRepository quarantineRepository;

    public WebController(BrandRepository brandRepository,
                         ProductRepository productRepository,
                         ScrapeJobRepository jobRepository,
                         QuarantineRecordRepository quarantineRepository) {
        this.brandRepository = brandRepository;
        this.productRepository = productRepository;
        this.jobRepository = jobRepository;
        this.quarantineRepository = quarantineRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<Brand> topBrands = brandRepository.findAll().stream().limit(12).toList();
        model.addAttribute("topBrands", topBrands);
        model.addAttribute("totalBrands", brandRepository.count());
        model.addAttribute("totalProducts", productRepository.count());
        model.addAttribute("totalQuarantined", quarantineRepository.count());
        model.addAttribute("latestJob", jobRepository.findTopByOrderByStartedAtDesc().orElse(null));
        return "index";
    }
}
