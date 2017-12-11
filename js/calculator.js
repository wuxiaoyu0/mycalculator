function Calculator(obj) {
    this.counter = document.querySelector(obj);
    return this;
}
Calculator.prototype = {
    handle: false,
    num1: "", //输入的第一个数值
    num2: "", //输入的第二个数值
    sum: 0, //运算结果
    calval: "", //计录点击的运算符
    showObj: null, //显示字符的盒子
    addBox: null, //添加按钮的盒子
    init: function() {
        this.numCreate();
    }, //初始化对象
    // 创建计算器按键
    numCreate: function() {
        var that = this;
        // 创建显示数值的盒子
        this.showObj = document.createElement("div");
        this.showObj.innerHTML = 0;
        this.showObj.className = "calShow";
        this.counter.appendChild(this.showObj);
        // 创建存放按钮的盒子
        this.addBox = document.createElement("ul");
        this.addBox.className = "calculateBox clear";
        this.counter.appendChild(this.addBox);
        // 此计算机所需的按钮
        var arr = ["+", "-", "*", "/", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "=", "C", ".", "+/-", "%"];
        var li = "";
        var csNum = arr.indexOf("/");
        var clNum = arr.indexOf("0");
        // 循环添加每个按钮及其样式
        for (var i = 0; i < arr.length; i++) {
            cname = (i <= csNum || i > clNum) ? "cBtn" : "btn";
            li += '<li class="' + cname + ' fl">' + arr[i] + '</li>';
        }
        this.addBox.innerHTML = li;
        // 点击数值按钮输入计算的数值
        var lis = that.addBox.getElementsByClassName("btn");
        for (var i = 0; i < lis.length; i++) {
            lis[i].onclick = function() {
                // 判断数值是连输的还是之后下一个值
                if (that.handle == false) {
                    that.num1 = ((that.num1 != 0) ? that.num1 : "") + "" + this.innerHTML;
                    that.showObj.innerHTML = that.num1;
                } else {
                    that.num2 = ((that.num2 != 0) ? that.num2 : "") + "" + this.innerHTML;
                    that.showObj.innerHTML = that.num2;
                }
            }
        }
        that.count();
    },
    // 执行计算
    count: function() {
        var that = this;
        var cal = this.addBox.getElementsByClassName("cBtn");
        // 循环给每个计算按钮键添加相应的事件
        for (var i = 0; i < cal.length; i++) {
            cal[i].onclick = function() {
                that.handle = true;
                // console.log(this.innerHTML,that.handle);
                // 当点击等于号的时候，执行判断运算字符，执行运算，得到最后的结果
                if (this.innerHTML == "=") {
                    that.cal();
                    // console.log(that.sum.toString().split(".")[1],"测试是不是小数");
                    // 判断获取到的数值小数点后面有几位
                    if (that.sum.toString().split(".")[1]) {
                        that.sum = (that.sum.toString().split(".")[1].length <= 6) ? that.sum : that.sum.toFixed(6);
                    }
                    that.showObj.innerHTML = that.sum;
                    that.num1 = "";
                    that.num2 = "";
                    that.handle = true;
                } else if (this.innerHTML == "C") {
                    // 点击归零按钮，清空之前的运算
                    that.sum = 0;
                    that.showObj.innerHTML = 0;
                    that.num1 = "";
                    that.num2 = "";
                    that.handle = false;
                } else {
                    // 点击其他运算记录相应的运算字符
                    that.calval = this.innerHTML;
                }
            }
        }
    },
    // 判断计算方法
    cal: function() {
        var that = this;
        // 当没有清零直接在原来的运算结果上直接进行下一步运算
        if (this.num1 == "") {
            this.num1 = 0;
        }
        if (this.num2 == "") {
            this.num2 = 0;
        }
        // 判断运算种类
        switch (this.calval) {
            case "+":
                that.sum = that.sum + parseInt(that.num1) + parseInt(that.num2);
                break;
            case "-":
                that.sum = that.sum - parseInt(that.num1) - parseInt(that.num2);
                break;
            case "*":
                if (that.num1 == 0) {
                    that.sum = that.sum * parseInt(that.num2);
                } else {
                    that.sum = parseInt(that.num1) * parseInt(that.num2);
                }
                break;
            case "/":
                if (that.num1 == 0) {
                    that.sum = that.sum / parseInt(that.num2);
                } else {
                    that.sum = parseInt(that.num1) / parseInt(that.num2);
                }
                break;
        }
    }
}