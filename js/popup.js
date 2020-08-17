const submitBtn = document.getElementById('submitBtn')
const submitAreaBtn = document.getElementById('submitAreaBtn')
const areaText = document.getElementById('areaText')
const memoText = document.getElementById('memoText')
const addBtn = document.getElementById('addBtn')
const uploadIconBtn = document.getElementById('icon-preview')
const list = document.getElementById('list')

let areaTextValue = ''
let addType = 0 // 1-网址 2-域
let curCamouflageList = [] // 当前伪装列表
let tipList = []
let iconBase64 = ''

async function init() {
  curCamouflageList = await getCamouflageList() // 当前伪装列表
  if (curCamouflageList.length) {
    // 移除删除按钮点击事件
    curCamouflageList.forEach((item, index) => {
      try {
        document.getElementById(`deleteBtn${index}`).removeEventListener('click', () => {
        })
        item.status === 1 && document.getElementById(`disabledBtn${index}`).removeEventListener('click', () => {
        })
        item.status === 0 && document.getElementById(`enableBtn${index}`).removeEventListener('click', () => {
        })
      } catch (e) {
      }
    })
    let nodes = `
      <div class="cell head row">
        <span class="url-text">地址 / 域</span>
        <span class="memo-text">名称</span>
        <span class="memo-text">图标</span>
        <span>状态</span>
        <span class="action-text">操作</span>
      </div>
    `
    curCamouflageList.forEach((item, index) => {
      nodes += `
        <div class="cell row">
          <span class="url-text" title="${item.url}">${item.url}</span>
          <span class="memo-text" title="${item.memo}">${item.memo}</span>
          <span><img src="${item.icon}" style="width: 32px; height: 32px; border-radius: 50%"></span>
          <span class="${item.status ? 'color-green' : 'color-red'}">${item.status ? '启用' : '禁用'}</span>
          <div class="action-text">
            <button class="btn ${item.status ? 'un-action-btn' : 'action-btn'}" id="${item.status ? 'disabled' : 'enable'}Btn${index}">${!item.status ? '启用' : '禁用'}</button>
            <button class="btn un-action-btn delete-btn" id="deleteBtn${index}">删除</button>
          </div>
        </div>
      `
    })
    list.innerHTML = nodes

    // 监听删除按钮事件
    curCamouflageList.forEach((item, index) => {
      document.getElementById(`deleteBtn${index}`).addEventListener('click', () => {
        deleteOption(index)
      })
      item.status === 1 && document.getElementById(`disabledBtn${index}`).addEventListener('click', () => {
        disabledOption(index)
      })
      item.status === 0 && document.getElementById(`enableBtn${index}`).addEventListener('click', () => {
        enableOption(index)
      })
    })
  }
}

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

function save_options() {
  // 保存配置
  if (curCamouflageList.map(item => item.url).indexOf(areaTextValue) !== -1) return alert('已存在')
  curCamouflageList.unshift({
    url: areaTextValue,
    memo: memoText.value,
    icon: iconBase64,
    status: 1
  })
  chrome.storage.local.set({
    TAB_CAMOUFLAGE: curCamouflageList
  }, () => {
    init()
    tip('保存成功，刷新后生效')
  });
}

function deleteOption(index) {
  // 删除配置
  const lst = curCamouflageList.filter((i, itemIndex) => itemIndex !== index)
  chrome.storage.local.set({
    TAB_CAMOUFLAGE: lst,
  }, () => {
    init()
    tip('删除成功，刷新后生效', 'error')
  });
}

function disabledOption(index) {
  // 禁用配置
  curCamouflageList[index].status = 0
  chrome.storage.local.set({
    TAB_CAMOUFLAGE: curCamouflageList,
  }, () => {
    init()
    tip('禁用成功，刷新后生效', 'error')
  });
}

function enableOption(index) {
  // 启用配置
  curCamouflageList[index].status = 1
  chrome.storage.local.set({
    TAB_CAMOUFLAGE: curCamouflageList,
  }, () => {
    init()
    tip('启用成功，刷新后生效')
  });
}

function getUrl(type) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
    let url = tabs[0].url;
    if (url.indexOf('http') !== 0) return tip('当前页面不可用', 'error')
    url = url.replace('http://', '').replace('https://', '')
    areaTextValue = type === 'area' ? url.substring(0, url.indexOf('/')) : url
    areaText.value = areaTextValue
    checkInput()
  });
}

function checkInput() {
  // 检查输入框
  if (!areaText.value || !memoText.value) {
    addBtn.setAttribute('disabled', 'disabled')
  } else {
    addBtn.removeAttribute('disabled')
  }
}

function tip(info, type = 'success') {
  // 简单的消息通知
  info = info || '';
  if (tipList.length) {
    const firstTip = tipList[0]
    firstTip.style.top = '-100px';
    tipList.splice(0, 1)
    setTimeout(() => {
      firstTip.remove();
    }, 400);
    for (let i = 0; i < tipList.length; i++) {
      tipList[i].style.top = i * 50 + 10 + 'px';
    }
  }
  let ele = document.createElement('div');
  ele.className = 'tip slideInLeft ' + type;
  ele.style.top = tipList.length * 50 + 10 + 'px';
  ele.innerHTML = `<div>${info}</div>`;
  document.body.appendChild(ele);
  ele.classList.add('animated');
  tipList.push(ele)
  setTimeout(() => {
    ele.style.top = '-100px';
    setTimeout(() => {
      ele.remove();
    }, 400);
  }, 1500);
}


function imgChange(img) {
  // 上传图片转base64
  return new Promise(resolve => {
    // 生成一个文件读取的对象
    const reader = new FileReader();
    reader.onload = ev => {
      // base64码
      resolve(ev.target.result)
      console.log(ev.target.result);
    }
    //发起异步读取文件请求，读取结果为data:url的字符串形式，
    reader.readAsDataURL(img.files[0]);
    console.log(img.files[0]);
  })
}


submitBtn.addEventListener('click', () => {
  getUrl('address')
  addType = 1
})
submitAreaBtn.addEventListener('click', () => {
  getUrl('area')
  addType = 1
})
addBtn.addEventListener('click', save_options)
areaText.addEventListener('input', () => {
  checkInput()
})
memoText.addEventListener('input', () => {
  checkInput()
})
uploadIconBtn.addEventListener('click', () => {
  var fileChooser = document.createElement('input');
  fileChooser.accept = "image/png,image/gif,image/jpeg,image/x-icon";
  fileChooser.type = 'file';
  fileChooser.click();
  fileChooser.addEventListener('change', function () {
    var filesList = fileChooser.files;
    if (filesList.length) { //如果取消上传，则该文件的长度为0
      imgChange(fileChooser).then(res => {
        iconBase64 = res
        document.getElementById('icon-preview').innerHTML = `
          <img class="icon-preview" src="${res}">
        `
        uploadIconBtn.style.borderWidth = 0
      }).catch(e => {
        iconBase64 = ''
      })
    }
  })
})

init()