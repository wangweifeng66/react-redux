import React from "react";
import PropTypes from "prop-types";

class YearMonthPicker extends React.Component{
	constructor({onpick , year , month }){
		super();
 		
 		this.state = {
 			"year" : year,
 			"month" : month
 		}

 		//位于视图中央的那个年份
 		this.cyear = this.state.year;
	}

	rrBtnHandler(){
		this.cyear ++;
		var self = this;
		$(this.refs.span_container).append($(`<span>${self.cyear + 2}</span>`)).stop(true,true).animate({"left" : -38},100,function(){
			$(this).find("span").eq(0).remove();
			$(this).css("left" , 0);

			$(this).find("span").eq(2).addClass("cur").siblings().removeClass("cur");
		});

		$(self.refs.month_panel).find("a").removeClass("cur");
		if(self.cyear == self.state.year){
			$(".month_panel").find("a").eq(self.state.month - 1).addClass("cur");
		}
	}

	llBtnHandler(){
		this.cyear --;
		var self = this;
		$(this.refs.span_container).prepend($(`<span>${self.cyear - 2}</span>`)).stop(true,true).animate({"left" : 38},100,function(){
			$(this).find("span").eq(-1).remove();
			$(this).css("left" , 0);

			$(this).find("span").eq(2).addClass("cur").siblings().removeClass("cur");
		});

		$(self.refs.month_panel).find("a").removeClass("cur");
		if(self.cyear == self.state.year){
			$(".month_panel").find("a").eq(self.state.month - 1).addClass("cur");
		}
	}

	//上树之后
	componentDidMount(){
		//决定cur
		$(this.refs.month_panel).find("a").removeClass("cur");
		if(this.cyear == this.state.year){
			$(this.refs.month_panel).find("a").eq(this.state.month - 1).addClass("cur");
		}


		// 绑定滚轮事件
		var self = this;
		$(this.refs.span_container).mousewheel(function(event,delta){
			if(delta > 0){
				self.llBtnHandler();
			}else{
				self.rrBtnHandler();
			}
		});	

		//a标签（月份点击）的事件
		$(this.refs.month_panel).find("a").click(function(){
			self.setState({"year" : self.cyear , "month" : Number($(this).attr("data-month"))});
			self.props.onpick(self.state);
		});

		//年份标签的点击事件
		$(this.refs.span_container).delegate("span","click",function(event){
			event.preventDefault();
			if($(this).index() > 2){
				let a = $(this).index() - 2;
				while(a){
					a--;
					self.rrBtnHandler();
				}
			}else if($(this).index() < 2){
				let a =  2 - $(this).index();
				while(a){
					a--;
					self.llBtnHandler();
				}
			}
			return false;
		});
	}

 
	render(){
		return (
			<div className="YearMonthPicker">
				<div className="inner">
					<div className="year_panel">
						<div className="panel_inner">
							<div className="span_container" ref="span_container">
								<span>{this.state.year - 2}</span>
								<span>{this.state.year - 1}</span>
								<span className="cur">{this.state.year}</span>
								<span>{this.state.year + 1}</span>
								<span>{this.state.year + 2}</span>
							</div>
						</div>

						<i className="ll" onClick={()=>{this.llBtnHandler()}}></i>
						<i className="rr" onClick={()=>{this.rrBtnHandler()}}></i>
					</div>

					<div className="month_panel" ref="month_panel">
						<div className="col">
							<a href="javascript:void(0);" data-month="1">1月</a>
							<a href="javascript:void(0);" data-month="2">2月</a>
							<a href="javascript:void(0);" data-month="3">3月</a>
							<a href="javascript:void(0);" data-month="4">4月</a>
							<a href="javascript:void(0);" data-month="5">5月</a>
							<a href="javascript:void(0);" data-month="6">6月</a>
						</div>
						<div className="col">
							<a href="javascript:void(0);" data-month="7">7月</a>
							<a href="javascript:void(0);" data-month="8">8月</a>
							<a href="javascript:void(0);" data-month="9">9月</a>
							<a href="javascript:void(0);" data-month="10">10月</a>
							<a href="javascript:void(0);" data-month="11">11月</a>
							<a href="javascript:void(0);" data-month="12">12月</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


YearMonthPicker.propTypes = {
	onpick : PropTypes.func.isRequired,
	year : PropTypes.number.isRequired,
	month : PropTypes.number.isRequired
}


export default YearMonthPicker;