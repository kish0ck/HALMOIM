package com.hal.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hal.model.dao.RoomRepository;
import com.hal.model.dao.UserRepository;
import com.hal.model.dto.Room;
import com.hal.model.dto.RoomResponseDto;
import com.hal.model.dto.User;

@Service
public class RoomServiceImp implements RoomService {

	@Autowired
	private RoomRepository roomRepository;
	@Autowired
	private UserRepository userRepository;
	
	public List<RoomResponseDto> findRoomListById(int uid){
		List<RoomResponseDto> roomList = new ArrayList<>();
		List<Room> tmpList = new ArrayList<>();
		
		tmpList = roomRepository.findByUser1Uid(uid); 
		for (Room room : tmpList) {
			RoomResponseDto tmproom = RoomResponseDto.builder()
					.rid(room.getRid())
					.sender(room.getUser1())
					.receiver(room.getUser2()).build();
			roomList.add(tmproom);
		}
		
		tmpList = roomRepository.findByUser2Uid(uid); 
		for (Room room : tmpList) {
			RoomResponseDto tmproom = RoomResponseDto.builder()
					.rid(room.getRid())
					.sender(room.getUser2())
					.receiver(room.getUser1()).build();
			roomList.add(tmproom);

		}
		
		return roomList;
	}
	
	@Override
	public String addRoom(int senderId, int receiverId) {
		//방이 만들어져있는지 확인 있으면 rid값 없으면 null값 리턴
		String roomId = roomRepository.isRoomExisted(senderId, receiverId);
		
		if(roomId==null) { //방이 안만들어진 상태면
			
			User sender = userRepository.findById(senderId).orElseThrow(IllegalArgumentException::new);
			User receiver = userRepository.findById(receiverId).orElseThrow(IllegalArgumentException::new);			
			Room room = new Room(0,sender,receiver);
			roomRepository.save(room);
			
			roomId = roomRepository.isRoomExisted(senderId, receiverId);
		}
		return roomId;
	}
}
