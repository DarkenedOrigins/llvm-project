package com.example.JavaCodeChallege.restservice;

public class ProcessObj {

	private final String name;
	private final String returnType;
	private final String callConv;
	private final String instCount;

	public ProcessObj() {
		this.name = "";
		this.returnType = "";
		this.callConv = "";
		this.instCount = "";
	}

	public ProcessObj(String name, String retType, String cc, String ic) {
		this.name = name;
		this.returnType = retType;
		this.callConv = cc;
		this.instCount = ic;
	}

	public String getName() {
		return name;
	}

	public String getReturnType() {
		return returnType;
	}

	public String getCallConv() {
		return callConv;
	}

	public String getInstCount() {
		return instCount;
	}
}


