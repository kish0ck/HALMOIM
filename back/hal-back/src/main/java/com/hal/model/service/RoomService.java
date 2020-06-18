package com.hal.model.service;

import java.util.List;

import com.hal.model.dto.RoomResponseDto;

public interface RoomService {

	public List<RoomResponseDto> findRoomListById(int uid);

	public String addRoom(int senderId, int receiverId);
}
