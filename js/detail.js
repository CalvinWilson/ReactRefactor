import React from "react";

export default React.createClass ({
	render: function (){
		return (
			<div className="detail">
			  <img src={this.props.data.url} />
			  <ul>
			    <li><strong>Title:</strong> {this.props.data.title}</li>
			    <li><strong>Description:</strong> {this.props.data.description}</li>
			    <li><a href={"/post/" + this.props.data.objectId + "/edit"} >Edit</a></li>
			  </ul>
			</div>
		)
	}
});