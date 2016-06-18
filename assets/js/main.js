"use strict";

function mapCallBack(data) {
    var current = data.current,
        map, route = new Array(), undetermin = new Array();
    map = new google.maps.Map(document.getElementById('map-content'), {
        //center: { lat: 22.8531358, lng: 111.249542 },
        //zoom: 8
    });
    data.route.forEach(function(username, index){
        var profile = Object.getOwnPropertyDescriptor(data.profile, username).value;
        profile.username = username;
        route[index] = profile;
    });
    data.undetermin.forEach(function(username, index){
        var profile = Object.getOwnPropertyDescriptor(data.profile, username).value;
        profile.username = username;
        undetermin[index] = profile;
    });

    /**
     * 转换完成后需要用到的变量
     * route
     * undetermin
     * current
     * map
     */
    /**
     * 标记 和 面板部分
     * route undetermin 的location都需要做
     * 面板就是个人信息什么的……
     */
    /**
     * 画线部分 和 传递状况
     * index < current-1 部分画实线
     * 其余部分画虚线或者其他表示方式 (选做)
     * 传递状况做一个list就可以
     */
    

    // Debug require
    console.log(route, undetermin);
    window.map = map;
    window.data = data;
    //console.log(data, map);
}

function initMap() {
    var request = new XMLHttpRequest(),
        dataurl = "assets/data.json",
        callback = mapCallBack;
    request.open('GET', dataurl, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            callback.call(this, JSON.parse(
                request.responseText.replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))/g, function (word) {
                    return /^\/{2,}/.test(word) ? "" : word; //去除注释
                })));
        } else {
            alert("500啦，按下F5吧~");
        }
    };
    request.onerror = function () {
        alert("请求超时啦，按下F5吧~");
    };
    request.send();
}