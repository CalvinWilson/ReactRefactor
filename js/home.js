import React from "react";

export default React.createClass ({
	render: function () {
		return (
				<ul id="main">
					{this.props.data.map(function(obj){
						return (
							<li>
								<a href={"/detail/" + obj.objectId}>
									<img src={obj.url} />
								</a>
							</li>
						)
					})}
				</ul>
		)
	}
})