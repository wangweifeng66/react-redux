import React from 'react';

class Datarow extends React.Component{
	constructor({data,tablecol}){
		super();
	}

	render(){
		let data = this.props.data;
		return (
			<tr className="datarow">

				{this.props.tablecol.map((item,index)=>{
					if(item.show){
						return <td key={index}>{data[item.fieldname]}</td>
					}
				})}

			</tr>
		);
	}
}

export default Datarow;