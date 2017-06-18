import React from "react";

//这是一个组件
//每一个组件内部有4种函数：
//1）构造函数
//2）用户自定义函数
//3）生命周期函数
//4）render函数

//这是一个没有connect的组件，我们要研究这4种函数在props改变的时候如何执行。
//1）构造函数，不会因为props的改变而重新执行。事实上，每一个组件的构造器仅仅会执行一次。不管因为什么原因，同一个组件的构造器都不会重新执行。当然父亲把组件删除了，然后又添加了一个新的，算两个。
//2）用户自定义函数：这个无从讨论，要看调用这个函数的函数是不是执行了。
//3）生命周期函数：
		// ①componentWillMount、componentDidMount：上树之前、上树之后。都只执行一次，不会因为props改变而执行

		// ②shouldComponentUpdate：决定组件是否要被更新，该方法在初始化渲染的时候不会调用，而是在props改变或者state被改变的时候执行，此时可以返回true、false来决定视图与否。特别注意，这个生命周期收到两个参数，nextProps和nextState。所以此时就可以根据nextProps和现在的情形比较来决定视图是否更新。一般的，这里面不设置state，因为是设置state而引发的这个函数执行。

		// ③componentWillUpdate、componentDidUpdate： 组件更新之前、之后执行的。特别的，如果shouldComponentUpdate返回了false，此时这两个生命周期都不会执行。该方法在初始化渲染的时候不会调用，而是在props改变或者state被改变的时候执行。接受两个参数，nextProps和nextState。这里不能设置state，否则导致死循环。

		// ④componentWillReceiveProps ：组件接受了新的参数的时候使用。该方法在初始化渲染的时候不会调用，而是在props改变的时候执行。需要注意的是，提供一个实参，就是新props。nextProps才是新参数，而this.props是老参数。 
//4) render函数：三兄弟的改变一定会重新使render函数执行。再次强调，有connect的函数和没有connect的函数分开看。

class range extends React.Component{
	constructor({width,min,max,onpick,scaleLeft,scaleRight}){
		super();
	  
		//大格的数量
	 	this.biggridamount = Math.ceil(width / 60);
	 	//大格的宽度
	 	this.biggridwidth = width / this.biggridamount;
	 	//小格的宽度
	 	this.smallgridwidth = this.biggridwidth / 5;
	 	
	  	//组件的状态，表示的有语义的数字（比如金额），不是像素
	  	this.state = {
	  		"min" : min,
	  		"max" : max,
	  		"scaleLeft" : scaleLeft,
	  		"scaleRight" : scaleRight
	  	}


	}
 	
 	componentWillReceiveProps(nextProps){
 		this.setState({
 			"min" : nextProps.min,
	  		"max" : nextProps.max,
	  		"scaleLeft" : nextProps.min,
	  		"scaleRight" : nextProps.max
	  	});

	  	this.setDrag();
 	}

 	//更新之后
 	componentDidUpdate(){
 		this.setDrag();
 	}

 	componentDidMount(){
 		this.setDrag();
 	}
	 
