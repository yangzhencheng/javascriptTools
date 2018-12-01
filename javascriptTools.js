// Author: MysteriousMan
// QQ: 724207239
// https://github.com/yangzhencheng/javascriptTools


var rootUrl = "";
var isDebug = true;     // 调试模式

if (isDebug) {
    rootUrl = "/";
}
else {
    rootUrl = "http://www.ztbx.com/";
}

function setCookie(c_key, c_value) {
    delCookie(c_key);
    document.cookie = c_key + "=" + c_value;
}

function getCookie(c_key) {
    if (document.cookie.length == 0) {
        return "";
    }

    if (document.cookie.indexOf(";") == -1) {
        if (document.cookie.split("=")[0] == c_key) {
            return document.cookie.split("=")[1];
        }
        else {
            return "";
        }
    }

    c_array = document.cookie.split(";");
    var result = "";

    for (var i = 0; i < c_array.length; i++) {
        if (c_array[i].split("=")[0].trim() == c_key) {
            result = c_array[i].split("=")[1];
        }
    }

    return result;
}

function delCookie(c_key) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);

    document.cookie = c_key + "=a; expires=" + date.toGMTString();
}

function clearCookie() {
    if (document.cookie.length == 0) {
        return "";
    }
    
    var date = new Date();
    
    date.setTime(date.getTime() - 10);
    
    if (document.cookie.indexOf(";") == -1) {
        c_key = document.cookie.split("=")[0];
        document.cookie = c_key + "=a;expires=" + date.toGMTString();
    }
    
    c_array = document.cookie.split(";");
    for (var i = 0; i < c_array.length; i++) {
        document.cookie = c_array[i].split("=")[0] + "=a;expires=" + date.toGMTString();
    }
}

function request_val(str) {
    var urls = location.href;
    var getValue = "";

    if (urls.indexOf("?") != -1) {
        var strLine = urls.substr(urls.indexOf("?") + 1);
        strArray = strLine.split("&");

        for (var i = 0; i < strArray.length; i++) {
            if (str == strArray[i].split("=")[0]) {
                getValue = strArray[i].split("=")[1];
                break;
            }
        }
    }

    return getValue;
}

function request_del(str) {
    var urls = location.href;
    var getValue = "";

    if (urls.indexOf("?") == -1) return urls;


    var strLine = urls.substr(urls.indexOf("?") + 1);
    strArray = strLine.split("&");

    for (var i = 0; i < strArray.length; i++) {
        if (str != strArray[i].split("=")[0]) {
            if (getValue.length > 0) getValue += "&";
            getValue += strArray[i].split("=")[0] + "=" + strArray[i].split("=")[1];
        }
    }

    if (getValue.length > 0) {
        return urls.substring(0, urls.indexOf("?")) + "?" + getValue;
    }
    else {
        return urls.substring(0, urls.indexOf("?"));
    }
}


function request_set(strName, strValue) {
    var urls = request_del(strName);
    
    if (urls.indexOf("?") == -1) {
        return urls + "?" + strName + "=" + strValue;
    }
    else {
        return urls + "&" + strName + "=" + strValue;
    }
}



// 对应 request_*，这里只管处理字符串
function url_del(url, str) {
    var urls = url;
    var getValue = "";

    if (urls.indexOf("?") == -1) return urls;


    var strLine = urls.substr(urls.indexOf("?") + 1);
    strArray = strLine.split("&");

    for (var i = 0; i < strArray.length; i++) {
        if (str != strArray[i].split("=")[0]) {
            if (getValue.length > 0) getValue += "&";
            getValue += strArray[i].split("=")[0] + "=" + strArray[i].split("=")[1];
        }
    }

    if (getValue.length > 0) {
        return urls.substring(0, urls.indexOf("?")) + "?" + getValue;
    }
    else {
        return urls.substring(0, urls.indexOf("?"));
    }
}


function url_set(url, strName, strValue) {
    var urls = url_del(url, strName);

    if (urls.indexOf("?") == -1) {
        return urls + "?" + strName + "=" + strValue;
    }
    else {
        return urls + "&" + strName + "=" + strValue;
    }
}
//////////////////////////////////////////


function setHTMLSelect(objname, val) {
    var obj = document.getElementById(objname);

    for (var i = 0; i < obj.length; i++) {
        if (obj.options[i].value == val) {
            obj.options[i].selected = true;
        }
    }
}

function replaceAll(str, sc, de) {
    while (str.indexOf(sc) >= 0) {
        str = str.replace(sc, de);
    }

    return str;
}

