namespace Caeser_ns {
    /* Класс для работы с формой */
    export class Form {
        $form;
        $inputText;
        $form__act;
        $outputText;

        constructor() {
            this.$form = document.getElementsByClassName("form")[0];
            this.$form.onsubmit = function (e) { // Действия при отправке формы
                e.preventDefault();
                this.actHandler();
            }.bind(this);
        }

        actHandler(): void { // Оброботчик действия (шифровать/расшифровать)
            let act = this.getAct();
            if (act == 1) this.setOutputText(Caesar.code(this.getInputText()));
            else if (act == 2) this.setOutputText(Caesar.encode(this.getInputText()));
        }

        getAct(): number { // Возвращает действие указанное в форме (шифровать/расшифровать)
            if (!this.$form__act) this.$form__act = this.$form.querySelector('.form__act');
            return this.$form__act.value as number;
        }

        getInputText(): string { // Возвращает введеный текст в форму
            if (!this.$inputText) this.$inputText = this.$form.querySelector('.input-text');
            return this.$inputText.value;
        }

        setOutputText(text: string): void { // Пишет текст в поле для результата
            if (!this.$outputText) this.$outputText = document.getElementsByClassName("output-text")[0];
            this.$outputText.value = text;
        }
    }

    /* Класс формирует объект с интерваломи символов
     и кол-во символов в алфовите */
    class Interval {
        min: number;
        max: number;
        colChar: number;

        constructor(x: number, y: number, colChar: number) {
            return {min: x, max: y, colChar: colChar};
        }
    }

    /* Класс со статическими функциями для шифроки/расшифровки */
    class Caesar {
        static code(text: string): string { // Шифрует полученный текст
            let result: string = '';

            for (let i = 0; i != text.length; i++) {
                let charCode: number = text.charCodeAt(i);
                let interval: Interval = this._interval(charCode);

                if (!this._checkInterval(interval)) {
                    result += text[i];
                    continue;
                }

                let x = (charCode - interval.min);
                let y = (x + 3) % interval.colChar;
                result += String.fromCharCode(y + interval.min);
            }

            return result;
        }

        static encode(text: string): string { // Расшифровывает полученный текст
            let result: string = '';

            for (let i = 0; i != text.length; i++) {
                let charCode: number = text.charCodeAt(i);
                let interval: Interval = this._interval(charCode);

                if (!this._checkInterval(interval)) {
                    result += text[i];
                    continue;
                }

                let y = (charCode - interval.min);
                let x = (y + interval.colChar - (3 % interval.colChar)) % interval.colChar;
                result += String.fromCharCode(x + interval.min);
            }

            return result;
        }

        private static _interval(charCode: number): Interval { // Ищет интервал полученного символа и возвращает объект Interval
            let min: number;
            let max: number;
            let colChar: number;
            if (charCode >= 65 && charCode <= 90) {
                min = 65;
                max = 90;
                colChar = 25;
            }  // A-X
            else if (charCode >= 97 && charCode <= 122) {
                min = 97;
                max = 122;
                colChar = 25;
            } // a-z
            else if (charCode >= 1040 && charCode <= 1071) {
                min = 1040;
                max = 1071;
                colChar = 32;
            }  // А-Ь
            else if (charCode >= 1072 && charCode <= 1103) {
                min = 1072;
                max = 1103;
                colChar = 32;
            } // а-ь
            else {
                min = 0;
                max = 0;
                colChar = 0;
            }

            return new Interval(min, max, colChar);
        }

        private static _checkInterval(obj: Interval): boolean { // Проверяет найден ли интервал для символа
            return (obj.min == 0 && obj.max == 0) ? false : true;
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    let form: Caeser_ns.Form = new Caeser_ns.Form(); // Обект формы
});

