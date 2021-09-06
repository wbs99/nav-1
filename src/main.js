const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last"); //找到新增网站之前的最后一个 li
const x = localStorage.getItem("x"); //读出 x
const xObject = JSON.parse(x); //把x变成对象

const hashMap = xObject || [
  //如果xObject存在，就用xObject，不存在就用写的默认的属性
  { logo: "B", url: "https://www.bilibili.com" },
  { logo: "G", url: "https://www.google.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // .*是/后面的任何东西， 删除 / 开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(
      `<li>
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>
    </li>`
    ).insertBefore($lastLi);
    $li.on("click", () => {
      //点击每一个导航的时候实现跳转
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡，点击关闭图标不跳转
      hashMap.splice(index, 1); //删除
      render(); //删除之后，重新渲染 hashMap
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么？"); //得到用户输入的网址
  if (url.indexOf("http") !== 0) {
    //如果用户输入的地址不是http开头的
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(), //简化网址，新增网站后显示简化的后的第一个大写字母
    url: url,
  });
  render();
});

//关闭页面的时候把当前的 hashMap 对象变成字符串 存到 x 里面
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e; //等价于const key = e.key
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
