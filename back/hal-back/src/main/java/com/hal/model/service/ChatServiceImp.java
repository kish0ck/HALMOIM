package com.hal.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hal.model.dao.ChatRepository;
import com.hal.model.dao.RoomRepository;
import com.hal.model.dao.UserRepository;
import com.hal.model.dto.Chat;
import com.hal.model.dto.ChatRequestDto;
import com.hal.model.dto.ChatResponseDto;
import com.hal.model.dto.Room;
import com.hal.model.dto.User;

@Service
public class ChatServiceImp implements ChatService {

	@Autowired
	UserRepository ur;
	@Autowired
	ChatRepository cr;
	@Autowired
	RoomRepository rr;
	
	// 채팅 메시지 저장
	@Override
	public void save(ChatRequestDto request) {
		try {
			User user = ur.findById(request.getSenderId()).orElseThrow(IllegalArgumentException::new);
			Room room = rr.findById(request.getRoomId()).orElseThrow(IllegalArgumentException::new);
			Chat chat = request.toEntity(request,room, user);
			cr.save(chat);
		} catch (Exception e) {
			String msg = e.getMessage();
		}

	}
	
	public List<ChatResponseDto> findChatListById(int rid){
		List<ChatResponseDto> chatList = new ArrayList<>();
		List<Chat> tmpList = new ArrayList<>();
		
		tmpList = cr.findByRoomRidOrderByTime(rid);
		for(Chat chat : tmpList) {
			ChatResponseDto tmpchat = ChatResponseDto.builder()
					.cid(chat.getCid())
					.message(chat.getMessage())
					.time(chat.getTime())
					.state(chat.isState())
					.room(chat.getRoom())
					.sender(chat.getSender())
					.type(chat.getType()).build();
			chatList.add(tmpchat);
		}
		
		return chatList;
	}

}
