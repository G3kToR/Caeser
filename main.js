var Caeser_ns;
(function (Caeser_ns) {
    var Form = (function () {
        function Form() {
            this.$form = document.getElementsByClassName("form")[0];
            this.$form.onsubmit = function (e) {
                e.preventDefault();
                this.actHandler();
            }.bind(this);
        }
        Form.prototype.actHandler = function () {
            var act = this.getAct();
            if (act == 1)
                this.setOutputText(Caesar.code(this.getInputText()));
            else if (act == 2)
                this.setOutputText(Caesar.encode(this.getInputText()));
        };
        Form.prototype.getAct = function () {
            if (!this.$form__act)
                this.$form__act = this.$form.querySelector('.form__act');
            return this.$form__act.value;
        };
        Form.prototype.getInputText = function () {
            if (!this.$inputText)
                this.$inputText = this.$form.querySelector('.input-text');
            return this.$inputText.value;
        };
        Form.prototype.setOutputText = function (text) {
            if (!this.$outputText)
                this.$outputText = document.getElementsByClassName("output-text")[0];
            this.$outputText.value = text;
        };
        return Form;
    }());
    Caeser_ns.Form = Form;
    var Interval = (function () {
        function Interval(x, y, colChar) {
            return { min: x, max: y, colChar: colChar };
        }
        return Interval;
    }());
    var Caesar = (function () {
        function Caesar() {
        }
        Caesar.code = function (text) {
            var result = '';
            for (var i = 0; i != text.length; i++) {
                var charCode = text.charCodeAt(i);
                var interval = this._interval(charCode);
                if (!this._checkInterval(interval)) {
                    result += text[i];
                    continue;
                }
                var x = (charCode - interval.min);
                var y = (x + 3) % interval.colChar;
                result += String.fromCharCode(y + interval.min);
            }
            return result;
        };
        Caesar.encode = function (text) {
            var result = '';
            for (var i = 0; i != text.length; i++) {
                var charCode = text.charCodeAt(i);
                var interval = this._interval(charCode);
                if (!this._checkInterval(interval)) {
                    result += text[i];
                    continue;
                }
                var y = (charCode - interval.min);
                var x = (y + interval.colChar - (3 % interval.colChar)) % interval.colChar;
                result += String.fromCharCode(x + interval.min);
            }
            return result;
        };
        Caesar._interval = function (charCode) {
            var min;
            var max;
            var colChar;
            if (charCode >= 65 && charCode <= 90) {
                min = 65;
                max = 90;
                colChar = 25;
            }
            else if (charCode >= 97 && charCode <= 122) {
                min = 97;
                max = 122;
                colChar = 25;
            }
            else if (charCode >= 1040 && charCode <= 1071) {
                min = 1040;
                max = 1071;
                colChar = 32;
            }
            else if (charCode >= 1072 && charCode <= 1103) {
                min = 1072;
                max = 1103;
                colChar = 32;
            }
            else {
                min = 0;
                max = 0;
                colChar = 0;
            }
            return new Interval(min, max, colChar);
        };
        Caesar._checkInterval = function (obj) {
            return (obj.min == 0 && obj.max == 0) ? false : true;
        };
        return Caesar;
    }());
})(Caeser_ns || (Caeser_ns = {}));
document.addEventListener("DOMContentLoaded", function () {
    var form = new Caeser_ns.Form();
});
//# sourceMappingURL=main.js.map