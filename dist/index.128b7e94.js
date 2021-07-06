(function () {
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList = $('.siteList');
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$lastLi = $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find('li.last')//找到新增网站之前的最后一个 li
;
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$x = localStorage.getItem('x')//读出 x
;
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject = JSON.parse($16b5ad875ae907e2f7f79e7b8fe116cc$var$x)//把x变成对象
;
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap = $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject || [
    {
        logo: 'B',
        logoType: 'text',
        url: 'https://www.bilibili.com'
    },
    {
        logo: 'G',
        logoType: 'text',
        url: 'https://www.google.com'
    }, 
];
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl = (url)=>{
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // .*是/后面的任何东西， 删除 / 开头的内容
};
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$render = ()=>{
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find('li:not(.last)').remove();
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.forEach((node, index)=>{
        const $li = $(`<li>\n          <div class="site">\n            <div class="logo">${node.logo}</div>\n            <div class="link">${$16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(node.url)}</div>\n            <div class="close">\n              <svg class="icon">\n                <use xlink:href="#icon-close"></use>\n              </svg>\n            </div>\n          </div>\n    </li>`).insertBefore($16b5ad875ae907e2f7f79e7b8fe116cc$var$$lastLi);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation(); //阻止冒泡，点击关闭图标不跳转
            $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.splice(index, 1); //删除
            $16b5ad875ae907e2f7f79e7b8fe116cc$var$render(); //删除之后，重新渲染 hashMap
        });
    });
};
$16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
$('.addButton').on('click', ()=>{
    let url = window.prompt('请问你要添加的网址是什么？')//得到用户输入的网址
    ;
    if (url.indexOf('http') !== 0) url = 'https://' + url;
    console.log(url);
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.push({
        logo: $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap);
    localStorage.setItem('x', string);
};
$(document).on('keypress', (e)=>{
    const { key: key  } = e//等价于const key = e.key
    ;
    for(let i = 0; i < $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.length; i++)if ($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap[i].logo.toLowerCase() === key) window.open($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap[i].url);
});

})();
//# sourceMappingURL=index.128b7e94.js.map
