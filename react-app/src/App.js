import React, { Component } from 'react';
import Table from './Table.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fileNames: [],
			fileData: []
		}
	}

	//OVERHERE CHANGE THE IP TO THE PROPER ADDRESS
	componentDidMount() {
		fetch('http://172.17.200.193:8080/file_list')
			.then(res => res.json())
			.then(json => {console.log(json); return json})
			.then(filenames => {this.setState({ 'fileNames': filenames }); filenames.forEach(element => {
				this.getFdata(element);
			});} );
		//console.log(this.state.fileNames, "over here");
	}
	//OVERHERE CHANGE THE IP TO THE PROPER ADDRESS
	getFdata(filename){
		fetch('http://172.17.200.193:8080/process/'+filename.split(".")[0])
			.then(res => res.json())
			.then(data => {
				console.log(data);
				let funcs = "";
				let rType = "";
				let cConv = "";
				let iCount = "";
				for (var i=0; i<data.length; i++){
					funcs += data[i].name + ", ";
					rType += data[i].returnType + ", ";
					cConv += data[i].callConv + ", ";
					iCount += data[i].instCount + ", ";
				}
				var fdata = { 'func':funcs, 'rType':rType, 'cConv': cConv, 'iCount':iCount  };
				this.setState({'fileData': [...this.state.fileData, fdata]});
			});
	}


	render() {
		return (
			<div className="App">
				<Table filenames={this.state.fileNames}fdata={this.state.fileData} />
			</div>
		);
	}
}

export default App;