// 组合 CheckBox 值
function getAllCheckBox(objname, property) {
    var obj = document.getElementsByName(objname);
    var result = "";
    
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            if (result.length > 0) result += ",";
            
            result += obj[i].getAttribute(property);
        }
    }

    return result;
}

// CheckBox 值求和
function getSumCheckBox(objname, property) {
    var obj = document.getElementsByName(objname);
    var result = 0;

    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            result += parseInt(obj[i].getAttribute(property));
        }
    }

    return result;
}



// 邮箱验证
function isEmail(strEmail) {
    var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var strEmail = pattern.test(strEmail);
    if (strEmail) {
        return true;
    }
    else {
        return false;
    }
}


// 取得年龄
// 出生日期: val
function getAge(val) {
    var date = new Date();
    var birthday = new Date(val);
    var xuYear = date.getFullYear() - birthday.getFullYear();

    if ((date.getMonth() < birthday.getMonth()) || (date.getMonth() == birthday.getMonth() && date.getDate() < birthday.getDate())) {
        return xuYear - 1;
    }

    return xuYear;
}



// 列表跳转导航
// obj -> HTML 中的 ID, page -> 当前第几页, totpage -> 总页数
function listpager(obj, page, totpage) {
    if (totpage <= 1) return;

    

    var url = request_del("page");
    var ul = document.createElement("ul");
    ul.setAttribute("class", "pagerlist");


    // 首页 + 上一页
    var firstli = document.createElement("li");
    var provli = document.createElement("li");

    if (1 == page) {
        firstli.innerText = "首页";
        provli.innerText = "上一页";
        firstli.setAttribute("class", "n");
        provli.setAttribute("class", "n");
    }
    else {
        var a1 = document.createElement("a");
        a1.setAttribute("href", request_set("page", 1));
        var a2 = document.createElement("a");
        a2.setAttribute("href", request_set("page", page - 1));


        a1.innerText = "首页";
        a2.innerText = "上一页";

        firstli.appendChild(a1);
        provli.appendChild(a2);
    }
    ul.appendChild(firstli);
    ul.appendChild(provli);
    
    

    // 列表循环
    if (totpage <= 11) {

        for (var i = 1; i <= totpage; i++) {
            var li = document.createElement("li");


            if (i == page) {
                li.setAttribute("class", "active");
                li.innerText = i;
            }
            else {
                var a = document.createElement("a");
                a.setAttribute("href", request_set("page", i));
                a.innerText = i;
                li.appendChild(a);
            }

            ul.appendChild(li);
        }
    }
    else {
        if (page <= 5) {
            for (var i = 1; i <= 11; i++) {
                var li = document.createElement("li");


                if (i == page) {
                    li.setAttribute("class", "active");
                    li.innerText = i;
                }
                else {
                    var a = document.createElement("a");
                    a.setAttribute("href", request_set("page", i));
                    a.innerText = i;
                    li.appendChild(a);
                }

                ul.appendChild(li);
            }
        }
        else if (page >= totpage - 5) {
            for (var i = totpage - 10; i <= totpage; i++) {
                var li = document.createElement("li");


                if (i == page) {
                    li.setAttribute("class", "active");
                    li.innerText = i;
                }
                else {
                    var a = document.createElement("a");
                    a.setAttribute("href", request_set("page", i));
                    a.innerText = i;
                    li.appendChild(a);
                }

                ul.appendChild(li);
            }
        }
        else {
            for (var i = page - 5; i <= page + 5; i++) {
                var li = document.createElement("li");


                if (i == page) {
                    li.setAttribute("class", "active");
                    li.innerText = i;
                }
                else {
                    var a = document.createElement("a");
                    a.setAttribute("href", request_set("page", i));
                    a.innerText = i;
                    li.appendChild(a);
                }

                ul.appendChild(li);
            }
        }
    }
    

    // 尾页 + 下一页
    var lastli = document.createElement("li");
    var nextli = document.createElement("li");

    if (totpage == page) {
        lastli.innerText = "尾页";
        nextli.innerText = "下一页";
        lastli.setAttribute("class", "n");
        nextli.setAttribute("class", "n");
    }
    else {
        var a1 = document.createElement("a");
        a1.setAttribute("href", request_set("page", totpage));
        var a2 = document.createElement("a");
        a2.setAttribute("href", request_set("page", page + 1));


        a1.innerText = "尾页";
        a2.innerText = "下一页";

        nextli.appendChild(a2);
        lastli.appendChild(a1);

    }
    ul.appendChild(nextli);
    ul.appendChild(lastli);

    obj.appendChild(ul);
}



