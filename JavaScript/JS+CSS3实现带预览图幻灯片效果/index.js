// 数据定义
var data = [
    {img:1,h2:'Creative',h3:'DUET'},
    {img:2,h2:'Friendly',h3:'DEVIL'},
    {img:3,h2:'Tranquilent',h3:'COMPATRIOT'},
    {img:4,h2:"Insecure",h3:'HUSSLER'},
    {img:5,h2:"Loving",h3:'REBEL'},
    {img:6,h2:'Passionate',h3:'SEEKER'},
    {img:7,h2:"Crazy",h3:'FRIEND'}
];
//通用函数
var g = function (id) {
    if( id.substring(0,1) === '.') return document.getElementsByClassName(id.substring(1))
    return document.getElementById(id);
}
//添加幻灯片操作
function addSliders () {
    // 1.获取模版
    var tpl_main = g('template_main').innerHTML
                    .replace(/^\s*/,'')
                    .replace(/^\s*/,'');
    var tpl_ctrl = g('template_ctrl').innerHTML
                    .replace(/^\s*/,'')
                    .replace(/^\s*/,'');
    // 定义输出的HTML变量
    var out_main = [];
    var out_ctrl = [];
    // 2.遍历所有数据，构建最终输出的HTML
    for(i in data) {
        var _html_main = tpl_main
            .replace(/{{index}}/g,data[i].img)
            .replace(/{{h2}}/g,data[i].h2)
            .replace(/{{h3}}/g,data[i].h3)
            .replace(/{{css}}/g,['','main-i_right'][i%2])
        var _html_ctrl = tpl_ctrl
            .replace(/{{index}}/g,data[i].img)
        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
    }
    // 3.把HTML回写给用户
    g('template_main').innerHTML = out_main.join('');
    g('template_ctrl').innerHTML = out_ctrl.join('');
    // 增加main_background
    g('template_main').innerHTML += tpl_main
        .replace(/{{index}}/g,'{{index}}')
        .replace(/{{h2}}/g,data[i].h2)
        .replace(/{{h3}}/g,data[i].h3);
    g('main_{{index}}').id = 'main_background'
}
function switchSlider (n) {
    // 获取要展示的幻灯片和控制高度元素
    var main = g('main_' + n);
    var ctrl = g('ctrl_' + n);

    // 首先清楚样式
    var clear_main = g('.main-i');
    var clear_ctrl = g('.ctrl-i');
    for(let i = 0; i<clear_ctrl.length; i++) {
        clear_main[i].className = clear_main[i].className.replace(' main-i_active','');
        clear_ctrl[i].className = clear_ctrl[i].className.replace(' ctrl-i_active','');
    }
    // 加上active类名，加样式
    main.className += ' main-i_active';
    ctrl.className += ' ctrl-i_active';
    // 切换时，复制上一张幻灯片到main_background中
    setTimeout(function(){
        g('main_background').innerHTML = main.innerHTML;
    },1000)
}
// 动态调整图片的margin-top，使其垂直居中
function movePictures () {
    var pictures = g('.picture');
    for(let i = 0; i<pictures.length; i++) {
        pictures[i].style.marginTop = -pictures[i].clientHeight/2 + 'px';
    }
}
window.onload = function () {
    addSliders();
    switchSlider(1);
    setTimeout(
        function(){movePictures()},100
    )
}