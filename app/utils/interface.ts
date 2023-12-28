export interface LocationInformation {
    Library: {
        is_arrived: Boolean,
        is_target: Boolean,
    },
    SchoolGate: {
        is_arrived: Boolean,
        is_target: Boolean,
    },
    Dormitory: {
        is_arrived: Boolean,
        is_target: Boolean,
    }
    Classroom: {
        is_arrived: Boolean,
        is_target: Boolean,
    },
    Canteen: {
        is_arrived: Boolean,
        is_target: Boolean,
    }
}

export const defaultLocationInformation = {
    Library: {
        is_arrived: false,
        is_target: false,
    },
    SchoolGate: {
        is_arrived: false,
        is_target: false,
    },
    Dormitory: {
        is_arrived: false,
        is_target: false,
    },
    Classroom: {
        is_arrived: false,
        is_target: false,
    },
    Canteen: {
        is_arrived: false,
        is_target: false,
    },
}

export interface TypeLocationInformationLinkedList {
    Library:    string,
    SchoolGate: string,
    Dormitory:  string,
    Classroom:  string,
    Canteen:    string,
}

export const LocationInformationLinkedList:TypeLocationInformationLinkedList = {
    Library:    "SchoolGate",
    SchoolGate: "Dormitory",
    Dormitory:  "Classroom",
    Classroom:  "Canteen",
    Canteen:    "Library",
}

// export const LocationInformationLinkedList = {
//     "Library":    "SchoolGate",
//     "SchoolGate": "Dormitory",
//     "Dormitory":  "Classroom",
//     "Classroom":  "Canteen",
//     "Canteen":    "Library",
// }

export const LocationEnglish2ChineseList:TypeLocationInformationLinkedList = {
    SchoolGate: "校门",
    Dormitory:  "宿舍楼",
    Classroom:  "教学楼",
    Canteen:    "食堂",
    Library:    "图书馆",
}