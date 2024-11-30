// 校园智能小车前端
// 作者: 沈逸帆

'use client'

import { useState, useEffect } from 'react'

import ControlCar from './lib/ui/controlCar';
import Information from './lib/ui/information';
import Map from './lib/ui/map';
import Camera from './lib/ui/camera';

import type { LocationInformation } from '@/app/utils/interface'
import { defaultLocationInformation } from '@/app/utils/interface'

// 主程序入口
export default function Home() {

    const [rootLocationInformation, setRootLocationInformation] = useState<LocationInformation>(defaultLocationInformation);

    return (
        <main className='flex h-full justify-around mt-4'>
            <Information setRootLocationInformation={setRootLocationInformation}/>
            <div className="flex flex-col">
                <Map locationInformation={rootLocationInformation}/>
                

                <Camera /> 
                
            </div>
            <ControlCar />
        </main>
    )
}

