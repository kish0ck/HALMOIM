package com.hal.model.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hal.model.dao.MoimRepository;
import com.hal.model.dao.ParticipateRepository;
import com.hal.model.dao.UserRepository;
import com.hal.model.dto.Moim;
import com.hal.model.dto.MoimRequestDto;
import com.hal.model.dto.MoimResponseDto;
import com.hal.model.dto.Participate;
import com.hal.model.dto.ParticipateRequestDto;
import com.hal.model.dto.ParticipateResponseDto;
import com.hal.model.dto.User;
import com.hal.model.dto.UserResponseDto;

@Service
public class MoimServiceImp implements MoimService {

	@Autowired
	UserRepository ur;
	@Autowired
	MoimRepository mr;
	@Autowired
	ParticipateRepository pr;
	
	// dis_filter는 거리기반 1,3,5km
	@Override
	public Map<String,Object> findMoimByDist(int uid,int dis_filter) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			User client = ur.findById(uid).orElseThrow(IllegalArgumentException::new);
			List<Moim> moims = mr.findByHostNotAndTimeAfterOrderByTimeDesc(client, new Date());
			List<MoimResponseDto> result = new ArrayList<>();
			double user_lat = client.getLatitude();
			double user_long = client.getLongitude();
			
			double radius = 6371; // 지구 반지름(km)
		    double toRadian = Math.PI / 180;
		    
