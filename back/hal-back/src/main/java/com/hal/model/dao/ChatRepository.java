package com.hal.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hal.model.dto.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer>{
	List<Chat> findByRoomRidOrderByTime(int rid);
}
