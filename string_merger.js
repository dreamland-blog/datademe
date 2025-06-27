const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// 读取混淆的文件
const code = fs.readFileSync('./datademe_deobfuscated_花指令.js', 'utf-8');

// 解析代码为AST
const ast = parser.parse(code);

// 函数调用替换记录，用于记录替换了哪些函数调用
const replacedCalls = new Set();

// 处理字符串拼接
traverse(ast, {
  // 处理字符串拼接表达式 a + b + c => "abc"
  BinaryExpression(path) {
    if (path.node.operator === '+') {
      let allStringLiterals = true;
      let resultString = '';
      
      // 递归收集所有字符串
      function collectStrings(node) {
        if (t.isStringLiteral(node)) {
          resultString += node.value;
          return true;
        } else if (t.isBinaryExpression(node) && node.operator === '+') {
          return collectStrings(node.left) && collectStrings(node.right);
        } else {
          allStringLiterals = false;
          return false;
        }
      }
      
      collectStrings(path.node);
      
      if (allStringLiterals) {
        path.replaceWith(t.stringLiteral(resultString));
      }
    }
  },
  
  // 处理函数调用，例如 I(65) => "A"
  CallExpression(path) {
    const callee = path.node.callee;
    const args = path.node.arguments;
    
    // 处理 String.fromCharCode 调用
    if (callee.name === 'I' && args.length === 1) {
      if (t.isNumericLiteral(args[0])) {
        try {
          // 将数字转换为对应的字符
          const char = String.fromCharCode(args[0].value);
          path.replaceWith(t.stringLiteral(char));
          replacedCalls.add('I');
        } catch (e) {
          console.error('Error converting to char:', e);
        }
      }
    }
    

  }
});

// 生成新的代码
const output = generate(ast, {
  comments: true,
  compact: false
});

// 保存处理后的代码
fs.writeFileSync('./datademe_deobfuscated_merged.js', output.code);

console.log('字符串合并完成，已生成 datademe_deobfuscated_merged.js');
console.log('处理了以下函数调用:', Array.from(replacedCalls).join(', '));