// 监听Content-script事件
chrome.runtime.onMessage.addListener((req,sender, sendResponse) => {
  if (req.name === 'getCamouflageList') {
    (async () => {
      const lst = await getCamouflageList();
      sendResponse(lst);
    })();
    return true;
  }
})

function getCamouflageList() {
  return new Promise(resolve => {
    let lst = null
    chrome.storage.local.get('TAB_CAMOUFLAGE', function (e) {
      lst = e['TAB_CAMOUFLAGE'] || []
    })
    let interval = setInterval(() => {
      if (lst !== null) {
        clearInterval(interval)
        resolve(lst)
      }
    }, 50)
    setTimeout(() => {
      clearInterval(interval)
    }, 6000)
  })
}