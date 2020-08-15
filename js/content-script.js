document.addEventListener('DOMContentLoaded', async function() {
	const href = location.href;
	const origin = location.origin;
	const urls = await getCamouflageList()
	const urlFilter = urls.filter(item => item.url === removeHttp(href) || item.url === removeHttp(origin))
	if (urlFilter.length && urlFilter[0].status) {
		setTabIcon(urlFilter[0].icon)
		setTabTitle(urlFilter[0].name)
	}
})

function removeHttp(text) {
	// 删除url中的http(s)
	return text.replace('http://', '').replace('https://', '')
}

function getCamouflageList() {
	// 获取配置列表
	return new Promise(resolve => {
		chrome.runtime.sendMessage({
			name: "getCamouflageList"
		}, function (res) {
			resolve(res)
		})
	})
}

function setTabTitle(title) {
	// 修改页面标题
	title = title || "我是测试页面标题"
	chrome.runtime.sendMessage({
		name: "executeScript",
		code: `document.title = "${title}"`
	})
}

function setTabIcon(iconUrl) {
	// 修改页面图标
	let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = iconUrl;
	document.getElementsByTagName('head')[0].appendChild(link);
}