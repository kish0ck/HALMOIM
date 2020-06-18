
package com.hal.model.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.*;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.hal.config.StorageProperties;
import com.hal.exception.FileStorageException;

@Service
public class ImageService {

	private final Path fileStorageLocation;

	@Autowired
	public ImageService(StorageProperties fileStorageProperties) {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new FileStorageException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", ex);
		}
	}

	public void saveImage(MultipartFile eFile, String subPath, UUID uuid) {
		// 파일 이름
		String fileName = "";
		String fileUri = "";
		FileOutputStream out = null;
		PrintWriter printWriter = null;

		try { // 파일명에 부적합 문자가 있는지 확인한다.
			fileName = StringUtils.cleanPath(eFile.getOriginalFilename());
			byte[] bytes = eFile.getBytes();
			fileUri = fileStorageLocation + "/" + subPath;
			File file = new File(fileUri,uuid+"_"+fileName);
			
			if (fileName.contains("..")) {
				throw new FileStorageException("파일명에 부적합 문자가 포함되어 있습니다. " + fileName);
			}
			if (fileName != null && !fileName.equals("")) {
				if (file.exists()) {
					// 동일한 파일 이름이 존재한다면 copy 대체
					Path targetLocation = this.fileStorageLocation.resolve(fileName);
					Files.copy(eFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
				}
			}
			// 경로 확인후 폴더가 존재하지 않을때 생성
			File path = new File(fileUri);
			if(!path.exists()) path.mkdir();
			
			// 폴더 생성 후 저장
			out = new FileOutputStream(file);
			out.write(bytes);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (printWriter != null) {
					printWriter.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
				throw new FileStorageException("Could not store file " + fileName + ". Please try again!", e);
			}
		}
	}

	public void deleteImage(String imageName) {
		try {
			Path targetLocation = this.fileStorageLocation.resolve(imageName);
			Files.delete(targetLocation);
		} catch (IOException ex) {
			throw new FileStorageException("Could not delete file " + imageName + ". Please try again!", ex);
		}
	}

}
