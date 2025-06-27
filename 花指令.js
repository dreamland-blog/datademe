const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

// 读取需要处理的代码
const processedCode = fs.readFileSync("./2.js", {
    encoding: "utf-8"
});

// 解析代码生成 AST
let ast = parser.parse(processedCode);

function S(e, t) {
    var a = ~t;
    return 19 * (e & t) + 7 * (e & a) - 7 * (e | ~t) - 11 * ~(e & a) + 18 * ~(e | t) + 12 * ~(e | ~t);
}

function i(e, t, a, n) {
    return 4 * (t & e) + 3 * (t & ~e) + 3 * (t | e) - 5 * (t | ~e) + 5 * ~(t | e) - 2 * ~(t | ~e);
}

function Y(e, t) {
    return -1 * (t & ~e) + 1 * (t ^ e) + 1 * ~(t & ~t) - 1 * ~(t | e) - 2 * ~(t | ~e);
}

function ke(e, t, a) {
    return -1 * (t & e) + 1 * (t | ~e) + 1 * e - 1 * ~(t | e) - 1 * ~(t | ~e);
}

function u(e, t, a, n, c) {
    return -6 * (e & t) + 6 * (e & (c = ~t)) - 5 * (e ^ t) + 7 * ~(e ^ t) - 7 * ~(e | t) + 5 * ~(e | c);
}

function kt(e, t, a) {
    return -8 * (t & e) + 2 * (t & ~e) - 1 * t + 11 * e - 10 * ~(t | ~e);
}

function Ya(e, t) {
    return 1 * (e & t) - 1 * (e & ~t) + 1 * e - 1 * ~(e ^ t) + 1 * ~(e | t) + 1 * ~(e | ~t);
}

function Oa(e, t, a) {
    return -1 * (t & e) + 1 * (t & ~e) + 1 * ~(t & ~e) - 1 * ~(t | ~e) - 1 * ~t;
}

function A(e, t, a) {
    return -2 * (t & e) + 1 * ~(t & ~t) + 3 * ~(t & ~e) - 4 * ~(t | e) - 3 * ~(t | ~e);
}

function q(e, t, a) {
    return 23 * (e & ~t) - 11 * (e ^ t) + 11 * ~(e | t) + 10 * ~(e | ~t) - 11 * ~t;
}

function mt(e, t, a) {
    return 5 * (e & ~t) + 1 * (e | (a = ~t)) + 5 * ~(e | t) + 1 * ~(e | ~t) - 6 * a;
}

function ia(e, t, a, n) {
    return -6 * (t & e) - 6 * (t & ~e) + 1 * e + 7 * ~(t & ~t) - 7 * ~(t | e) - 7 * ~(t | ~e);
}

function n(e, t, a, n, c) {
    return 7 * (e & t) + 8 * (e & ~t) - 7 * (e | t) - 11 * ~(e | t) - 5 * ~(e | ~t) + 11 * ~e;
}

function g(e, t) {
    return 3 * (e & t) + 8 * (e & ~t) - 7 * e + 5 * t - 5 * ~(e | ~t);
}

function xt(e, t, a, n) {
    return -4 * (e & t) - 5 * (e & (a = ~t)) - 2 * (e | t) + 7 * (e | ~t) - 7 * ~(e | t) + 3 * ~(e | a);
}

function pe(e, t) {
    return -1 * (e & t) + 1 * (e & ~t) + 2 * ~(e & ~t) - 1 * ~(e ^ t) - 1 * ~(e | t) - 3 * ~(e | ~t);
}

function fe(e, t, a, n) {
    var c = ~e;
    return -1 * (t & ~e) + 1 * (t | c) - 8 * ~(t | e) - 6 * ~(t | c) + 7 * ~t;
}

function c(e, t, a, n, c, i) {
    return 2 * (e & t) - 10 * (e & ~t) + 7 * ~(e & t) - 11 * ~(e | t) - 6 * ~(e | (n = ~t)) + 4 * n;
}

function M(e, t) {
    return 4 * (e | ~t) - 3 * e - 4 * ~(e | t);
}