		    double distance;
			for (Moim moim : moims) {
				double moim_lat = moim.getLatitude();
				double moim_long = moim.getLongitude();
				double deltaLatitude = Math.abs(user_lat - moim_lat) * toRadian;
			    double deltaLongitude = Math.abs(user_long - moim_long) * toRadian;

			    double sinDeltaLat = Math.sin(deltaLatitude / 2);
			    double sinDeltaLng = Math.sin(deltaLongitude / 2);
			    double squareRoot = Math.sqrt(
			        sinDeltaLat * sinDeltaLat +
			        Math.cos(user_lat * toRadian) * Math.cos(moim_lat * toRadian) * sinDeltaLng * sinDeltaLng);

			    distance = 2 * radius * Math.asin(squareRoot);
			    if(distance <= dis_filter) {
			    	MoimResponseDto tmpMoim = MoimResponseDto.builder()
			    			.mid(moim.getMid())
			    			.title(moim.getTitle())
			    			.time(moim.getTime())
			    			.location(moim.getLocation())
			    			.state(moim.isState())
			    			.latitude(moim_lat)
			    			.longitude(moim_long)
			    			.host(moim.getHost())
			    			.distance(Math.round(distance*10)/10.0)
			    			.count(pr.countByMoimMid(moim.getMid()))
			    			.coment(moim.getComent())
			    			.moimImg(moim.getMoimImg())
			    			.build();
			    	result.add(tmpMoim);
			    }
			}
			// result distance로 정렬
			Collections.sort(result, new Comparator<MoimResponseDto>() {
				@Override
				public int compare(MoimResponseDto o1, MoimResponseDto o2) {
					return (int)(o1.getDistance()-o2.getDistance());
				}
			});
			resultMap.put("state", "Success");
			resultMap.put("data", result);
		} catch (Exception e) {
			String msg = e.getMessage();
			resultMap.put("state", "Client Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
			e.printStackTrace();
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> addMoim(int uid ,MoimRequestDto request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			User user = ur.findById(uid).orElseThrow(IllegalArgumentException::new);
			Moim moim = request.toEntity(user, request);
			moim = mr.save(moim);
			MoimResponseDto response = request.toResponse(moim);
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 생성 성공");
			resultMap.put("data", response);
		} catch (Exception e) {
			e.printStackTrace();
			String msg = e.getMessage();
			resultMap.put("state", "Server Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> updateMoim(Moim moim) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			moim.closeRoom();
			moim = mr.save(moim);
			MoimRequestDto request = new MoimRequestDto();
			MoimResponseDto response = request.toResponse(moim);
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 상태 수정 성공");
			resultMap.put("data", response);
		} catch (Exception e) {
			e.printStackTrace();
			String msg = e.getMessage();
			resultMap.put("state", "Server Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
		}
		return resultMap;
	}

	@Override
	public Map<String,Object> addParticipate(ParticipateRequestDto part) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			Participate pc = pr.findByUserUidAndMoimMid(part.getUid(), part.getMid());
			ParticipateResponseDto result;
			if(pc==null) {
				Moim moim = mr.findById(part.getMid());
				User user = ur.findById(part.getUid()).orElseThrow(IllegalArgumentException::new);
				Participate addPart = new Participate(0, moim, user);
				pr.save(addPart);
				result = new ParticipateResponseDto(0,moim,user);
			}else {
				result = ParticipateResponseDto.builder().pid(pc.getPid()).user(pc.getUser()).moim(pc.getMoim()).build();
			}
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 상태 추가 성공");
			resultMap.put("data", result);
		} catch (Exception e) {
			e.printStackTrace();
			String msg = e.getMessage();
			resultMap.put("state", "Server Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
		}
		
		return resultMap;
	}
	
	@Override
	public Map<String,Object> deleteParticipate(int uid, int mid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			Participate pc = pr.findByUserUidAndMoimMid(uid, mid);
			ParticipateResponseDto result;
			if(pc!=null) {
				pr.delete(pc);
				result = ParticipateResponseDto.builder()
						.pid(pc.getPid())
						.user(pc.getUser())
						.moim(pc.getMoim())
						.build();
			}else result = new ParticipateResponseDto(0,null,null);
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 상태 삭제 성공");
			resultMap.put("data", result);
		} catch (Exception e) {
			e.printStackTrace();
			String msg = e.getMessage();
			resultMap.put("state", "Server Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
		}
		return resultMap;
	}

	@Override
	public Map<String,Object> findUsersByMid(int mid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			List<Participate> users = pr.findByMoimMid(mid);
			List<UserResponseDto> data = new ArrayList<UserResponseDto>();
			for (Participate part : users) {
				User user = ur.findById(part.getUser().getUid()).orElseThrow(IllegalArgumentException::new);
				UserResponseDto tmpDto = UserResponseDto.builder().uid(user.getUid()).name(user.getName())
						.birth(user.getBirth()).gender(user.getGender()).phone(user.getPhone()).addr(user.getAddr())
						.profileImg(user.getProfileImg()).loginImg(user.getLoginImg()).latitude(user.getLatitude())
						.longitude(user.getLongitude()).build();
				data.add(tmpDto);
			}
			resultMap.put("state", "Success");
			resultMap.put("message", "모임방 상태 수정 성공");
			resultMap.put("data", data);
		} catch (Exception e) {
			e.printStackTrace();
			String msg = e.getMessage();
			resultMap.put("state", "Client Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
		}
		return resultMap;
	}

	@Override
	public Map<String, Object> findPartsByUid(int uid) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			List<Participate> moims = pr.findAllByUserUid(uid);
			List<ParticipateResponseDto> data = new ArrayList<ParticipateResponseDto>();
			for (Participate part : moims) {
				ParticipateResponseDto tmpDto = ParticipateResponseDto.builder().pid(part.getPid()).user(part.getUser()).moim(part.getMoim()).build();
				data.add(tmpDto);
			}
			resultMap.put("state", "Success");
			resultMap.put("message", "해당 유저가 참여한 모임 목록 조회 성공");
			resultMap.put("data", data);
		} catch (Exception e) {
			e.printStackTrace();
			String msg = e.getMessage();
			resultMap.put("state", "Client Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
		}
		return resultMap;
	}
	
	public Map<String,Object> findMoimByMe(int uid){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		try {
			List<Moim> moims = mr.findByHostUidAndTimeAfterOrderByTimeDesc(uid, new Date());

			resultMap.put("state", "Success");
			resultMap.put("message", "해당 유저가 생성한 모임 목록 조회 성공");
			resultMap.put("data", moims);
		} catch (Exception e) {
			e.printStackTrace();
			String msg = e.getMessage();
			resultMap.put("state", "Client Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
		}
		return resultMap;
		
	}
	
	public Map<String,Object> findMoimByOther(int uid){
		Map<String,Object> resultMap = new HashMap<String, Object>();
		try {
			List<Participate> parts = pr.findAllByUserUid(uid);
			List<Moim> moims = new ArrayList<Moim>();
			
			for(Participate p : parts) {
				if(p.getMoim().getTime().after(new Date()))
					moims.add(p.getMoim());
			}
			
			Collections.sort(moims, new Comparator<Moim>() {
				@Override
				public int compare(Moim o1, Moim o2) {
					return (int)(o1.getTime().compareTo(o2.getTime()));
				}
			});
			resultMap.put("state", "Success");
			resultMap.put("message", "해당 유저가 참여한 모임 목록 조회 성공");
			resultMap.put("data", moims);
		} catch (Exception e) {
			e.printStackTrace();
			String msg = e.getMessage();
			resultMap.put("state", "Client Error");
			resultMap.put("message", msg);
			resultMap.put("data", "");
		}
		
		return resultMap;
	}

}
