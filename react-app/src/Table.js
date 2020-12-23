import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

const Table = ({ filenames, fdata }) => {
	return (
		<table class="table table-hover">
			<thead>
				<tr>
					<th>File Name</th>
					{/* <th>Functions</th>
					<th>Return Types</th>
					<th>Call Conventions</th>
					<th>Instruction Count Per</th> */}
				</tr>
			</thead>
			<tbody>
				{(filenames.length > 0) ? fdata.map((data, index, array) => {
					//console.log(array, "over here");
					let index1 = index + array.length;
					let index2 = index + 2*array.length;
					let index3 = index + 3*array.length;
					let index4 = index + 4*array.length;
					let rId = "accordion"+index.toString();
					let tar = "#"+rId;
					return (
						[
							<tr key={index} data-toggle="collapse" data-target={tar} class="clickable">
								<td>{filenames[index]}</td>
								{/* <td>{data.func}</td>
								<td>{data.rType}</td>
								<td>{data.cConv}</td>
								<td>{data.iCount}</td> */}
							</tr>,

							<tr key={index1}>
								<td colSpan="5">
									<div id={rId} class="collapse">
										Functions: {data.func}
									</div>
								</td>
							</tr>,

							<tr key={index2}>
								<td colSpan="5">
									<div id={rId} class="collapse">
										Return Types: {data.rType}
									</div>
								</td>
							</tr>,

							<tr key={index3}>
								<td colSpan="5">
									<div id={rId} class="collapse">
										Call Conventions: {data.cConv}
									</div>
								</td>
							</tr>,

							<tr key={index4}>
								<td colSpan="5">
									<div id={rId} class="collapse">
										Instruction Count: {data.iCount}
									</div>
								</td>
							</tr>
						]
					)
				}) : <tr><td colSpan="5">Loading...</td></tr>}
			</tbody>
		</table>
	);
}

export default Table