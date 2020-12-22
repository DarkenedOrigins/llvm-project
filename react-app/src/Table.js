import React from 'react';

const Table = ({filenames, fdata}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Functions</th>
          <th>Return Types</th>
          <th>Call Conventions</th>
          <th>Instruction Count Per</th>
        </tr>
      </thead>
      <tbody>
	  { (filenames.length > 0) ? fdata.map( (data, index) => {
           return (
            <tr key={ index }>
              <td>{ filenames[index] }</td>
              <td>{ data.func }</td>
              <td>{ data.rType}</td>
              <td>{ data.cConv }</td>
              <td>{ data.iCount }</td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
      </tbody>
    </table>
  );
}

export default Table