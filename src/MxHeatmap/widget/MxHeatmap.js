require(
	{
		packages:[
			{
				name:'_simpleheat',
				location:'/widgets/MxHeatmap/lib/heatcanvas/',
				main:'simpleheat'
			}
		]
	},
	[
		"dojo/_base/declare",
		"mxui/widget/_WidgetBase",
		"dijit/_TemplatedMixin",
		"mxui/dom",
		"dojo/dom",
		"dojo/dom-prop",
		"dojo/dom-geometry",
		"dojo/dom-class",
		"dojo/dom-style",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/_base/lang",
		"dojo/text",
		"dojo/html",
		"dojo/_base/event",
		"dojo/mouse",
		"dojo/on",
		"_simpleheat",
		"dojo/text!MxHeatmap/widget/template/MxHeatmap.html"
	],
	function(
		declare,
		_WidgetBase,
		_TemplatedMixin,
		dom,
		dojoDom,
		dojoProp,
		dojoGeometry,
		dojoClass,
		dojoStyle,
		dojoConstruct,
		dojoArray,
		lang,
		dojoText,
		dojoHtml,
		dojoEvent,
		mouse,
		on,
		_simpleheat,
		widgetTemplate
	){
		"use strict";
		return declare(
			"MxHeatmap.widget.MxHeatmap",
			[
				_WidgetBase,
				_TemplatedMixin
			],
			{
				templateString:widgetTemplate,
				widgetBase:null,
				_handles:null,
				_contextObj:null,
				//------------------------------
				input_blur:null,
				input_radius:null,
				canvas:null,
				//------------------------------
				str_data_path:null,
				str_data_x:null,
				str_data_y:null,
				str_data_mag:null,
				//------------------------------
				_objectChangeHandler:null,
				//------------------------------
				constructor:function(){
					this._handles=[];
				},
				postCreate:function(){
				},
				update:function(obj,callback){
					if(this._objectChangeHandler!==null) {
						this.unsubscribe(this._objectChangeHandler);
					}
					if(obj!=null){
						this._objectChangeHandler=this.subscribe({
							guid: obj.getGuid(),
							callback:dojo.hitch(this,function(){
								this._updateRendering(callback);
							})
						});
					}else{
					}
					this._contextObj=obj;
					this._updateRendering(callback);
					this._executeCallback(callback,"update");
				},
				resize:function(box){
				},
				uninitialize:function(){
				},
				destroy:function () {
				},
				_updateRendering:function(callback){
					if(this._contextObj!=null){
						dojoStyle.set(this.domNode,"display","block");
						if(
							this.str_data_path!=null&&this.str_data_path!=''&&
							this.str_data_x!=null&&this.str_data_x!=''&&
							this.str_data_y!=null&&this.str_data_y!=''&&
							this.str_data_mag!=null&&this.str_data_mag!=''
						){
							mx.data.get({
								guid:this._contextObj.getGuid(),
								path:this.str_data_path,
								filter:{
									offset:0,
									amount:4096
								},
								callback:dojo.hitch(this,function(arr_obj){
									console.log('----------------------------------------')
									console.log(arr_obj);
									console.log('----------------------------------------')
									this.data=[];
									this.max_x=null;
									this.min_x=null;
									this.max_y=null;
									this.min_y=null;
									this.max_mag=null;
									this.min_mag=null;
									arr_obj.forEach(dojo.hitch(this,function(obj,objidx){
										var x=obj.get(this.str_data_x);
										var y=obj.get(this.str_data_y);
										var mag=obj.get(this.str_data_mag);
										this.max_x=this.max_x==null?x:this.max_x<x?x:this.max_x;
										this.max_y=this.max_y==null?y:this.max_y<y?y:this.max_y;
										this.max_mag=this.max_mag==null?y:this.max_mag<y?y:this.max_mag;
										this.min_x=this.min_x==null?x:this.min_x>x?x:this.min_x;
										this.min_y=this.min_y==null?y:this.min_y>y?y:this.min_y;
										this.min_mag=this.min_mag==null?y:this.min_mag>y?y:this.min_mag;
										this.data.push(
											[
												x,
												y,
												mag
											]
										);
									}));
									console.log('----------------------------------------')
									console.log('max_x:   '+this.max_x);
									console.log('min_x:   '+this.min_x);
									console.log('max_y:   '+this.max_y);
									console.log('min_y:   '+this.min_y);
									console.log('max_mag: '+this.max_mag);
									console.log('min_mag: '+this.min_mag);
									console.log('----------------------------------------')
									this.canvas.width;
									this.canvas.height;
									dojo.style(this.canvas,'background','rgba(0,0,0,0.2)');
									dojo.style(this.canvas,'width','100%');
									dojo.style(this.canvas,'height','auto');
									this.data.forEach(dojo.hitch(this,function(d,didx){
										d[0]=(d[0]-this.min_x)/this.max_x*this.canvas.width*2;
										d[1]=(d[1]-this.min_y)/this.max_y*this.canvas.height*2;
									}));
									console.log(this.data);
									this.render();
								}),
								error:dojo.hitch(this,function(e){
									console.error("Could not retrieve objects:",e);
								})
							});
						}
					} else {
						dojoStyle.set(this.domNode,"display","none");
					}
					this._executeCallback(callback,"_updateRendering");
				},
				render:function(){
					window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								       window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
					function get(id) {
					    return document.getElementById(id);
					}
					var heat = simpleheat(this.canvas).data(this.data).max(this.max_mag),
					    frame;

					function draw() {
					    console.time('draw');
					    heat.draw();
					    console.timeEnd('draw');
					    frame = null;
					}

					draw();
					/*
					get('canvas').onmousemove = function (e) {
					    heat.add([e.layerX, e.layerY, 1]);
					    frame = frame || window.requestAnimationFrame(draw);
					};
					*/

					var radius = get('radius'),
					    blur = get('blur'),
					    changeType = 'oninput' in radius ? 'oninput' : 'onchange';

					radius[changeType] = blur[changeType] = function (e) {
					    heat.radius(+radius.value, +blur.value);
					    frame = frame || window.requestAnimationFrame(draw);
					};
				},
				_execMf:function(mf,guid,cb){
					if(mf&&guid){
						mx.ui.action(
							mf,
							{
								params: {
									applyto:"selection",
									guids:[guid]
								},
								callback:lang.hitch(this,function(objs){
									if(cb&&typeof cb==="function"){
										cb(objs);
									}
								}),
								error:function(error){
									console.debug(error.description);
								}
							},
							this
						);
					}
				},
				_executeCallback:function(cb,from){
					if(cb&&typeof cb==="function"){
						cb();
					}
				}
			}
		);
	}
);
