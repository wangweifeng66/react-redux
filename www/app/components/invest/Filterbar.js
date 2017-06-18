import React from 'react';

class Filterbar extends React.Component{
	constructor({options , title , onpick}){
		super();

		this.state = {
			v : [],
			shape : "radio"  //radio单选，checkbox多选
		}
	}


	//单选框被选择
	chooseradio(item){
		this.setState({"v" : [item]});

		this.submitdata([item]);
	}

	choosecheckbox(){
		var arr = [];
		//这里要决定数组怎么变，必须要知道哪些复选框被选中
		//react中没有双向绑定，用DOM非常方便
		$(this.refs.checkbox).find("input[type=checkbox]:checked").each(function(){
			arr.push( $(this).val() );
		});

		this.setState({"v" : arr});
	}

	//上传数据（给父组件传数据）
	submitdata(arr){
		this.props.onpick(this.props.title , arr , this.props.reducerkey);
	}

	showshape(){
		if(this.state.shape == "radio"){
			return <div className="radio">
				{
					this.props.options.map((item,index)=>{
						return <a 
							className={this.state.v[0] == item ? "cur" : ""} 
							key={index} 
							href="javascript:;" 
							onClick={()=>{this.chooseradio(item)}}>
							{item}
						</a>
					})
				}
				<a href="javascript:;" className="mutibtn" onClick={()=>{this.setState({"shape":"checkbox"})}}>多选+</a>
			</div>
		}else{
			return <div className="checkbox" ref="checkbox">
				{
					this.props.options.map((item,index)=>{
						return <label  key={index}><input onClick={(this.choosecheckbox).bind(this)} type="checkbox" value={item} />{item}</label>
					})
				}
				<input type="button" className="btn btn-success" value="确定"  onClick={()=>{this.submitdata(this.state.v)}}/>
				{" "}
				<input type="button" className="btn" value="取消" onClick={()=>{this.setState({"shape":"radio" , "v" : []})}}/>
			</div>
		}
	}

	render(){
		return (
			<div className="filterbar">
				{this.showshape()}
			</div>
		);
	}
}

export default Filterbar;