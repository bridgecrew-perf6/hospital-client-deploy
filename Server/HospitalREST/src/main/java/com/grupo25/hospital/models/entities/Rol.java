package com.grupo25.hospital.models.entities;

public class Rol {
	private int id_rol;
	private String name;
	public Rol(int id_rol, String name) {
		super();
		this.id_rol = id_rol;
		this.name = name;
	}
	public int getId_rol() {
		return id_rol;
	}
	public void setId_rol(int id_rol) {
		this.id_rol = id_rol;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