function p(e, t, a) {
    return 12 * (t & e) + 9 * (t & ~e) - 11 * (t | e) - 2 * ~(t | e) + 12 * ~(t | ~e) + 2 * ~e;
}

function ht(e, t, a) {
    return 2 * (t & e) + 7 * (t & ~e) - 6 * ~(t & e) + 5 * ~(t | e) + 6 * ~(t | ~e) + 1 * ~t;
}

function Vt(e, t, a, n) {
    return -5 * (t & e) - 4 * (t & ~e) - 2 * t + 7 * ~(t & ~t) - 7 * ~(t | e) - 8 * ~(t | ~e);
}

function Zt(e, t) {
    var a = ~t;
    return -6 * (e & t) - 6 * (e & a) + 7 * (e | t) - 2 * ~(e | t) - 9 * ~(e | a) + 2 * ~e;
}

function re(e, t) {
    return -4 * (t & e) - 6 * (t & ~e) + 7 * (t ^ e) + 4 * ~(t ^ e) - 4 * ~(t | e) - 8 * ~(t | ~e);
}

// 记录替换的次数
let replacedCount = 0;

traverse(ast, {
    CallExpression: function(path) {
        if (path.node.arguments.length == 2) {
            const funcName = path.node.callee.name;
            const arg1 = path.node.arguments[0].value;
            const arg2 = path.node.arguments[1].value;
            
            let result;
            
            // 根据函数名称选择正确的函数进行计算
            switch (funcName) {
                case "S":
                    result = S(arg1, arg2);
                    console.log(`S(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "i":
                    result = i(arg1, arg2);
                    console.log(`i(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "Y":
                    result = Y(arg1, arg2);
                    console.log(`Y(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "ke":
                    result = ke(arg1, arg2);
                    console.log(`ke(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "u":
                    result = u(arg1, arg2);
                    console.log(`u(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "kt":
                    result = kt(arg1, arg2);
                    console.log(`kt(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "Ya":
                    result = Ya(arg1, arg2);
                    console.log(`Ya(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "Oa":
                    result = Oa(arg1, arg2);
                    console.log(`Oa(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "A":
                    result = A(arg1, arg2);
                    console.log(`A(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "q":
                    result = q(arg1, arg2);
                    console.log(`q(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "mt":
                    result = mt(arg1, arg2);
                    console.log(`mt(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "ia":
                    result = ia(arg1, arg2);
                    console.log(`ia(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "n":
                    result = n(arg1, arg2);
                    console.log(`n(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "g":
                    result = g(arg1, arg2);
                    console.log(`g(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "xt":
                    result = xt(arg1, arg2);
                    console.log(`xt(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "pe":
                    result = pe(arg1, arg2);
                    console.log(`pe(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "fe":
                    result = fe(arg1, arg2);
                    console.log(`fe(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "c":
                    result = c(arg1, arg2);
                    console.log(`c(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "M":
                    result = M(arg1, arg2);
                    console.log(`M(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "p":
                    result = p(arg1, arg2);
                    console.log(`p(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "ht":
                    result = ht(arg1, arg2);
                    console.log(`ht(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "Vt":
                    result = Vt(arg1, arg2);
                    console.log(`Vt(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "Zt":
                    result = Zt(arg1, arg2);
                    console.log(`Zt(${arg1}, ${arg2}) = ${result}`);
                    break;
                case "re":
                    result = re(arg1, arg2);
                    console.log(`re(${arg1}, ${arg2}) = ${result}`);
                    break;
                default:
                    // 不是我们处理的函数，跳过
                    return;
            }
            
            // 只有当结果有效时才替换
            if (result !== undefined) {
                path.replaceWith(types.numericLiteral(result));
                replacedCount++;
            }
        }
    }
});

console.log(`成功替换了 ${replacedCount} 处花指令函数调用`);

// 生成去混淆后的代码
const { code } = generator(ast, {
    retainLines: true, // 保留原始行号，有助于阅读
    compact: false,    // 不压缩代码
    jsescOption: {
        minimal: true  // 最小化转义，使输出更清晰
    }
});

// 将去混淆后的代码写入新文件
fs.writeFileSync('./datademe_deobfuscated_花指令.js', code);
console.log("代码已保存到 datademe_deobfuscated_花指令.js");


