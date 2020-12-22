package com.example.JavaCodeChallege.restservice;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ProcessController {

	public static String getResults(Process process) throws IOException {
		BufferedReader iReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
		BufferedReader eReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
		String line = "";
		String retval = "";
		while ((line = iReader.readLine()) != null) {
			retval += line + '\n';
		}
		while ((line = eReader.readLine()) != null) {
			retval += line + '\n';
		}
		return retval;
	}

	@GetMapping(value = "/process/{fname}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ArrayList<ProcessObj> processInfo(@PathVariable String fname) {
		String dir = System.getProperty("user.home")+"/llvm-project/";
		String command = "./build/bin/opt -disable-output ./uploadedFiles/" + fname + ".ll -passes=helloworld";
		String output = "";

		try {
			Process p = Runtime.getRuntime().exec(new String[] { "bash", "-c", command }, null, new File(dir));
			output = getResults(p);

		} catch (IOException e) {
			e.printStackTrace();
		}

		String[] funcs = output.split("\n");

		if (funcs.length < 1) {
			return (ArrayList<ProcessObj>) Collections.singletonList(new ProcessObj(output, "ERROR", "ERROR", "ERROR"));
		}
		ArrayList<ProcessObj> retval = new ArrayList<ProcessObj>();

		for(int i=0; i<funcs.length; i++){
			String[] vals = funcs[i].split(",");
			retval.add(new ProcessObj(vals[0], vals[1], vals[2], vals[3]));
		}
		return retval;
	}

	@GetMapping(value = "/file_list", produces = MediaType.APPLICATION_JSON_VALUE)
	public String[] fileList() {
		String dir = System.getProperty("user.home")+"/llvm-project/";
		String command = "ls ./uploadedFiles/";
		String output = "";

		try {
			Process p = Runtime.getRuntime().exec(new String[] { "bash", "-c", command }, null, new File(dir));
			output = getResults(p);

		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return output.split("\n");
	}
}
