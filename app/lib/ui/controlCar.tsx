'use client'
import { useState, useEffect } from 'react'

export default function ControlCar() {
    return (
        <div>
            <ControlCarArgument />
            <HandControl />
        </div>
    )
}

function ControlCarArgument() {

    const [isHandControlNow, setIsHandControlNow] = useState();
    const [xLinearSpeedNow, setXLinearSpeedNow]   = useState();
    const [yLinearSpeedNow, setYLinearSpeedNow]   = useState();
    const [zAngleSpeedNow, setZAngleSpeedNow]     = useState();
    const [isActivateNow, setIsActivateNow]       = useState();

    const [isHandControl, setIsHandControl] = useState(false);
    const [xLinearSpeed, setXLinearSpeed]   = useState(0);
    const [yLinearSpeed, setYLinearSpeed]   = useState(0);
    const [zAngleSpeed, setZAngleSpeed]     = useState(0);
    const [isActivate, setIsActivate]       = useState(true);

    const [message, setMessage] = useState('')
    
    const controlFrom = [
        {
            title: 'Hand control',
            value: isHandControl,
            valueNow: isHandControlNow,
            setValue: () => {setIsHandControl(!isHandControl)}
        },
        {
            title: 'X linear speed',
            value: xLinearSpeed,
            valueNow: xLinearSpeedNow,
            setValue: (newValue: number) =>{
                if (Math.abs(newValue) > 0.6) {
                    newValue = 0.6;
                }
                setXLinearSpeed(newValue)
            }
        },
        {
            title: 'Y linear speed',
            value: yLinearSpeed,
            valueNow: yLinearSpeedNow,
            setValue: (newValue: number) =>{
                if (Math.abs(newValue) > 0.6) {
                    newValue = 0.6;
                }
                setYLinearSpeed(newValue)
            }
        },
        {
            title: 'Z angle speed',
            value: zAngleSpeed,
            valueNow: zAngleSpeedNow,
            setValue: (newValue: number) =>{
                if (Math.abs(newValue) > 0.6) {
                    newValue = 0.6;
                }
                setZAngleSpeed(newValue)
            }
        },
        {
            title: 'is Activate',
            value: isActivate,
            valueNow: isActivateNow,
            setValue: () => {setIsActivate(!isActivate)}
        }
    ]

    async function sendControlCar() {
        const res = await fetch('/api/postCarInformation', {
            body: JSON.stringify({
                data: {
                    isHandControl: isHandControl,
                    xLinearSpeed : xLinearSpeed,
                    yLinearSpeed : yLinearSpeed,
                    zAngleSpeed  : zAngleSpeed,
                    isActivate   : isActivate
                }
            }),
            method: 'POST'
        })
        if (!res.ok) {
            setMessage("Send fail!")
            return
        }
        const value = await res.json()

        setIsActivateNow(value.value.isActivate)
        setIsHandControlNow(value.value.isHandControl)
        setXLinearSpeedNow(value.value.xLinearSpeed)
        setYLinearSpeedNow(value.value.yLinearSpeed)
        setZAngleSpeedNow(value.value.zAngleSpeed)
        setMessage("Send success!")
    }


    return (
        <div className="flex flex-col items-center mb-20">
            <div className='font-semibold bg-blue-500 rounded-xl justify-center items-center text-center m-5 p-2 w-full'>车辆控制</div>
            {
                controlFrom.map((item, index) => (
                        <TFbutton key={index} title={item.title} value={item.value} valueNow={item.valueNow} changeFunction={item.setValue}/>
                ))
            }
            <button onClick={sendControlCar} className='flex h-8 w-16 ml-2 rounded-xl  items-center justify-center bg-green-500 hover:bg-green-700'>Send</button>
            <div className='font-semibold text-red-500 justify-center items-center m-5 p-2'>{message}</div>
        </div>
    )
}

function TFbutton({title, value, valueNow, changeFunction}:{title:string, value: any, valueNow: any, changeFunction: any}) {
    
    if (title == "Hand control" || title == "is Activate") {
        var color = value ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700';
    } else {
        var color = 'bg-blue-500 hover:bg-blue-700';
    }
    
    const buttonClassName = 'flex h-8 w-16 ml-2 rounded-xl  items-center justify-center ' + color; 
    return (
        <div className="flex flex-row m-2 items-center justify-between">
            {title}
            {
                title == "Hand control" || title == "is Activate" ? (
                    <>
                        <div className="ml-3 mr-3">
                            {valueNow ? 'True' : 'False'}
                        </div>
                        <button onClick={changeFunction} className={buttonClassName}>
                            {value ? 'True' : 'False'}
                        </button>
                    </>
                ):(
                    <>
                        <div className="ml-3 mr-3">
                                {valueNow}
                            </div>
                        <input type="number" className="w-14 text-black" value={value} onChange={e => changeFunction(e.target.value)} />
                    </>
                )
            }
            
        </div>
        
    )
}

function HandControl() {

    const [handButton, setHandButton] = useState(0)

    return (
        <div className='flex flex-col items-center'>
            <div className='font-semibold bg-blue-500 rounded-xl justify-center items-center text-center m-5 p-2 w-full'>手动控制</div>
            <div className='bg-blue-500 mt-8 p-8 rounded-xl'>
                <div className='flex flex-col items-center w-[200px] '>
                    <div className={'cursor-pointer w-0 h-0 mb-5 border-x-[40px] border-b-[40px] border-transparent ' + (handButton == 1 ? "border-b-blue-600" : "border-b-white")} onMouseDown={() => {setHandButton(1)}} onMouseUp={() => {setHandButton(0)}}></div>
                    <div className='flex flex-row justify-between w-full'>
                        <div className={'cursor-pointer w-0 h-0 border-y-[40px] border-r-[40px] border-transparent ' + (handButton == 2 ? "border-r-blue-600" : "border-r-white")} onMouseDown={() => {setHandButton(2)}} onMouseUp={() => {setHandButton(0)}}></div>
                        <div className={'cursor-pointer w-0 h-0 border-y-[40px] border-l-[40px] border-transparent ' + (handButton == 3 ? "border-l-blue-600" : "border-l-white")} onMouseDown={() => {setHandButton(3)}} onMouseUp={() => {setHandButton(0)}}></div>
                    </div>
                    <div className={'cursor-pointer w-0 h-0 mt-5 border-x-[40px] border-t-[40px] border-transparent ' + (handButton == 4 ? "border-t-blue-600" : "border-t-white")} onMouseDown={() => {setHandButton(4)}} onMouseUp={() => {setHandButton(0)}}></div>
                </div>
            </div>
        </div>
    )
}