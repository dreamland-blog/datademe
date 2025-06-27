// deobfuscator for datademe.js
const fs = require('fs');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

// 读取需要处理的代码
const processedCode = fs.readFileSync("./datademe.js", {
    encoding: "utf-8"
});

// 解析代码生成 AST
let ast = parser.parse(processedCode);

// 将16进制字符串转换为普通字符串
function hexToChar(str) {
    if (typeof str !== 'string') return str;
    
    return str.replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
    });
}

traverse(ast, {
    // 处理字符串字面量
    StringLiteral(path) {
        const value = path.node.value;
        if (path.node.extra && path.node.extra.raw && path.node.extra.raw.includes('\\x')) {
            path.node.value = hexToChar(value);
            path.node.extra.raw = JSON.stringify(path.node.value);
        }
    },
    
    // 处理成员表达式中的方括号表示法
    MemberExpression(path) {
        if (path.node.computed && types.isStringLiteral(path.node.property)) {
            const value = path.node.property.value;
            if (path.node.property.extra && path.node.property.extra.raw && path.node.property.extra.raw.includes('\\x')) {
                path.node.property.value = hexToChar(value);
                path.node.property.extra.raw = JSON.stringify(path.node.property.value);
            }
        }
    },
    
    // 处理对象属性键
    ObjectProperty(path) {
        if (types.isStringLiteral(path.node.key)) {
            const value = path.node.key.value;
            if (path.node.key.extra && path.node.key.extra.raw && path.node.key.extra.raw.includes('\\x')) {
                path.node.key.value = hexToChar(value);
                path.node.key.extra.raw = JSON.stringify(path.node.key.value);
            }
        }
    }
});

// 生成去混淆后的代码
const { code } = generator(ast, {
    retainLines: true, // 保留原始行号，有助于阅读
    compact: false,    // 不压缩代码
    jsescOption: {
        minimal: true  // 最小化转义，使输出更清晰
    }
});

// 将去混淆后的代码写入新文件
fs.writeFileSync('./datademe_deobfuscated.js', code, (err) => {
    if (err) {
        console.error("写入文件时出错:", err);
    } else {
        console.log("代码已保存到 datademe_deobfuscated.js");
    }
});