	//设置DOM
	setDrag(){
		//调整线的宽度
		$(this.refs.range).find(".scaleline i").css("margin-right",this.smallgridwidth - 1);
		$(this.refs.range).find(".scaleline i").eq(-2).css("margin-right",this.smallgridwidth - 2);
		$(this.refs.range).find(".scaleline i").eq(-1).css("margin-right",0);
		$(this.refs.range).find(".scaleline i:nth-child(5n + 1)").addClass('big');

		var self = this;
		 

		//********拖拽业务start********
		//每个大格表示的数量
	 	let perbiggridnumber = parseInt((this.props.max - this.props.min) / this.biggridamount);
	 	//每个小格表示的数量
	 	let persmallgridnumber = perbiggridnumber / 5;
		//bar的左边线到屏幕的距离
		let barleft = $(this.refs.range).find(".bar").offset().left;
		//现在允许的scaleRight对应的像素
		let scaleRightPx = barleft + (this.state.scaleRight - this.props.min) / persmallgridnumber * this.smallgridwidth;
		//bar的右边线到屏幕的距离
		let barright = $(this.refs.range).find(".bar").offset().left + this.props.width;
		//现在允许的scaleLeft对应的像素
		let scaleLeftPx = barleft + (this.state.scaleLeft - this.props.min) / persmallgridnumber * this.smallgridwidth;

		setLeftB();
		setRightB();

		//设置条的初始位置：
		$(this.refs.range).find(".bar b.right").css("left" , (this.props.scaleRight - this.props.min) / ((this.props.max - this.props.min) / this.props.width));
		$(this.refs.range).find(".bar b.left").css("left" , (this.props.scaleLeft - this.props.min) / ((this.props.max - this.props.min) / this.props.width));

		$(self.refs.range).find(".bar span").css({
			"left"  : parseInt($(self.refs.range).find(".bar b.left").css("left")) ,
			"width" : parseInt($(self.refs.range).find(".bar b.right").css("left")) -   parseInt($(self.refs.range).find(".bar b.left").css("left"))
		});


		function setLeftB(){
			 
			$(self.refs.range).find(".bar b.left").draggable({
				"axis" : "x",
				"containment" : [barleft,0,scaleRightPx,0],
				"drag" : function(event,ui){
					var leftbpx = ui.position.left;
					var scaleLeft = Math.ceil( leftbpx * ( (self.props.max - self.props.min) / self.props.width) + self.props.min);
					self.setState({"scaleLeft" : scaleLeft})
					//重新设置左边线
					scaleLeftPx = barleft + (self.state.scaleLeft - self.props.min) / persmallgridnumber * self.smallgridwidth;
					//重新设置RightB的滑动范围。即滑动左块的时候，要重新设置右块。
					setRightB();

					//设置蓝色线
					$(self.refs.range).find(".bar span").css({
						"left"  : leftbpx ,
						"width" : parseInt($(self.refs.range).find(".bar b.right").css("left")) - leftbpx
					});

				 
				}
			});	
		}

		function setRightB(){
			$(self.refs.range).find(".bar b.right").draggable({
				"axis" : "x",
				"containment" : [scaleLeftPx,0,barright,0],
				"drag" : function(event,ui){
					var rightbpx = ui.position.left;
		 
					var scaleRight = Math.ceil( rightbpx * ( (self.props.max - self.props.min) / self.props.width) + self.props.min);
					self.setState({"scaleRight" : scaleRight})
					//重新设置右边线
					scaleRightPx = barleft + (self.state.scaleRight - self.props.min) / persmallgridnumber * self.smallgridwidth;
 					//重新设置RightB的滑动范围。即滑动右块的时候，要重新设置左块。
					setLeftB();

					//设置蓝色线
					$(self.refs.range).find(".bar span").css({
						"width" :  rightbpx - parseInt($(self.refs.range).find(".bar b.left").css("left"))
					});
				}
			});
		}
		//********拖拽业务end********


		 
	}

	//显示刻度线和刻度数字
	showis(){
		var is = [];
		//个数，先比格多一个
		var length = this.biggridamount * 5 + 1;
		 
		for(var i = 0 ; i < length ; i++){
			if(i % 5 != 0){
				is.push(<i key={i}></i>);
			}else{
				is.push(<i key={i}><u>{(this.props.max - this.props.min) / this.biggridamount * (i / 5) + this.props.min}</u></i>)
			}
		}
		return is;
	}


	render(){
		return (
			<div className="range" ref="range" style={{width:this.props.width}}>
				<div className="bar" style={{width:this.props.width + 6}}>
					<b className="left"  style={{left:0}}>
						<u>{this.state.scaleLeft}</u>
					</b>
					<b className="right" style={{left:this.props.width + 1}}>
						<u>{this.state.scaleRight}</u>
					</b>
					<span style={{width:this.props.width + 1}}></span>
				</div>
				<div className="scaleline">
					{this.showis()} 
				</div>
				<input type="button" value="确定" className="btn" onClick={()=>{this.props.onpick("所需金额范围",this.state,this.props.reducerkey)}}/>
			</div>
		);
	}
}

export default range;