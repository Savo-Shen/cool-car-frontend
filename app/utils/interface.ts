export interface LocationInformation {
    Library: {
        is_arrived: Boolean,
        is_target: Boolean,
    },
    Classroom: {
        is_arrived: Boolean,
        is_target: Boolean,
    },
    // 实验楼: {
    //     "is_arrived": Boolean,
    //     'is_target': Boolean,
    // },
    Canteen: {
        is_arrived: Boolean,
        is_target: Boolean,
    },
    Dormitory: {
        is_arrived: Boolean,
        is_target: Boolean,
    }
}

export const defaultLocationInformation = {
    Library: {
        is_arrived: true,
        is_target: false,
    },
    Classroom: {
        is_arrived: false,
        is_target: true,
    },
    // 实验楼: {
    //     "is_arrived": false,
    //     'is_target': false,
    // },
    Canteen: {
        is_arrived: false,
        is_target: false,
    },
    Dormitory: {
        is_arrived: false,
        is_target: false,
    }
}