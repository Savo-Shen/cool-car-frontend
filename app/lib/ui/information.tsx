'use client'
import { useState, useEffect } from 'react'
import type { LocationInformation, TypeLocationInformationLinkedList } from '@/app/utils/interface'
import { defaultLocationInformation, LocationInformationLinkedList, LocationEnglish2ChineseList } from '@/app/utils/interface'

export default function Information({setRootLocationInformation}:{setRootLocationInformation: any}) {

    const [locationInformation, setLocationInformation] = useState<LocationInformation>(defaultLocationInformation);

    return (
        <div className="flex flex-col h-full">
            <CarInformation />
            <LocationInformation locationInformation={locationInformation} setLocationInformation={setLocationInformation} setRootLocationInformation={setRootLocationInformation} />
            <PassengerInformation />
        </div>
    )
}

function CarInformation() {
    let name   = "校园小车"
    let id     = 1
    let fullNumber = 20
    return (
        <>
            <div className='font-semibold bg-blue-500 rounded-xl justify-center text-center items-center m-5 p-2 w-full'>小车信息</div>
            <div className="mt-8 mb-12">
                <div >名称：{name}</div>
                <div >编号：{id}</div>
                <div >核载人数：{fullNumber}</div>
            </div>
        </>
    )
}

function LocationInformation({locationInformation, setLocationInformation, setRootLocationInformation}: {locationInformation: LocationInformation, setLocationInformation: any, setRootLocationInformation: any}) {

    const [message, setMessage] = useState<string>("");
    const [isNextLocation, setIsNextLocation] = useState<string>("");

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


    return (
        <div className="flex flex-col m-5 ">
            <div className='font-semibold bg-blue-500 rounded-xl justify-center items-center text-center m-5 p-2 w-full'>站点信息</div>
            {
                Object.keys(locationInformation).map((key, index) => (
                        <div key={index} className="flex flex-row justify-between items-center mb-4">
                            <div className='mr-5'>{LocationEnglish2ChineseList[key as keyof LocationInformation]}</div>
                            <div className='flex flex-col items-begin'>
                                <div className={'flex h-8 ml-2 mr-2 pl-2 pr-2 rounded-xl justify-center items-center text-center mb-2 '
                                 + (key == isNextLocation ? "bg-yellow-500" : (
                                   (locationInformation[key as keyof LocationInformation].is_arrived ? "bg-green-500" : "bg-red-500")
                                 ))
                                 }>
                                    {
                                        (key == isNextLocation ? "下一站到达" : (
                                        (locationInformation[key as keyof LocationInformation].is_arrived ? "已到达" : "未到达")
                                        ))
                                    }
                                </div>
                                <div className={'flex h-8 ml-2 mr-2 pl-2 pr-2 rounded-xl items-center justify-center text-center '
                                 + (locationInformation[key as keyof LocationInformation].is_target ? "bg-green-500" : "bg-red-500")
                                 }>
                                    {locationInformation[key as keyof LocationInformation].is_target ? "目标地点" : "非目标地点"}
                                </div>
                            </div>
                        </div>
                ))
            }
            <div className='font-semibold text-red-500 justify-center items-center m-5 p-2 text-center'>{message}</div>
        </div>
    )
}

function PassengerInformation() {
    return (
        <div >
            <div className='font-semibold bg-blue-500 rounded-xl justify-center items-center text-center m-5 p-2 w-full'>乘客信息</div>
        </div>
    )
}