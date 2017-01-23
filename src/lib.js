Date.prototype.Format = function(fmt)
{ 
    var o = {
       "Y" : this.getFullYear(),
       "y+" : this.getFullYear(),
       "m" : this.getMonth()+1,                 //
       "d" : this.getDate(),                    //
       "H" : this.getHours(),                   //
       "i" : this.getMinutes(),                 //
       "s" : this.getSeconds(),                 //
       "S"  : this.getMilliseconds()             //
    };
        
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ?
                     o[k].toString().length==1?"0"+o[k]:o[k] : 
                     o[k].toString().substr(o[k].toString().length-RegExp.$1.length));
    return fmt;
};

Date.prototype.AddDay = function(day)
{ 
    return new Date(this.getTime() + 1000*60*60*24*day);
};