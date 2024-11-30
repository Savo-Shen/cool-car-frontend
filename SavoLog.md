# React NextJS App Router 实时获取API
## 背景
前段时间我在开发一个小车的项目的时候，需要制作一个控制终端并实时获取小车的数据，并且需要可以给小车发送控制信号。

我才用在小车上使用Flask框架搭建一个API服务器，然后在控制终端使用React NextJS框架搭建一个前端页面，通过API获取小车的数据并且发送控制信号。

我没有使用其他第三方库来实现API获取，而是根据[NextJS官网](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)来实现`data-fetching`。

并且NextJS中`App Router`和`Pages Router`对于路由的处理也不一样，再加上React有众多不同的框架，以及版本迭代的更新很快，对于我这个使用最新的框架的小白来说真的是一头雾水，网上相关的资料也很难找到相对应合适的，好在最后我尝试成功了，所以我在这里记录一下，也希望可以帮到有需要的朋友。

## 实现
在`App Router`的NextJS中，获取API的方法是需要在`app`目录下构建一个本地的API，然后在本地的API中获取后端的API数据（以此避免跨域的相关问题？我具体也不是非常清楚），最终我的普通的API获取的代码如下：
``` js
// 获取后端API的代码
export async function GET(request: NextRequest) {
    const res = await fetch(URL + '/api/information', {
        headers: {
            'Content-Type': 'application/json',
        },
        next: {revalidate: 0} // 0秒后重新获取数据
    })
    const data = await res.json()
    // return Response.json({ data })
    return NextResponse.json({ data })
}

// 调用本地API的代码
async function getLocationInformation() {
    const res = await fetch('/api/getLocationInformation');
    if (!res.ok) {
        setMessage("Connect fail!");
        return;
    }
    const data = await res.json();
    setLocationInformation(data.data);
    setRootLocationInformation(data.data);
    for (var _ in data.data) {
        if (data.data[_]["is_arrived"]) setIsNextLocation(LocationInformationLinkedList[_ as keyof TypeLocationInformationLinkedList])
    }
    console.log(locationInformation)
}
```
本地的项目目录结构如下：

## 实时获取数据实现
由于以上代码只有在`getLocationInformation`被调用一次后才会获取一次数据，所以我跟着网上的教程尝试使用`useEffect`来实现实时获取数据，但是我发现只是使用`useEffect`好像没有办法实时更新数据。

我又跟着官方的代码尝试使用其他方式。
>#### 官方部分案例
>**Caching Data**
>
>Caching stores data so it doesn't need to be re-fetched from your data source on every request.
>
>By default, Next.js automatically caches the returned values of fetch in the Data Cache on the server. This means that the data can be fetched at build time or request time, cached, and reused on each data request.
>
``` js
// 'force-cache' is the default, and can be omitted
fetch('https://...', { cache: 'force-cache' })
```
包括各种其他类似如下的解决方案，但是我都没有成功。
``` js
import { getItem } from '@/utils/get-item'
 
export const revalidate = 3600 // revalidate the data at most every hour
 
export default async function Layout({
  params: { id },
}: {
  params: { id: string }
}) {
  const item = await getItem(id)
  // ...
}
```
再加上网上也有许多不同的解决方案，我也都尝试了，但是都没有成功，要么是因为版本不同，要么是因为框架不同，要么是因为我自己的代码写的有问题。

## 最终解决方案
最终，经过各种排列组合的尝试之后，我得出了一个合理的解决方案，就是在`useEffect`中调用`getLocationInformation()`，并且在获取后端API的代码中加入`next: {revalidate: 0}`，代码如下：
``` js
// 获取后端API的代码
export async function GET(request: NextRequest) {
    const res = await fetch(URL + '/api/information', {
        headers: {
            'Content-Type': 'application/json',
        },
        next: {revalidate: 0} // 0秒后重新获取数据
    })
    const data = await res.json()
    // return Response.json({ data })
    return NextResponse.json({ data })
}

// 调用本地API的代码
useEffect(() => {
        getLocationInformation();
    });

async function getLocationInformation() {
    const res = await fetch('/api/getLocationInformation');
    if (!res.ok) {
        setMessage("Connect fail!");
        return;
    }
    const data = await res.json();
    setLocationInformation(data.data);
    setRootLocationInformation(data.data);
    for (var _ in data.data) {
        if (data.data[_]["is_arrived"]) setIsNextLocation(LocationInformationLinkedList[_ as keyof TypeLocationInformationLinkedList])
    }
    console.log(locationInformation)
}
```
我个人的理解是，`next: {revalidate: 0}`是在获取数据的时候，告诉NextJS在0秒后重新获取数据，这样就可以实现实时获取数据了，同时由于`useEffect`函数的使用，使得后端每次获取新的API，这里就可以实时在页面上更新，也算是一个不错的解决方案吧。

## 总结
现在看起来这个问题似乎很简单，仔细理解每一行代码的含义似乎就可以很轻松的解决，但是当时确实是困扰了我很久，希望以后遇到类似的问题的时候可以静下心来好好分析，不要急躁，也希望这篇文章可以帮到有需要的朋友。