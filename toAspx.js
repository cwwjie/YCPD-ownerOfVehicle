const fs = require('fs');
const path = require('path');

// 要转换为 aspx 页面的 字符串
let aspxString = `<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ownerEntrance.aspx.cs" Inherits="ownerEntrance" %>

`;

// 主函数方法
let main = {
    distBuffer: new Buffer(''),
    
    // 初始化函数
    init() {
        // 获取到目标文件
        this.distBuffer = fs.readFileSync('./dist/index.html');
        // 目标文件 转换为 aspx 字符串
        let aspxBuffer = this.bufferConvert();
        // aspx 字符串 转换为 aspx 文件
        fs.writeFile('./dist/ownerEntrance.aspx', aspxBuffer, err => { if (err) {console.error(err)}});
    },

    // 目标文件 转换为 aspx
    bufferConvert() {
        // 将 buffer 转化为字符串
        let bufferStr = this.distBuffer.toString('utf8');

        // // 获取到 <!DOCTYPE html> 的部分 100% 是能够获取成功的
        // let DOCTYPEindex = bufferStr.indexOf('<html');
        // // 截取到剩下 html 部分
        // let htmlString = bufferStr.slice(DOCTYPEindex);
        // 将需要转换的aspx 页面的 字符串 加上 剩下 html 部分 字符串 
        
        aspxBuffer = Buffer.from(aspxString + bufferStr, 'utf8');
        return aspxBuffer;
    }
}

// 开始执行 主函数下的 初始化函数
main.init();
