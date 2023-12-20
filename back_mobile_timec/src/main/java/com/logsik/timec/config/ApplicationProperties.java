package com.logsik.timec.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Created by phamcongbang on 31/05/2018.
 */
@Configuration
public class ApplicationProperties {
    @Value("${spring.profiles.active}")
    private String productionMode;

    public ProductionMode getProductionMode() {
        return ProductionMode.valueOf(productionMode);
    }
}
