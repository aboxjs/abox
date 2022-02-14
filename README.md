# abox

[![npm version](https://img.shields.io/npm/v/abox.svg?style=flat-square)](https://www.npmjs.com/package/redux)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/aboxjs/abox/Tests/master?style=flat-square)

> 轻量的数据管理器

* 小而简，专注于数据管理
* 高效，没有拐弯抹角的东西
* 完美支持typescript

## 文档 
详细的文档请点击 [这里](https://abox.yujing.link)

## 快速开始

1. 安装依赖

`npm install abox --save` <br />
`npm install abox-react --save` <br />

2. 定义数据

```typescript
import {createStore} from 'abox'

const mArticles = ()=>{
    return createStore({
        loading:false,
        list:[],
        actions:{
            async getPageData(){
                this.core.updateData({
                    loading:true
                })
                try{
                    const data = await fetch('/api/articles');
                    
                    this.core.updateData({
                        list:data
                    })
                }
                finally {
                    this.core.updateData({
                        loading:false
                    }) 
                }
            }
        }
    })
}
```

3. 在react中使用

```typescript jsx
import React,{useEffect} from 'react'
import {useStores} from 'abox-react'

const ArticlesComponent = ()=>{
    const [sArticles] = useStores([mArticles()])

    useEffect(()=>{
        sArticles.actions.getPageData();
    },[])
    
    if(sArticles.loading){
        return <div>loading...</div>
    }
    
    return sArticles.list.map(item=>{
        return <div>
            <h3>{item.title}</h3>
            <div>{item.content}</div>
        </div>
    })
}
```

## License

[MIT](LICENSE.md)
