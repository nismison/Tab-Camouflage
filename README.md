# 自定义Tab标题 / icon，伪装标签页

**Chrome扩展 - 自定义Tab标题 / icon，伪装标签页，从此摸🐟告别老板键**

​    

用上班摸鱼的时间写了个上班摸鱼的Chrome插件(禁止套娃)

虽然是第一次接触Chrome扩展开发，但是插件功能也不多，开发还算挺顺利。主要功能就是把需要伪装的地址添加到配置中，然后再打开该地址或者该域上的网站就能自动伪装Tab标签



## 一、安装扩展

- ### **Chrome插件市场安装**

  [点击前往Chrome插件市场地址](https://chrome.google.com/webstore/detail/tab-camouflage-%E6%A0%87%E7%AD%BE%E9%A1%B5%E4%BC%AA%E8%A3%85/fngcfdjnpcccfkmpomcliiddjbacpgaa?hl=zh-CN&authuser=0](https://chrome.google.com/webstore/detail/tab-camouflage-标签页伪装/fngcfdjnpcccfkmpomcliiddjbacpgaa?hl=zh-CN&authuser=0))

  

- ### **源文件安装**

  1. `clone`/`download`该项目，解压到桌面

  2. 打开地址[chrome://extensions](chrome://extensions)，勾选右上角“**开发者模式**”选项

     <img src="http://pic.tryfang.cn/Snipaste_2020-08-18_09-50-20.png" style="zoom:50%;" />

  3. 点击左上角“**加载已解压的扩展程序**”，选择第1步解压的文件夹

     <img src="http://pic.tryfang.cn/Snipaste_2020-08-18_09-53-18.png" style="zoom:50%;" />

  4. 添加扩展成功，选择启用即可

     <img src="http://pic.tryfang.cn/Snipaste_2020-08-18_09-57-36.png" style="zoom:50%;" />



## 二、配置地址/域

**地址：** 只有当精确匹配到该地址才会修改Tab标签

**域：** 当地址域名匹配就会修改Tab标签

**伪装名称：** 当地址或域名匹配时Tab标签栏显示的标题

**伪装图标：** 当地址或域名匹配时Tab标签栏显示的图标，图标文件可以为.png/.gif/.jpeg/.jpg/.ico格式

**配置好以后点击“添加到伪装列表”即可**

> **注：，如果当前有已经打开的符合匹配的Tab，需要手动刷新页面即可生效**

<img src="http://pic.tryfang.cn/image-20200816072632283.png" alt="image-20200816072632283" style="zoom:50%;" />



## 三、效果图

<img src="http://pic.tryfang.cn/image-20200816074801137.png" alt="image-20200816074801137" style="zoom:50%;" />

<img src="http://pic.tryfang.cn/image-20200816074843211.png" alt="image-20200816074843211" style="zoom:50%;" />



**当你不在伪装的Tab页面时谁都不知道你在偷偷看什么了(滑稽)**