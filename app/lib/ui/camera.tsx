import React, { useState, useEffect } from "react"

import { URL } from '@/app/api/config'

// const URL = 'http://192.168.31.248:5000/'
// const URL = 'http://127.0.0.1:5003'

const cameraPath = [
    {
        name: "原始摄像头",
        path: "/camera/original_camera"
    },
    {
        name: "交通标志检测",
        path: "/camera/traffic_detect"
    },
    {
        name: "路障检测",
        path: "/camera/block_detect"
    },
    {
        name: "路标检测",
        path: "/camera/guidepost_detect"
    }
]

export default function Camera() {
    
    const [pathId, setPathId] = useState(0);

    return (
        <div className="flex flex-col">
            <div className='font-semibold bg-blue-500 rounded-xl justify-center items-center text-center m-5 p-2'>Camera</div>
            <div className="flex items-center justify-center ">
            {
                    cameraPath.map((path, index) => (
                        index == pathId ? 
                        <button key={index} className="flex p-1 mb-2 mr-2 rounded-xl bg-green-500 items-center justify-center" onClick={() => {setPathId(index)}}>{path.name}</button>
                        :
                        <button key={index} className="flex p-1 mb-2 mr-2 rounded-xl bg-red-500 items-center justify-center" onClick={() => {setPathId(index)}}>{path.name}</button>
                    ))
                }
            </div>
            <CameraSource pathName={cameraPath[pathId].path} cameraName={cameraPath[pathId].name}/>
        </div>
    )
}

// function CameraSource() {

//     const [pathId, setPathId] = useState(0);

//     return (
//         <div >
//             <div className='font-semibold bg-blue-500 rounded-xl justify-center text-center items-center m-5 p-2'>Camera</div>
//             <div className='flex flex-row'>
//                 {
//                     cameraPath.map((path, index) => (
//                         index == pathId ? 
//                         <button key={index} className="flex p-1 mb-2 mr-2 rounded-xl bg-green-500 items-center justify-center" onClick={() => {setPathId(index)}}>{path.name}</button>
//                         :
//                         <button key={index} className="flex p-1 mb-2 mr-2 rounded-xl bg-red-500 items-center justify-center" onClick={() => {setPathId(index)}}>{path.name}</button>
//                     ))
//                 }
//             </div>
//             <CameraSource pathName={cameraPath[pathId].path} cameraName={cameraPath[pathId].name}/>
//         </div>
//     )
// }

function CameraSource({pathName, cameraName}:{pathName: string, cameraName: string}) {

    const cameraUrl:string = URL + pathName;
    // const cameraUrl:string = "http://192.168.31.248:5000/camera/original_camera";
    // const cameraUrl:string = "http://127.0.0.1:5003/camera/original_camera";

    // const [timer, setTimer] = useState(0);
    // setInterval(() => {   
    //     setTimer(timer > 1000 ? 0 : timer + 1)
    // }
    // , 1);

    return (
        <div className="flex flex-col justify-center items-center border-blue-500 border">
            {/* <Image 
            src={cameraUrl} 
            alt="Car Camera"
            width={640} 
            height={480}
            /> */}
            <picture>
                <img 
                src={cameraUrl}
                alt={cameraName}
                width={640}
                height={480}
                ></img>
            </picture>
        </div>
    )
}