import React from 'react';
import Home from "./home/Home.js";
import Invest from "./invest/Invest.js";
import { Route , Link } from 'react-router-dom';


//这是一个函数用来给当前所在的导航条栏目在active
let testactive = (hash)=>{
	// 用/拆分为数组
	var hasharr = window.location.hash.substr(2).split("/");
	if(hasharr[0] == hash){
		return "active";
	}
	return "";
}

export default () => {
	return (
		<section>
			<nav className="navbar navbar-default">
			  <div className="container-fluid">
			   
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#">爱金融P2P金融平台</a>
			    </div>

			 
			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav">
					<li className={testactive("")}><Link to="/">首页<span className="sr-only"></span></Link></li>
					<li className={testactive("invest")}><Link to="/invest">投资<span className="sr-only"></span></Link></li>
			      </ul>
			      <ul className="nav navbar-nav navbar-right">
			        <li><a>欢迎你，小考拉，你已经成功登录</a></li>
			      </ul>
			    </div> 
			  </div> 
			</nav>

			<section className="main">
				<Route exact path="/" component={Home}></Route>
				<Route path="/invest" component={Invest}></Route>
			</section>


		</section>
	);
}