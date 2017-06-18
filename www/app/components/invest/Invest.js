import React from 'react';
import {connect} from 'react-redux';
import Filterbar from "./Filterbar.js";
import Nowfilter from "./Nowfilter.js";
import {fetchInitFilter , addfilter , fetchData} from "../../actions/investActions.js";
import Range from "../common/range/Range.js";
import BECanlendar from "../common/becanlendar/BECanlendar.js";
import Databox from "./Databox.js";

class Invest extends React.Component{
	constructor({filters,dispatch,nowfilter}){
		super();
		/*//请求默认过滤器和数据
		dispatch( fetchInitFilter() );
		dispatch( fetchData() );*/
	}

	//当子组件给我们传入了数据的时候
	pickHandler(title,v,reducerkey){
		console.log("我收到了子组件的改变",title,v);
		this.props.dispatch(addfilter(title,v,reducerkey));
	}
	componentDidMount(){
		//请求默认过滤器和数据
		this.props.dispatch( fetchInitFilter() );
		this.props.dispatch( fetchData() );
	}
	//显示过滤条
	showfilterbar(propsobj){
		//检查是否已经在this.props.nowfilter中存在
		var alreadyexsit = false;
		this.props.nowfilter.forEach((item)=>{
			item.filtertitle == propsobj.title && (alreadyexsit = true);
		})
		if(alreadyexsit) {
			return "" ;
		}else{
			return <div>
				<div className="col-lg-2 filter_t text-right">
					{propsobj.title}：
				</div>
				<div className="col-lg-10">
					<Filterbar {...propsobj} />
				</div>
			</div>
		}
	}

	//显示范围条
	showrange(propsobj){
		//检查是否已经在this.props.nowfilter中存在
		var alreadyexsit = false;
		this.props.nowfilter.forEach((item)=>{
			item.filtertitle == propsobj.title && (alreadyexsit = true);
		})
		if(alreadyexsit) {
			return "" ;
		}else{
			return <div>
				<div className="col-lg-2 filter_t  text-right">
					{propsobj.title}：
				</div>
				<div className="col-lg-10">
					<Range {...propsobj}/>
				</div>
			</div>
		}
	}

	//显示开始结束日期
	showbecanlendar(propsobj){
		var alreadyexsit = false;
		this.props.nowfilter.forEach((item)=>{
			item.filtertitle == propsobj.title && (alreadyexsit = true);
		})
		if(alreadyexsit) {
			return "" ;
		}else{
			return <div>
				<div className="col-lg-2 filter_t  text-right" style={{"paddingTop" : "20px"}}>
					{propsobj.title}：
				</div>
				<div className="col-lg-10"  style={{"paddingTop" : "20px"}}>
					<BECanlendar {...propsobj} />
				</div>
			</div>
		}
	}

	render(){
		var d = new Date();
		return (
			<section>

				<div className="container">
					<div className="filterBox">
						<Nowfilter nowfilter={this.props.nowfilter} dispatch={this.props.dispatch}></Nowfilter>

						<div className="row">
							{this.showfilterbar({
								options : this.props.filters.schools,
								title : "学校" ,
								reducerkey : "scholl" ,
								onpick :this.pickHandler.bind(this)
							})}
						</div>

						<div className="row">
							{this.showfilterbar({
								options : this.props.filters.types,
								title : "类型" ,
								reducerkey : "types",
								onpick :this.pickHandler.bind(this)
							})}
						</div>

						<div className="row">
							{this.showrange({
								width : 300 ,
								min : this.props.filters.need.min,
								max : this.props.filters.need.max,
								scaleLeft : this.props.filters.need.scaleLeft,
								scaleRight : this.props.filters.need.scaleRight,
								onpick : this.pickHandler.bind(this),
								title : "所需金额范围",
								reducerkey : "need"
							})}
						</div>

						<div className="row" style={{"position":"relative"}}>
							{this.showbecanlendar({
								onpick : this.pickHandler.bind(this),
								title : "收益日期",
								reducerkey : "shouyiriqi" ,
								byear : this.props.filters.shouyiriqi.byear,
								bmonth : this.props.filters.shouyiriqi.bmonth,
								bday: this.props.filters.shouyiriqi.bday,
								eyear: this.props.filters.shouyiriqi.eyear,
								emonth: this.props.filters.shouyiriqi.emonth,
								eday: this.props.filters.shouyiriqi.eday
							})}

						</div>
   					</div>


   					<div className="databox">
   						<Databox></Databox>
   					</div>
				</div>
			</section>
		);
	}
}

export default connect((state)=>{
	return {
		"state" : state,
		"filters" : state.investReducer.filters,
		"nowfilter" : state.investReducer.nowfilter,
	}
})(Invest);