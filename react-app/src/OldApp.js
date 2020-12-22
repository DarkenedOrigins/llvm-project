import React, { Component/*, useState*/ } from "react";
//import { render } from "react-dom";

import { Table, Icon, Segment, Grid } from "semantic-ui-react";

import axios from 'axios'


class App extends Component {
	constructor() {
		super();

		this.state = {
			data: [
				{
					date: "2014-04-18",
					total: 121.0,
					status: "Shipped",
					name: "A",
					points: 5,
					percent: 50
				},
				{
					date: "2014-04-21",
					total: 121.0,
					status: "Not Shipped",
					name: "B",
					points: 10,
					percent: 60
				},
				{
					date: "2014-08-09",
					total: 121.0,
					status: "Not Shipped",
					name: "C",
					points: 15,
					percent: 70
				},

			],
			expandedRows: [],
			fileNames: [],
			myData: [],

		};
	}


	getFData(fileNames) {
		//console.log(fileNames[0])
		var nData = [];
		for (var i = 0; i < fileNames.length; i++) {
			let url = 'http://172.17.203.226:8080/process/' + fileNames[i].split(".")[0];
			let fileName = fileNames[i];
			axios.get(url)
				.then(response => {
					//console.log(response)
					//nData.push(JSON.stringify(response.data))
					//let fileName = fileNames[i];
					//console.log(fileName)
					/*let funcNames = "";
					let callConv = "";
					let instCount = "";
					let retType = "";
					for (var j=0; j<response.data.length; j++){
						funcNames += response.data[j].name + ", ";
						callConv += response.data[j].callConv + ", ";
						instCount += response.data[j].instCount + ", ";
						retType += response.data[j].returnType + ", ";
					}
					nData.push({ fname: fileName, name: funcNames, callConv: callConv, instCount: instCount, returnType: retType })*/
					var iData = JSON.parse( JSON.stringify( response.data));
					//console.log(Object.keys(iData[0]));
					var curData = {fname: fileName, data: iData};
					this.setState( {myData: [...this.state.myData, curData]});

				})
				.catch(error => console.log(error));

		}
		console.log( Object.keys(this.state.myData), "doesnt work");
		//this.setState({ myData: nData });
	}

	componentDidMount() {
		axios.get('http://172.17.203.226:8080/file_list')
			.then(response => {
				console.log(response)
				this.setState({ fileNames: JSON.parse(JSON.stringify(response.data)) })
				this.getFData(JSON.parse(JSON.stringify(response.data)));
			})
			.catch(error => console.log(error));
	}




	handleRowClick(rowId) {
		const currentExpandedRows = this.state.expandedRows;
		const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

		const newExpandedRows = isRowCurrentlyExpanded
			? currentExpandedRows.filter(id => id !== rowId)
			: currentExpandedRows.concat(rowId);

		this.setState({ expandedRows: newExpandedRows });
	}

	renderItemCaret(rowId) {
		const currentExpandedRows = this.state.expandedRows;
		const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

		if (isRowCurrentlyExpanded) {
			return <Icon name="caret down" />;
		} else {
			return <Icon name="caret right" />;
		}
	}

	renderItemDetails(item) {
		return (
			<Segment basic>
				<Grid columns={1}>
					<Grid.Column>
						<span>Name: {item.name}</span>
					</Grid.Column>
				</Grid>
			</Segment>
		);
	}

	renderItem(item, index) {
		const clickCallback = () => this.handleRowClick(index);
		const itemRows = [
			<Table.Row onClick={clickCallback} key={"row-data-" + index}>
				<Table.Cell>{item.name}</Table.Cell>
			</Table.Row>
		];

		if (this.state.expandedRows.includes(index)) {
			itemRows.push(
				<Table.Row key={"row-expanded-" + index}>
					<Table.Cell>{this.renderItemDetails(item)}</Table.Cell>
				</Table.Row>
			);
		}

		return itemRows;
	}

