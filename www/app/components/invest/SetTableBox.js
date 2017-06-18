import React from 'react';

class SetTableBox extends React.Component{
	constructor({data,setSetTableBoxShow,tablecol , onsubmit}){
		super();

		//这个组件里面也有state
		this.state = (function(){
			var o = {};
			tablecol.forEach(function(item){
				o[item.fieldchinesename] = item.show
			});
			return o;
		})();

 
	}

	componentDidMount(){
		$(this.refs.innerbox).css("top" , "-100%").show().animate({"top" : "50%"},500);
	}

	//退出窗口
	exit(){
		var self = this;
		$(this.refs.innerbox).animate({"top" : "-100%"},300,function(){
			self.props.setSetTableBoxShow(false);
		});
	}

	//设置复选框
	setc(fieldname,event){
		//改变state即可
		this.setState({[fieldname] : event.target.checked})
	}

	showLabels(){
		var arr = [];

		for(let k in this.state){
			arr.push(<label key={arr.length}>
							<input 
								type="checkbox" 
								checked={this.state[k]} 
								onChange={(event)=>{this.setc(k,event)}}
								disabled={k == "姓名"}

							/>
									{k}
					</label>	
			)
		}
		 
		return arr;
					 
	}

	render(){
		return (
			<div className="settablebox">
				<div className="innerbox text-left" ref="innerbox">
					<a href="javascript:;" className="closebtn" onClick={()=>{this.exit()}}>×</a>

					<div className="text-left">
						{this.showLabels()}
					</div>

					<input type="button" value="确定" onClick={()=>{this.props.onsubmit(this.state)}}/>
					<input type="button" value="取消所有选择" onClick={()=>{
						for(let k in this.state){
							if(k != "姓名") this.setState({[k] : false});
						}
					}}/>

					<input type="button" value="全选" onClick={()=>{
					 
						for(let k in this.state){
							this.setState({[k] : true});
						}
						 
					}}/>
				</div>
			</div>
		);
	}
}

export default SetTableBox;