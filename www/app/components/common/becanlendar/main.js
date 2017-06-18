import React from "react";
import {render} from "react-dom";
import BECanlendar from "./BECanlendar.js";


var d = new Date();

var handler = (by,bm,bd,ey,em,ed)=> {
	console.log(by,bm,bd,ey,em,ed)
}

render(
	<div>
		<BECanlendar 
			onpick={handler}
			earliest={{year : d.getFullYear() , month : d.getMonth() + 1 , day : d.getDate()}}
 		/> 
	</div>
		
	, document.getElementById("container")
);