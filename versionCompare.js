/**
 *用js实现version compare函数及测试用例 
 *目标：做成库给外部开发者用，对任意软件的版本号做比较 
 *调用 versionCompare(v1,v2)比较其大小关系。
 *
 * 
 */
//v1比较新时返回1,v1和v2相同是返回0,v2比较新时返回-1;
function versionCompare(v1, v2) {
    var arr1 = v1.toLowerCase().split('.');
    var arr2 = v2.toLowerCase().split('.');
    var len1 = arr1.length;
    var len2 = arr2.length;

    //判断版本号数组最后一位是否带有字母，如果有就使用splitString()方法将数组的最后一位的字母和数字分开
    if (isNaN(arr1[len1 - 1])) {
        arr1 = splitString(arr1);
    }
    if (isNaN(arr2[len2 - 1])) {
        arr2 = splitString(arr2);
    }
    len1 = arr1.length;
    len2 = arr2.length;

    for (var i = 0; i < (len1 > len2 ? len1 : len2); i++) {
        if (arr1[i] != arr2[i]) {
            if (typeof(arr1[i] && arr2[i]) == "undefined" && (!isNaN(arr1[i]) || !isNaN(arr2[i]))) {
                //数组的对应位是数字和undefined
                return typeof(arr1[i]) == "undefined" ? "-1" : "1";
            } else if (typeof(arr1[i] && arr2[i]) == "undefined" && isNaN(arr1[i]) && isNaN(arr2[i])) {
                //数组的对应位是字母和undefined
                return (typeof(arr1[i]) == "undefined") ? "1" : "-1";
            } else if (!isNaN(arr1[i]) && !isNaN(arr2[i])) {
                //数组的对应位都是数字
                return parseInt(arr1[i]) > parseInt(arr2[i]) ? "1" : "-1";
            } else if (isNaN(arr1[i]) && isNaN(arr2[i])) {
                //数组的对应位是字母
                var obj = {
                    a: 0,
                    b: 2,
                    rc: 3
                }; //“alpha”、“beta”和“releasecandidate”版本
                arr1[i] = obj[arr1[i]];
                arr2[i] = obj[arr2[i]];
                return arr1[i] > arr2[i] ? "1" : "-1";
            } else {
                //数组的对应位是字母和数字
                return isNaN(arr1[i]) ? "-1" : "1";
            }
        } else if (len1 == len2 && i == len1 - 1) {
            //版本号相同
            return "0";
        }
    }
}

function splitString(arr) {
    //将版本号数组最后一位的数字和字母分开  [2,2,16b2] => [2,2,16,b,2]
    var item = arr.splice(arr.length - 1, 1);
    var letter = item.toString().replace(/[^a-z]+/ig, "");
    var number = item.toString().replace(/[^0-9]+/ig, ",").split(',');
    arr.push(number.shift(), letter);
    if (number && number[0].length != 0) {
        arr.push(number.shift());
    }
    return arr;
}
console.log(versionCompare("2.2.1a", "2.2.3"));

/*测试用例
// v1     v2    （结果)
"2.2.3"  "2.2.4.16" (-1)
"2.5"    "2.5.5.6"  (-1)
"2.2.1a"  "2.2.3"   (-1)
"0.1.1a" "0.1.1"    (-1)
"1.0.1a" "1.0.1b"   (-1)
"3.1.1b" "3.1.1rc"  (-1)
"2.2.6"  "2.2.6b"    (1)
"1.1.6b" "1.1.6b2"   (-1)
"3.2.6b2" "3.2.6b2"  (0)
*/