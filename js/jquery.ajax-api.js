function get_vin(){
	var vinnumber=jQuery("#vin_number").val();
	jQuery("#loader").show();
	if(vinnumber=="")
		{
			jQuery("#vin_Info").html("<span style='color:red;font-weight: bold;margin-left: 6px;'>Please Enter Vehicle Identification Number(VIN)</span>");
		}
	else
		{
			var vin_len = vinnumber.length;
			var lastfourChar=vinnumber.slice(-4);
			if(vin_len!=17 || isNaN(lastfourChar) == true)
				{
					jQuery("#loader").hide();					
					jQuery("#vin_Info").html("<span style='color:red;font-weight: bold;margin-left: 6px;'>The VIN is incorrect. It must be 17 characters</span>");	
				
				}
			else {
			var urls=jQuery("#urls").val();
			var htmldata='';
			var urls = urls+"?vin="+vinnumber;
			jQuery.ajax({ 
			 url:urls,
			 success:function(data){ 
			 jQuery("#loader").hide();
				jQuery.each(data.styleHolder,function(i,data){
						htmldata +="<div class='expands expand0'><span style='cursor:pointer;' onclick=\"expandable(0)\"><strong>VIN Details</strong></span>";
						htmldata +="<ul>";
							htmldata +="<li><strong>VIN Number :</strong>" +vinnumber+"</li>";
							var WMI = vinnumber.substr(0, 3);
							var VDS = vinnumber.substr(3, 8);
							htmldata +="<li><strong>WMI :</strong>" +WMI+"</li>";
							htmldata +="<li><strong>VDS :</strong>" +VDS+"</li>";
							htmldata +="<li><strong>Name :</strong>" +data.makeName+"</li>";
							htmldata +="<li><strong>Make Year :</strong>" +data.year+"</li>";
						htmldata +="</ul>";
						htmldata +="</div>";
						
						htmldata +="<div class='expands expand1'><span style='cursor:pointer;' onclick=\"expandable(1)\"><strong>Technical Information</strong></span>";
						htmldata +="<ul style='display:none'>";
						if(typeof(data.transmissionType) != "undefined"){
							htmldata +="<li><strong>Transmission Type :</strong>" +data.transmissionType+"</li>";
							}
							if(typeof(data.engineType) != "undefined"){
							htmldata +="<li><strong>Engine Type :</strong>" +data.engineType+"</li>";
							}
							if(typeof(data.engineCompressorType) != "undefined"){
							htmldata +="<li><strong>Engine Compressor Type :</strong>" +data.engineCompressorType+"</li>";
							}
							if(typeof(data.engineFuelType) != "undefined"){
							htmldata +="<li><strong>Engine Fuel Type :</strong>" +data.engineFuelType+"</li>";
							}
							if(typeof(data.engineCylinder) != "undefined"){
							htmldata +="<li><strong>Engine Cylinder Type :</strong>" +data.engineCylinder+"</li>";
							}
							if(typeof(data.engineSize) != "undefined"){
							htmldata +="<li><strong>Engine Size :</strong>" +data.engineSize+"</li>";
							}
							if(typeof(data.attributeGroups.DRIVE_TYPE) != "undefined"){
								if(typeof(data.attributeGroups.DRIVE_TYPE.attributes.DRIVEN_WHEELS) != "undefined"){
									htmldata +="<li><strong>Driveline :</strong>" +data.attributeGroups.DRIVE_TYPE.attributes.DRIVEN_WHEELS.value+"</li>";
								}
							}
							if(typeof(data.attributeGroups.STEERING) != "undefined"){
								if(typeof(data.attributeGroups.STEERING.attributes.POWER_STEERING) != "undefined"){
									htmldata +="<li><strong>Steering :</strong>" +data.attributeGroups.STEERING.attributes.POWER_STEERING.value+"</li>";
								}
							}
						htmldata +="</ul>";
						htmldata +="</div>";
						
						if(typeof(data.attributeGroups.BRAKE_SYSTEM) != "undefined"){
						htmldata +="<div class='expands expand2'><span style='cursor:pointer;' onclick=\"expandable(2)\"><strong>Brake System</strong></span>";
						htmldata +="<ul style='display:none'>";
							htmldata +="<ul style='display:none'>";
								if(typeof(data.attributeGroups.BRAKE_SYSTEM.attributes.FRONT_BRAKE_WIDTH) != "undefined"){
									htmldata +="<li><strong>Front Brake Width:</strong>" +data.attributeGroups.BRAKE_SYSTEM.attributes.FRONT_BRAKE_WIDTH.value+"</li>";
								}
								if(typeof(data.attributeGroups.BRAKE_SYSTEM.attributes.FRONT_BRAKE_TYPE) != "undefined"){
									htmldata +="<li><strong>Brake Front :</strong>" +data.attributeGroups.BRAKE_SYSTEM.attributes.FRONT_BRAKE_TYPE.value+"</li>";
								}
								if(typeof(data.attributeGroups.BRAKE_SYSTEM.attributes.REAR_BRAKE_TYPE) != "undefined"){
									htmldata +="<li><strong>Brake Rear :</strong>" +data.attributeGroups.BRAKE_SYSTEM.attributes.REAR_BRAKE_TYPE.value+"</li>";
								}
						htmldata +="</ul>";
						htmldata +="</div>";
						}
						
						htmldata +="<div class='expands expand3'><span style='cursor:pointer;' onclick=\"expandable(3)\"><strong>Vehicle Details</strong></span>";
						htmldata +="<ul style='display:none'>";
							htmldata +="<li><strong>Model Id :</strong>" +data.modelId+"</li>";
							htmldata +="<li><strong>Model Name :</strong>" +data.modelName+"</li>";
							htmldata +="<li><strong>PRIMARY BODY TYPE :</strong>" +data.categories.PRIMARY_BODY_TYPE[0]+"</li>";
							if(typeof(data.attributeGroups.STYLE_INFO.attributes.VEHICLE_STYLE) != "undefined"){
							htmldata +="<li><strong>Body Style :</strong>" +data.attributeGroups.STYLE_INFO.attributes.VEHICLE_STYLE.value+"</li>";
							}
							if(typeof(data.attributeGroups.STYLE_INFO.attributes.VEHICLE_SIZE_CLASS) != "undefined"){
							htmldata +="<li><strong>Vehicle Size :</strong>" +data.attributeGroups.STYLE_INFO.attributes.VEHICLE_SIZE_CLASS.value+"</li>";
							}
							htmldata +="<li><strong>Model Year :</strong>" +data.year+"</li>";
							if(typeof(data.attributeGroups.DOORS.attributes.NUMBER_OF_DOORS) != "undefined"){
								htmldata +="<li><strong>Doors :</strong>" +data.attributeGroups.DOORS.attributes.NUMBER_OF_DOORS.value+"</li>";
							}
							if(typeof(data.attributeGroups.STYLE_INFO.attributes.WHERE_BUILT) != "undefined"){
								htmldata +="<li><strong>Manufactured in :</strong>" +data.attributeGroups.STYLE_INFO.attributes.WHERE_BUILT.value+"</li>";
							}
							
						htmldata +="</ul>";
						htmldata +="</div>";
						if(typeof(data.subModels) != "undefined"){var img_urls=jQuery("#img_urls").val();if(typeof(data.subModels[0]) != "undefined"){var img_urls = img_urls+"?styleIds="+data.subModels[0]['styleIds'][0];}else if(typeof(data.styleIds[0]) != "undefined"){var img_urls = img_urls+"?styleIds="+data.styleIds[0];}
						jQuery.ajax({ 
							 url:img_urls,
							 success:function(response){ 
								 htmldata +="<div class='expands expand21'><span style='cursor:pointer;' onclick=\"expandable(21)\"><strong>Images</strong></span>";
								 htmldata +="<ul style='display:none'>";
								 jQuery.each(response,function(i,response){
									var str = response['id'];
									var res = str.substring(9);
									htmldata +="<li style='list-style: outside none none;padding: 0;border-bottom: none;font-size: 14px;margin: 0;' id='images'><a class='lightbox' href='#light_box"+i+"'><img src='http://media.ed.edmunds-media.com"+ res +"_150.jpg' style='display: block;width: 180px;float: left;margin: 10px;' /></a></li>";
										htmldata +="<div class='lightbox-target' id='light_box"+i+"'><img src='http://media.ed.edmunds-media.com"+ res +"_500.jpg' width='815px'/><a class='lightbox-close' href='#images'></a></div>";	
								 });
								 htmldata +="</ul>";
								 htmldata +="</div>";
								 jQuery("#vin_Info").html("<h2>Result of VIN decoding process (No guarantee)</h2>"+htmldata);
						    }
						});
					}				  
					  jQuery("#vin_Info").html("<h2>Result of VIN decoding process (No guarantee)</h2>"+htmldata);
				});
			  },
			  error: function(data) {				 
					 jQuery("#vin_Info").html("The VIN is incorrect. It must be 17 characters");
				  }
		   });
		}
		}
}
function expandable(id){jQuery(".expand" + id +" ul").slideToggle();}