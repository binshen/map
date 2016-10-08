var map = new BMap.Map("map", {
    enableMapClick: false
});
map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5);
map.enableScrollWheelZoom(true);
map.addControl(new BMap.NavigationControl());

var mapStyle1 = {
    styleJson: [{
        "featureType": "water",
        "elementType": "all",
        "stylers": {
            "color": "#031628"
        }
    }, {
        "featureType": "land",
        "elementType": "geometry",
        "stylers": {
            "color": "#000102"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#000000"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#147a92"
        }
    }, {
        "featureType": "arterial",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#000000"
        }
    }, {
        "featureType": "arterial",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#0b3d51"
        }
    }, {
        "featureType": "local",
        "elementType": "geometry",
        "stylers": {
            "color": "#000000"
        }
    }, {
        "featureType": "railway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#000000"
        }
    }, {
        "featureType": "railway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#08304b"
        }
    }, {
        "featureType": "subway",
        "elementType": "geometry",
        "stylers": {
            "lightness": -70
        }
    }, {
        "featureType": "building",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#000000"
        }
    }, {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#857f7f"
        }
    }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#000000"
        }
    }, {
        "featureType": "building",
        "elementType": "geometry",
        "stylers": {
            "color": "#022338"
        }
    }, {
        "featureType": "green",
        "elementType": "geometry",
        "stylers": {
            "color": "#062032"
        }
    }, {
        "featureType": "boundary",
        "elementType": "all",
        "stylers": {
            "color": "#465b6c"
        }
    }, {
        "featureType": "manmade",
        "elementType": "all",
        "stylers": {
            "color": "#022338"
        }
    }, {
        "featureType": "label",
        "elementType": "all",
        "stylers": {
            "color": "#022338",
            "visibility": "off"
        }
    }]
};
var mapStyle2 = {
    style: 'bluish'
};
map.setMapStyle(mapStyle1);

map.addEventListener("zoomend", function(type, target) {
    var zoom = map.getZoom();
    if(zoom < 7) {
        map.setMapStyle(mapStyle1);
    } else {
        map.setMapStyle(mapStyle2);
    }
});

function getBoundary(data){
    var boundary = new BMap.Boundary();
    boundary.get(data[0], function(rs){
        var color = data[1];
        var count = rs.boundaries.length;
        for(var i = 0; i < count; i++){
            var ply = new BMap.Polygon(rs.boundaries[i], {
                strokeWeight: 1,
                strokeOpacity:0.5,
                fillColor:color,
                strokeColor: "#000000"
            });
            map.addOverlay(ply);
        }
    });
}

var datas = [
    ["广西", "#C8C1E3"],
    ["广东", "#FBC5DC"],
    ["湖南", "#DBEDC7"],
    ["贵州", "#E7CCAF"],
    ["云南", "#DBEDC7"],
    ["福建", "#FEFCBF"],
    ["江西", "#E7CCAF"],
    ["浙江", "#C8C1E3"],
    ["安徽", "#FBC5DC"],
    ["湖北", "#C8C1E3"],
    ["河南", "#DBECC8"],
    ["江苏", "#DBECC8"],
    ["四川", "#FCFBBB"],
    ["海南", "#FCFBBB"],
    ["山东", "#FCFBBB"],
    ["辽宁", "#FCFBBB"],
    ["新疆", "#FCFBBB"],
    ["西藏", "#E7CCAF"],
    ["陕西", "#E7CCAF"],
    ["河北", "#E7CCAF"],
    ["黑龙江", "#E7CCAF"],
    ["宁夏", "#FBC5DC"],
    ["内蒙古", "#DBEDC7"],
    ["青海", "#DBEDC7"],
    ["甘肃", "#C8C1E3"],
    ["山西", "#FBC5DC"],
    ["吉林", "#C8C1E3"],
    ["北京", "#FBC5DC"],
    ["天津", "#C8C1E3"],
    ["上海", "#FCFBBB"],
    ["重庆", "#FBC5DC"],
    ["香港", "#C8C1E3"],
    ["台湾", "#E7CCAF"]
];

for(var i=0;i<datas.length;i++){
    getBoundary(datas[i]);
}

/*
function addAlert(longitude, latitude) {
    var data = [];
    data.push({
        geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
        },
        count: 100
    });
    var dataSet = new mapv.DataSet(data);
    var options = {
        fillStyle: 'rgba(255, 0, 0, 0.6)',
        shadowColor: 'rgba(255, 0, 0, 1)',
        shadowBlur: 30,
        globalCompositeOperation: 'lighter',
        methods: {
            click: function (item) {
                alert(item);
            }
        },
        size: 5,
        draw: 'simple'
    };
    var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
    mapvLayer.show();
}

function removeAlert(longitude, latitude) {

}
*/

var _color1 = ["rgba(255, 255, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 0, 0, 0.6)"];
var _color2 = ["rgba(255, 255, 0, 1)", "rgba(255, 165, 0, 1)", "rgba(255, 0, 0, 1)"];

function addAlert(msg) {
    var json = JSON.parse(msg);
    var data = [];
    data.push({
        geometry: {
            type: 'Point',
            coordinates: [json.lng, json.lat]
        },
        key: json.key
    });
    var dataSet = new mapv.DataSet(data);
    var level = json.lvl;
    var options = {
        fillStyle: _color1[level-1],
        shadowColor: _color2[level-1],
        shadowBlur: 30,
        globalCompositeOperation: 'lighter',
        methods: {
            click: function (item) {
                window.location.href="http://www.7drlb.com/dp/"+item.key;
            }
        },
        size: 5,
        draw: 'simple'
    };
    var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
    mapvLayer.show();

    setTimeout(function() {
        mapvLayer.hide();
    }, 3*60*1000);
}
