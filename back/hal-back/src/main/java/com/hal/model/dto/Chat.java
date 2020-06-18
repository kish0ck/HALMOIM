package com.hal.model.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "chat")
@NoArgsConstructor//(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString
public class Chat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cid")
	private int cid;
	
	@Column(name = "message")
	private String message;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "time")
	private Date time;
	
	@Column(name = "state")
	private boolean state; //true: 읽음, false: 안읽음
	
	@ManyToOne
	@JoinColumn(name = "rid",referencedColumnName = "rid")
	private Room room;
	
	@ManyToOne
	@JoinColumn(name = "uid",referencedColumnName = "uid")
	private User sender;
	
	@Column(name = "type")
	private String type;
}
