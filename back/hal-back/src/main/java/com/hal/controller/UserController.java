package com.hal.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hal.model.dto.User;
import com.hal.model.service.ImageService;
import com.hal.model.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userServiceImp;
	@Autowired
	private ImageService imageService;
	
	@ApiOperation(value = "모든 User 목록 조회")
	@GetMapping("")
	public ResponseEntity<Map<String, Object>> userSearchAllList() throws Exception {
	    return handleSuccess(userServiceImp.userSearchAllList());
	}
	
	@ApiOperation(value = "회원가입")
	@PostMapping("")
	public ResponseEntity<Map<String, Object>> addUser(@RequestParam(value="name", required = true) String name
													,  @RequestParam(value="birth", required = true) String birth
													,  @RequestParam(value="gender", required = true) String gender
													,  @RequestParam(value="phone", required = true) String phone
													,  @RequestParam(value="addr", required = true) String addr
													,  @RequestParam(value="myImg", required = false) MultipartFile myImg
													,  @RequestParam(value="latitude", required = true) String latitude
													,  @RequestParam(value="longitude", required = true) String longitude
													) throws Exception {		
		
		String profile_filename = "/images/profile/default.jpg"; // 프로필은 기본사진으로 저장
		String login_filename = "/images/login/";
		if(myImg != null) {
			UUID uuid = UUID.randomUUID();
			login_filename += uuid+"_"+myImg.getOriginalFilename();
			imageService.saveImage(myImg, "login",uuid);
			}
		else login_filename += "default.jpg";
		
		User user = new User(0, name, birth, Integer.parseInt(gender), phone, addr, profile_filename ,login_filename 
				, Double.parseDouble(latitude), Double.parseDouble(longitude), null);
		
		
	    return handleSuccess(userServiceImp.addUser(user));
	}
	
	@ApiOperation(value = "user정보 수정")
	@PutMapping("")
	public ResponseEntity<Map<String, Object>> updateUser( @RequestParam(value="phone", required = true) String phone
													,  @RequestParam(value="addr", required = true) String addr
													,  @RequestParam(value="profileImg", required = false) MultipartFile profileImg
													,  @RequestParam(value="latitude", required = true) String latitude
													,  @RequestParam(value="longitude", required = true) String longitude
													,  @RequestParam(value="description", required = false) String description
													,  @RequestParam(value="uid", required = true) String uid
													) throws Exception {
		String profile_filename = "/images/profile/";
		if(profileImg != null) { // 사진 변경하고자 할 때
			UUID uuid = UUID.randomUUID();
			profile_filename += uuid+"_"+profileImg.getOriginalFilename();
			imageService.saveImage(profileImg, "profile",uuid);
		} else {
			User user = userServiceImp.findUserById(Integer.parseInt(uid));
			profile_filename = user.getProfileImg();
		}
		
		int tmpNum = 0;
		String tmpVal = "";
		User user = new User(Integer.parseInt(uid), tmpVal, tmpVal, tmpNum, phone, addr, profile_filename ,tmpVal
				, Double.parseDouble(latitude), Double.parseDouble(longitude), description);
		
		userServiceImp.updateUser(user);
		
	    return handleSuccess(userServiceImp.findUserById(Integer.parseInt(uid)));
	}
	
	@ApiOperation(value = "모든 회원 폰번호 조회")
	@GetMapping("/phonelist")
	public ResponseEntity<Map<String, Object>> findAllPhoneList() throws Exception {
	    return handleSuccess(userServiceImp.findAllPhone());
	}
	
	@ApiOperation(value = "로그인")
	@GetMapping("/login")
	public ResponseEntity<Map<String, Object>> userLogin(@RequestParam(value="phone", required = true) String phone) throws Exception {
	    return handleSuccess(userServiceImp.userLogin(phone));
	}
	
	@ApiOperation(value = "해당 user의 해당 거리 이내에 있는 모든 user 조회")
	@GetMapping("{uid}/distance/{dis_filter}")
	public ResponseEntity<Map<String, Object>> friendsAllList(@PathVariable int uid, @PathVariable int dis_filter) throws Exception {
		return handleSuccess(userServiceImp.findFriendByDistance(uid, dis_filter));
	}
	
	
	// Fail
	public ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus state) {
	    Map<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("state", "fail");
	    resultMap.put("data", data);
	    return new ResponseEntity<Map<String, Object>>(resultMap, state);
	}

	// Success
	public ResponseEntity<Map<String, Object>> handleSuccess(Object data) {
	    Map<String, Object> resultMap = new HashMap<String, Object>();
	    resultMap.put("state", "ok");
	    resultMap.put("data", data);
	    return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
