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


function getAge(val) {
    var date = new Date();
    var birthday = new Date(val);
    var xuYear = date.getFullYear() - birthday.getFullYear();

    if ((date.getMonth() < birthday.getMonth()) || (date.getMonth() == birthday.getMonth() && date.getDate() < birthday.getDate())) {
        return xuYear - 1;
    }

    return xuYear;
}