// 列表跳转导航（特制）
function listpagerSet(obj, url, page, totpage) {
    if (totpage <= 1) return;


    var ul = document.createElement("ul");
    ul.setAttribute("class", "pagerlist");


    // 首页 + 上一页
    var firstli = document.createElement("li");
    var provli = document.createElement("li");

    if (1 == page) {
        firstli.innerText = "首页";
        provli.innerText = "上一页";
        firstli.setAttribute("class", "n");
        provli.setAttribute("class", "n");
    }
    else {
        var a1 = document.createElement("a");
        a1.setAttribute("href", "javascript:void(0);");
        a1.setAttribute("onclick", "setMenuContentArea('" + url_set(url, "page", 1) + "')");
        var a2 = document.createElement("a");
        a2.setAttribute("href", "javascript:void(0);");
        a2.setAttribute("onclick", "setMenuContentArea('" + url_set(url, "page", page - 1) + "')");


        a1.innerText = "首页";
        a2.innerText = "上一页";

        firstli.appendChild(a1);
        provli.appendChild(a2);
    }
    ul.appendChild(firstli);
    ul.appendChild(provli);



    // 列表循环
    if (totpage <= 11) {

        for (var i = 1; i <= totpage; i++) {
            var li = document.createElement("li");


            if (i == page) {
                li.setAttribute("class", "active");
                li.innerText = i;
            }
            else {
                var a = document.createElement("a");
                a.setAttribute("href", "javascript:void(0);");
                a.setAttribute("onclick", "setMenuContentArea('" + url_set(url, "page", i) + "')");
                a.innerText = i;
                li.appendChild(a);
            }

            ul.appendChild(li);
        }
    }
    else {
        if (page <= 5) {
            for (var i = 1; i <= 11; i++) {
                var li = document.createElement("li");


                if (i == page) {
                    li.setAttribute("class", "active");
                    li.innerText = i;
                }
                else {
                    var a = document.createElement("a");
                    a.setAttribute("href", "javascript:void(0);");
                    a.setAttribute("onclick", "setMenuContentArea('" + url_set(url, "page", i) + "')");
                    a.innerText = i;
                    li.appendChild(a);
                }

                ul.appendChild(li);
            }
        }
        else if (page >= totpage - 5) {
            for (var i = totpage - 10; i <= totpage; i++) {
                var li = document.createElement("li");


                if (i == page) {
                    li.setAttribute("class", "active");
                    li.innerText = i;
                }
                else {
                    var a = document.createElement("a");
                    a.setAttribute("href", "javascript:void(0);");
                    a.setAttribute("onclick", "setMenuContentArea('" + url_set(url, "page", i) + "')");
                    a.innerText = i;
                    li.appendChild(a);
                }

                ul.appendChild(li);
            }
        }
        else {
            for (var i = page - 5; i <= page + 5; i++) {
                var li = document.createElement("li");


                if (i == page) {
                    li.setAttribute("class", "active");
                    li.innerText = i;
                }
                else {
                    var a = document.createElement("a");
                    a.setAttribute("href", "javascript:void(0);");
                    a.setAttribute("onclick", "setMenuContentArea('" + url_set(url, "page", i) + "')");
                    a.innerText = i;
                    li.appendChild(a);
                }

                ul.appendChild(li);
            }
        }
    }


    // 尾页 + 下一页
    var lastli = document.createElement("li");
    var nextli = document.createElement("li");

    if (totpage == page) {
        lastli.innerText = "尾页";
        nextli.innerText = "下一页";
        lastli.setAttribute("class", "n");
        nextli.setAttribute("class", "n");
    }
    else {
        var a1 = document.createElement("a");
        a1.setAttribute("href", "javascript:void(0);");
        a1.setAttribute("onclick", "setMenuContentArea('" + url_set(url, "page", totpage) + "')");
        var a2 = document.createElement("a");
        a2.setAttribute("href", "javascript:void(0);");
        a2.setAttribute("onclick", "setMenuContentArea('" + url_set(url, "page", page + 1) + "')");


        a1.innerText = "尾页";
        a2.innerText = "下一页";

        nextli.appendChild(a2);
        lastli.appendChild(a1);

    }
    ul.appendChild(nextli);
    ul.appendChild(lastli);

    obj.appendChild(ul);
}
