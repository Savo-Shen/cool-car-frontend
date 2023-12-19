import type { LocationInformation } from '@/app/utils/interface'

export default function Map({locationInformation}:{locationInformation: LocationInformation}) {
    
    let location_list = [
        {
            name: "食堂",
            state: () => {
                if (locationInformation.Canteen.is_arrived) {
                    return 2
                } else if (locationInformation.Canteen.is_target) {
                    return 1
                } else {
                    return 0
                }
            },
            point_location: {
                x: "top-[310px]",
                y: "left-[100px]"
            },
        },
        {  
            name: "图书馆",
            state: () => {
                if (locationInformation.Library.is_arrived) {
                    return 2
                } else if (locationInformation.Library.is_target) {
                    return 1
                } else {
                    return 0
                }
            },
            point_location: {
                x: "top-[60px]",
                y: "left-[90px]"
            },
        },
        {
            name: "教学楼",
            state: () => {
                if (locationInformation.Classroom.is_arrived) {
                    return 2
                } else if (locationInformation.Classroom.is_target) {
                    return 1
                } else {
                    return 0
                }
            },
            point_location: {
                x: "top-[260px]",
                y: "left-[300px]"
            },
        },
        {
            name: "宿舍楼",
            state: () => {
                if (locationInformation.Dormitory.is_arrived) {
                    return 2
                } else if (locationInformation.Dormitory.is_target) {
                    return 1
                } else {
                    return 0
                }
            },
            point_location: {
                x: "top-[20px]",
                y: "left-[310px]"
            },
        },
        // {
        //     name: "校门口",
        //     state: () => {
        //         if (locationInformation.Canteen.is_arrived) {
        //             return 2
        //         } else if (locationInformation.Canteen.is_target) {
        //             return 1
        //         } else {
        //             return 0
        //         }
        //     },
        //     point_location: {
        //         x: "top-[285px]",
        //         y: "left-[300px]"
        //     },
        // },
    ]
 
    const pointColorList:{
        red: string,
        green: string,
        yellow: string,
    } = {
        red: 'bg-red-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
    }

    return (
        <div className="flex flex-col items-center">
            <div className='font-semibold bg-blue-500 rounded-xl justify-center text-center items-center m-5 p-2 w-full'>Map</div>
            <div className="bg-[url('/cool-car-map.png')] bg-contain h-[420px] w-[460px] bg-no-repeat bg-center">
                {
                    location_list.map((item, index) => {
                        return (
                            <div key={index} className={"relative flex items-center " + item.point_location.x + " " + item.point_location.y + ""}> 
                                <div className={'w-2 h-2 rounded-xl mr-2 ' + {
                                    0: pointColorList["red"],
                                    1: pointColorList["green"],
                                    2: pointColorList["yellow"],
                                }[item.state()]}></div>
                                <div className="font-sans">{item.name}</div>
                            </div>
                            
                        )
                    })
                }
            </div>            
        </div>

    )
}