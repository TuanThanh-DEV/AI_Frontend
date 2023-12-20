import currencyFormatter from 'currency-formatter';
import moment from 'moment';

const SecurityUtils = {
    hasPermission :(currentUser, permission) => {
        for (var i=0; i < currentUser.roles.length; i++) {
            var permissions = JSON.parse(currentUser.roles[i].permissions);
            if (permissions[permission] == true) {
                return true;
            }
        }
        return false;
    }
}

const FormatterUtils = {

    formatCurrencyFloat :(x) => {
        if(x){
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }else{ return null}
    },
    formatCurrency: (amount) => {
        return currencyFormatter.format(amount, {precision: 0});
    },
    formatYearFromBirthday: (birthday) => {
        if (!birthday) {
            return "";
        } else {
            var year = parseInt(moment().year()) - parseInt(moment(birthday).year());
            if (year > 0) {
                return year;
            } else {
                return parseInt(moment().month()) - parseInt(moment(birthday).month()) + ' tháng';
            }
        }

    }, 
    round2Decimals: (num) => {
        return parseFloat(Math.round(num * 100) / 100);
    },
    // formatTruc: (num) =>{
    convertTextToBarcode: (text)=>{
        var canvas = document.createElement("canvas");
        JsBarcode(canvas, text, {format: "CODE128",displayValue:false});

        return canvas.toDataURL("image/png");
    },

    convertTextToBarcodeDisplayValue: (text)=>{
        var canvas = document.createElement("canvas");
        JsBarcode(canvas, text, {format: "CODE128",displayValue:true});

        return canvas.toDataURL("image/png");
    },
    
    convertImageToDataUri(url, callback) {
        var image = new Image();

        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

            canvas.getContext('2d').drawImage(this, 0, 0);

            // // Get raw image data
            // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

            // ... or get as Data URI
            callback(canvas.toDataURL('image/png'));
        };

        image.src = url;
    },

    downloadImageDataUri(url, component, stateName) {
        this.convertImageToDataUri(url, (dataUri) => {
            component.state[stateName] = dataUri;

        });
    },

    capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    },
    number2words(value)  {
        var t = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
        var methodr = function(r, n) {
            var o = "",
            a = Math.floor(r / 10),
            e = r % 10;
            return a > 1 ? (o = " " + t[a] + " mươi", 1 == e && (o += " mốt")) : 1 == a ? (o = " mười", 1 == e && (o += " một")) : n && e > 0 && (o = " lẻ"), 5 == e && a >= 1 ? o += " lăm" : 4 == e && a >= 1 ? o += " tư" : (e > 1 || 1 == e && 0 == a) && (o += " " + t[e]), o
        };
        var methodn = function(n, o) {
            var a = "",
            e = Math.floor(n / 100),
            n = n % 100;
            return o || e > 0 ? (a = " " + t[e] + " trăm", a += methodr(n, !0)) : a = methodr(n, !1), a
        };
        var methodo = function(t, r) {
            var o = "",
            a = Math.floor(t / 1e6),
            t = t % 1e6;
            a > 0 && (o = methodn(a, r) + " triệu", r = !0);
            var e = Math.floor(t / 1e3),
            t = t % 1e3;
            return e > 0 && (o += methodn(e, r) + " nghìn", r = !0), t > 0 && (o += methodn(t, r)), o
        };
        
        if (0 == value) return t[0];
        var n = "",
        a = "";
        do var ty = value % 1e9, value = Math.floor(value / 1e9), n = value > 0 ? methodo(ty, !0) + a + n : methodo(ty, !1) + a + n, a = " tỷ"; while (value > 0);
        return n.trim();
    }
    // }
};

// parseFloat(Math.round(num3 * 100) / 100).toFixed(2);

const ObjectUtils = {
    // Add property and clone the entity
    addProperty: (sourceObject, key, value) => {
        sourceObject[key] = value;
        return Object.assign({}, sourceObject);
    },
    clone: (sourceObject) => {
        return Object.assign({}, sourceObject);
    }
};

const ArrayUtils = {
    // Add item and clone the array
    push: (sourceArray, item) => {
        sourceArray.push(item);
        return sourceArray.slice(0);
    },

    clone: (sourceArray) => {
        return sourceArray.slice(0);
        // return sourceArray.filter(function(e) { return true }); // clone all
    },

    // remove item and clone the array
    removeById: (sourceArray, item) => {
        return sourceArray.filter(function(e) { return e.id !== item.id });
    },

    findById: (sourceArray, id) => {
        for (var i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i].id == id) {
                return sourceArray[i];
            }
        }
        return null;
    },

    contains: (sourceArray, item) => {
        for (var i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i] === item) {
                return true;
            }
        }
        return false;
    }
};

const StringUtils = {
    checkBothLetterAndNumber: (s) => {
        var upperLetters = /[A-Z]+/g;
        var lowerLetters = /[a-z]+/g;
        var numbers = /[0-9]+/g;
        return (upperLetters.test(s) || lowerLetters.test(s)) && numbers.test(s);
    },
    parseStringToFloat: (numberString) => {
        if (!numberString) {
            return 0;
        } else if (numberString.includes('/')) {
            var numberArray = numberString.split('/');
            return (1.0 * numberArray[0]) / numberArray[1];
        } else {
            return parseFloat(numberString);
        }
    },
    isValidFloat: (numberString) => {
        if (!numberString) {
            return true; // empty is 0
        }
        var numbers = /[0-9]+/g;
        for (var i = 0; i < numberString.length; i++) {
            if (!numbers.test(numberString[i]) && '/' != numberString[i] && '.' != numberString[i]) {
                return false;
            }
        }
        return true;
    }
}

const RandomUtils = {
    generateLetterAndNumber: (length) => {
        var text = "";
        var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    generateNumber: (length) => {
        var text = "";
        var possible = "0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
}

const ScriptUtils = {
    // This should be called in componentDidUpdate to ensure library is run after the page has been rendered.
    loadLibrary: (url) => {
        const footer = document.getElementsByTagName('footer')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        footer.appendChild(script);
    },

    loadFootable: () => {
        ScriptUtils.loadLibrary("/assets/js/pages/table_responsive.js");
    },

    loadAppLayout: () => {
        ScriptUtils.loadLibrary("/assets/js/core/app.js");
    },

    loadFormLayout: () => {
        ScriptUtils.loadLibrary("/assets/js/pages/form_layouts.js");
    }
}
const UrlUtils = {
    getPathWithAllParams: () => {
        return window.location.pathname + window.location.search;
    },
    getPathWithParamsNotPaging: () => {
        var sParam = "page";
        var url = window.location.pathname + '?';
        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        var sURLVariables = sPageURL.split('&');
         
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] != sParam) {
                url = url + sParameterName[0] + '=' + sParameterName[1] + '&' 
            }
        }
        return url.substring(0, url.length - 1);
    }
}
const DateUtils = {
    formatDateForApiParam: (date) => {
        return moment(date).format("YYYY-MM-DD-HH:mm:ss");
    },

    convertApiStringToDate: (dateString) => {
        return moment(dateString, "YYYY-MM-DD-HH:mm:ss").toDate();
    },

    formatDateForScreen: (date) => {
        if (date) {
            return moment(date).format("DD/MM/YYYY");
        } else {
            return "";
        }
        
    },
    
}


export {
    UrlUtils,
    FormatterUtils,
    ObjectUtils,
    ArrayUtils,
    StringUtils,
    ScriptUtils,
    RandomUtils,
    SecurityUtils,
    DateUtils
};