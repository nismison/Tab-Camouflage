document.addEventListener('DOMContentLoaded', async function() {
	const href = location.href;
	const origin = location.origin;
	let urls = await getCamouflageList()
	urls = urls.map(item => item.url)
	if (urls.indexOf(removeHttp(href)) !== -1 || urls.indexOf(removeHttp(origin)) !== -1) {
		setTabIcon()
		setTabTitle('你好吗')
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
	title = title || "我是测试页面标题"
	// 修改页面标题
	chrome.runtime.sendMessage({
		name: "executeScript",
		code: `document.title = "${title}"`
	})
}

function setTabIcon(iconUrl) {
	iconUrl = iconUrl || 'https://www.google.com/images/icons/product/chrome-32.png'
	// 修改页面图标
	let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = iconUrl;
	document.getElementsByTagName('head')[0].appendChild(link);
}