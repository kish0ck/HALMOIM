package com.hal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

//application.properties에 선언한 file.upload-dir에 접근함.
@Component
@ConfigurationProperties(prefix = "file")
public class StorageProperties {
	
	private String uploadDir;

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }
}
