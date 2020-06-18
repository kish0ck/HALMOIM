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
public class ChatResponseDto {
	
	private int cid;
	private String type;
	private String message;
	private Date time;
	private boolean state; //true: 읽음, false: 안읽음
	private Room room;
	private User sender;
}
