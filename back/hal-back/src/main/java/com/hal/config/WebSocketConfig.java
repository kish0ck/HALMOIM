package com.hal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker//@EnableWebSocketMessageBroker is used to enable our WebSocket server
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        registry.addEndpoint("/webSocket")
        		.setAllowedOrigins("*")
        		.withSockJS(); //SockJS사용
     // URL//webSocket  <-웹소켓 연결 주소

    }


    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app"); //메시지 보낼 url send /app/message
        registry.enableSimpleBroker("/topic");	//메시지 브로커 등록  //sub용 sub topic/public
    }
}