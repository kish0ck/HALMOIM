package com.hal.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hal.model.dto.Moim;
import com.hal.model.dto.MoimRequestDto;
import com.hal.model.dto.ParticipateRequestDto;
import com.hal.model.service.ImageService;
import com.hal.model.service.MoimService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
@RequestMapping("/moims")
public class MoimController {
	@Autowired
	private MoimService moimService;
	@Autowired
	private ImageService imgService;

	@ApiOperation(value = "해당 유저 거리 내 모임방 목록 전체 조회")
	@GetMapping("/{uid}/distance/{dis_filter}")
	public ResponseEntity<Map<String, Object>> moimFindAllList(@PathVariable int uid, @PathVariable int dis_filter) {
		return new ResponseEntity<Map<String, Object>>(moimService.findMoimByDist(uid, dis_filter), HttpStatus.OK);
	}

	@ApiOperation(value = "모임방 만들기")
	@PostMapping("")
	public ResponseEntity<Map<String, Object>> moimAdd(@RequestParam(name = "mid") int mid,
			@RequestParam(name = "title") String title, @RequestParam(name = "time") String time,
			@RequestParam(name = "location") String location, @RequestParam(name = "state") boolean state,
			@RequestParam(name = "latitude") String latitude, @RequestParam(name = "longitude") String longitude,
			@RequestParam(name = "coment") String coment,
			@RequestParam(name = "file", required = false) MultipartFile file, @RequestParam(name = "uid") int uid) {
		String fileName = "";
		if (file != null) {
			UUID uuid = UUID.randomUUID();
			fileName = "/images/moim/" + uuid+"_"+file.getOriginalFilename();
			imgService.saveImage(file, "moim",uuid);
		}else {
			fileName = "/images/moim/default.jpg";
		}
		MoimRequestDto requestMoim = new MoimRequestDto(0, title, time, location, state, Double.parseDouble(latitude),
				Double.parseDouble(longitude), coment, fileName, uid);
		return new ResponseEntity<Map<String, Object>>(moimService.addMoim(uid, requestMoim), HttpStatus.OK);
	}

	@ApiOperation(value = "모임방 상태 변화 (폭파)")
	@PutMapping("")
	public ResponseEntity<Map<String, Object>> moimUpdate(@RequestBody Moim moim) {
		return new ResponseEntity<Map<String, Object>>(moimService.updateMoim(moim), HttpStatus.OK);
	}

	@ApiOperation(value = "해당 모임에 특정 사용자 참여 추가 기능")
	@PostMapping("/participate")
	public ResponseEntity<Map<String, Object>> moimUpdateParticipate(@RequestBody ParticipateRequestDto part) {
		return new ResponseEntity<Map<String, Object>>(moimService.addParticipate(part), HttpStatus.OK);
	}

	@ApiOperation(value = "해당 모임에 특정 사용자 참여 삭제 기능")
	@DeleteMapping("/{mid}/users/{uid}/participate")
	public ResponseEntity<Map<String, Object>> moimUpdateParticipate(@PathVariable int uid, @PathVariable int mid) {
		return new ResponseEntity<Map<String, Object>>(moimService.deleteParticipate(uid, mid), HttpStatus.OK);
	}

	@ApiOperation(value = "해당 모임에 참여한 유저 목록 전체 조회")
	@GetMapping("/{mid}/participate")
	public ResponseEntity<Map<String, Object>> moimFindParticipateAllUsers(@PathVariable int mid) {
		return new ResponseEntity<Map<String, Object>>(moimService.findUsersByMid(mid), HttpStatus.OK);
	}

	@ApiOperation(value = "해당 유저가 참여한 모임 목록 조회")
	@GetMapping("/users/{uid}/participate")
	public ResponseEntity<Map<String, Object>> moimFindParticipateByUsers(@PathVariable int uid) {
		return new ResponseEntity<Map<String, Object>>(moimService.findPartsByUid(uid), HttpStatus.OK);
	}
	
	@ApiOperation(value = "해당 유저가 생성한 모임 목록 조회")
	@GetMapping("/make/users/{uid}")
	public ResponseEntity<Map<String, Object>> moimFindListByMe(@PathVariable int uid) {
		return new ResponseEntity<Map<String, Object>>(moimService.findMoimByMe(uid), HttpStatus.OK);
	}
	
	@ApiOperation(value = "해당 유저가 참가한 모임 목록 조회")
	@GetMapping("/join/users/{uid}")
	public ResponseEntity<Map<String, Object>> moimFindListByOther(@PathVariable int uid) {
		return new ResponseEntity<Map<String, Object>>(moimService.findMoimByOther(uid), HttpStatus.OK);
	}

}
