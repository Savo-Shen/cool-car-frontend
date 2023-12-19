'use client'

import { useState, useEffect } from 'react'

import ControlCar from './lib/ui/controlCar';
import Information from './lib/ui/information';
import Map from './lib/ui/map';
import Camera from './lib/ui/camera';

import type { LocationInformation } from '@/app/utils/interface'
import { defaultLocationInformation } from '@/app/utils/interface'

export default function Home() {

    const [rootLocationInformation, setRootLocationInformation] = useState<LocationInformation>(defaultLocationInformation);

    return (
        <main className='flex h-screen justify-around mt-4'>
            <Information setRootLocationInformation={setRootLocationInformation}/>
            <div className="flex flex-col">
                <Map locationInformation={rootLocationInformation}/>
                
                {/* BUG: 后端信息更新,前端获取新数据刷新后摄像头内容会暂停,需要手动刷新页面或切换摄像头内容方可恢复 */}
                <Camera /> 
                
            </div>
            <ControlCar />
        </main>
    )
}

