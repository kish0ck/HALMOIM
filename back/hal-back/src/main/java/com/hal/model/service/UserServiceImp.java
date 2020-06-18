package com.hal.model.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hal.model.dao.UserRepository;
import com.hal.model.dto.User;
import com.hal.model.dto.UserResponseDto;

@Service
public class UserServiceImp implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	public List<User> userSearchAllList() {
		return userRepository.findAll();
	}
	
	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}
	
	@Override
	public int updateUser(User user) {
		return userRepository.updateUser(user);
	}
	
	@Override
	public List<String> findAllPhone() {
		return userRepository.findAllPhone();
	}
	
	@Override
	public User findUserById(int uid) {
		User user = userRepository.findById(uid).orElseThrow(IllegalArgumentException::new);
		return user;
	}
	
	@Override
	public User userLogin(String phone) {
		User user = userRepository.findByPhone(phone);
		return user;
	}

	@Override
	public List<UserResponseDto> findFriendByDistance(int uid, int dis_filter) {
		User user = userRepository.findById(uid).orElseThrow(IllegalArgumentException::new);
		List<User> friends = userRepository.findByUidNot(user.getUid());
		List<UserResponseDto> result = new ArrayList<>();
		double my_lat = user.getLatitude();
		double my_long = user.getLongitude();
		double radius = 6371; // 지구 반지름(km)
		double toRadian = Math.PI / 180;
		double distance;
		
		for(User friend : friends) {
			double f_lat = friend.getLatitude();
			double f_long = friend.getLongitude();
			
			double deltaLatitude = Math.abs(my_lat - f_lat) * toRadian;
		    double deltaLongitude = Math.abs(my_long - f_long) * toRadian;

		    double sinDeltaLat = Math.sin(deltaLatitude / 2);
		    double sinDeltaLng = Math.sin(deltaLongitude / 2);
		    double squareRoot = Math.sqrt(
		        sinDeltaLat * sinDeltaLat +
		        Math.cos(my_lat * toRadian) * Math.cos(f_lat * toRadian) * sinDeltaLng * sinDeltaLng);

		    distance = 2 * radius * Math.asin(squareRoot);
		    
		    if(distance <= dis_filter) {
		    	UserResponseDto tmpFriend = UserResponseDto.builder()
		    			.uid(friend.getUid())
		    			.name(friend.getName())
		    			.birth(friend.getBirth())
		    			.gender(friend.getGender())
		    			.phone(friend.getPhone())
		    			.addr(friend.getAddr())
		    			.profileImg(friend.getProfileImg())
		    			.loginImg(friend.getLoginImg())
		    			.latitude(friend.getLatitude())
		    			.longitude(friend.getLongitude())
		    			.description(friend.getDescription())
		    			.distance(Math.round(distance*10)/10.0)
		    			.build();
		    	result.add(tmpFriend);
		    }
		}
		Collections.sort(result, new Comparator<UserResponseDto>() {

			@Override
			public int compare(UserResponseDto o1, UserResponseDto o2) {
				// TODO Auto-generated method stub
				return (int)(o1.getDistance()-o2.getDistance());
			}
		});
		return result;
	}

	
}
