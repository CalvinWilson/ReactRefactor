import React from 'react';

export default React.createClass({
	MyFunc: function(e){
		e.preventDefault;
		this.value = e.target.val;
	},

    render: function(){
        return (
            <form id="detailForm">
                {this.props.data.objectId ? <input id="objectId" type="hidden" onChange="MyFunc" value={this.props.data.objectId} /> : <input id="objectId" type="hidden" onChange="MyFunc" />}
    
            <div className="form-group">
                <lable for="title">Title</lable>
                {this.props.data.title ? <input id="title" type="text" onChange="MyFunc" className="form-control" placeholder="Title" value={this.props.data.title} /> : <input id="title" type="text" onChange="MyFunc" className="form-control" placeholder="Title"  />}
            </div>

            <div className="form-group">
                <lable for="url">Image URL</lable>
                {this.props.data.url ? <input id="url" type="text" onChange="MyFunc" className="form-control" placeholder="Image URL" value={this.props.data.url} /> : <input id="url" type="text" onChange="MyFunc" className="form-control" placeholder="Image URL" />}
            </div>

            <div className="form-group">
                <lable for="description">Description</lable>
                {this.props.data.description ? <input id="description" type="text" onChange="MyFunc" className="form-control" placeholder="Description" value={this.props.data.description} /> : <input id="description" type="text" onChange="MyFunc" className="form-control" placeholder="Description" />}
            </div>
            <button className="btn btn-default" type="submit">Submit</button>

            </form>
        )
    }

})