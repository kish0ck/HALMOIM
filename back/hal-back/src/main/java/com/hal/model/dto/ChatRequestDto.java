package com.hal.model.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ChatRequestDto {
	private int cid;
	private String type;
	private String message;
	private Date time;
	private boolean state; //true: 읽음, false: 안읽음
	private int roomId;
	private int senderId;
	
	public Chat toEntity(ChatRequestDto request, Room room, User sender) {
		Chat chat = new Chat(request.getCid(), 
							request.getMessage(), 
							request.getTime(), 
							request.isState(),
							room, 
							sender,
							request.getType());
		return chat;
	}
}
