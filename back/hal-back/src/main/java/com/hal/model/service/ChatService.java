package com.hal.model.service;

import java.util.List;

import com.hal.model.dto.ChatRequestDto;
import com.hal.model.dto.ChatResponseDto;

public interface ChatService {
	
	public void save(ChatRequestDto chat);
	public List<ChatResponseDto> findChatListById(int rid);
}