	render() {
		let allItemRows = [];

		this.state.data.forEach((item, index) => {
			const perItemRows = this.renderItem(item, index);
			allItemRows = allItemRows.concat(perItemRows);
		});

		//console.log(this.state.myData[0].fname, "over here!!!!!!")

		return (


			<Table selectable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell />
						<Table.HeaderCell>FILE NAME</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>{allItemRows}</Table.Body>
			</Table>
/*
			<html>
			<div>
				
				<table>
					<tbody>
						<tr>
							<th>
								file table
				</th>
						</tr>
						<tr>
							<td>
								<p> {this.state.myData[0].fname} </p>
							</td>
						</tr>
					</tbody>
				</table>

			</div>
			</html>
*/

		);
	}
}

export default App;





// class App extends Component {
// 	constructor() {
// 		super();

// 		this.state = {
// 			data: [
// 				{
// 				  fname: "a.ll",
// 				  data: "potato"
// 				},
// 				{
// 					fname: "b.all",
// 					data: "potato2"
// 				}
// 				/*{
// 				  date: "2014-04-21",
// 				  total: 121.0,
// 				  status: "Not Shipped",
// 				  name: "B",
// 				  points: 10,
// 				  percent: 60g
// 				}*/
// 			],
// 			expandedRows: [],
// 			fileNames: [],
// 			myData: [],
// 		};


// 	}



// 	handleRowClick(rowId) {
// 		const currentExpandedRows = this.state.expandedRows;
// 		const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

// 		const newExpandedRows = isRowCurrentlyExpanded
// 			? currentExpandedRows.filter(id => id !== rowId)
// 			: currentExpandedRows.concat(rowId);

// 		this.setState({ expandedRows: newExpandedRows });
// 	}

// 	renderItemCaret(rowId) {
// 		const currentExpandedRows = this.state.expandedRows;
// 		const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

// 		if (isRowCurrentlyExpanded) {
// 			return <Icon name="caret down" />;
// 		} else {
// 			return <Icon name="caret right" />;
// 		}
// 	}

// 	renderItemDetails(item) {
// 		return (
// 			<Segment basic>
// 				<Grid columns={1}>
// 					<Grid.Column>
// 						<span>data: {item.data}</span>
// 					</Grid.Column>
// 				</Grid>
// 			</Segment>
// 		);
// 	}

// 	renderItem(item, index) {
// 		const clickCallback = () => this.handleRowClick(index);
// 		const itemRows = [
// 			<Table.Row onClick={clickCallback} key={"row-data-" + index}>
// 				<Table.Cell>{this.renderItemCaret(index)}</Table.Cell>
// 				<Table.Cell>{item.fname}</Table.Cell>
// 			</Table.Row>
// 		];
// 		//console.log(item.fname);

// 		if (this.state.expandedRows.includes(index)) {
// 			itemRows.push(
// 				<Table.Row key={"row-expanded-" + index}>
// 					<Table.Cell colSpan="4">{this.renderItemDetails(item)}</Table.Cell>
// 				</Table.Row>
// 			);
// 		}

// 		return itemRows;
// 	}

// 	render() {
// 		let allItemRows = [];

// 		this.state.data.forEach( (item, index) => console.log(item, index) )

// 		this.state.myData.forEach((item, index) => {
// 			const perItemRows = this.renderItem(item, index);
// 			allItemRows = allItemRows.concat(perItemRows);
// 		});

// 		return (
// 			<Table selectable>
// 				<Table.Header>
// 					<Table.Row>
// 						<Table.HeaderCell />
// 						<Table.HeaderCell>File Name</Table.HeaderCell>
// 					</Table.Row>
// 				</Table.Header>

// 				<Table.Body>{allItemRows}</Table.Body>
// 			</Table>
// 		);
// 	}
// }

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
	<div className="App">
	  <header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<p>
		  Edit <code>src/App.js</code> and save to reload.
		</p>
		<a
		  className="App-link"
		  href="https://reactjs.org"
		  target="_blank"
		  rel="noopener noreferrer"
		>
		  Learn React
		</a>
	  </header>
	</div>
  );
}

*/