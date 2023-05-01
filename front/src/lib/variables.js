export const NULL_STR = "\u00A0";

export const MAIN = '/';
export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const TIMETABLE = '/main/timetable';

export const WEEK_HEAD = [NULL_STR, "월", "화", "수", "목", "금", "토", "일", NULL_STR];
export const TIME_HEAD = {
    alpha: {
        daytime: {
            time: [ 
                "1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B",
                "6A", "6B", "7A", "7B", "8A", "8B", "9A", "9B",
            ],
            interval: Array(18).fill(1),
        },

        night: {
            time: [ 
                "10A", "10B", "11A", "11B", "12A", "12B", "13A", "13B",
                "14A", "14B"
            ],
            interval: Array(10).fill(1),
        },
    },

    number: {
        daytime: {
            time: [ 
                "9시", "9시 30분", "10시", "10시 30분", "11시", "11시 30분", 
                "12시", "12시 30분", "13시", "13시 30분", "14시", "14시 30분", 
                "15시", "15시 30분", "16시", "16시 30분", "17시", "17시 30분" 
            ],
            interval: Array(18).fill(1),
        },

        night: {
            time: [ 
                "18시", "18시 25분", "18시 55분", "19시 20분", "19시 50분", "20시 15분", 
                "20시 45분", "21시 10분", "21시 40분", "22시 05분" 
            ],
            interval: Array(10).fill(1),
        },
    },
};
export const NULL_DATA = {
    daytime:{
        time: Array(18).fill(NULL_STR),
        interval: Array(18).fill(1),
    },

    night: {
        time: Array(10).fill(NULL_STR),
        interval: Array(10).fill(1),
    }
};

export const weekly = [
    {
        daytime: {
            time: [NULL_STR, NULL_STR, NULL_STR, "지리공간의 이해", NULL_STR, "사제동행세미나", "자료구조", NULL_STR, NULL_STR, NULL_STR],
            interval: [1, 1, 1, 7, 1, 1, 3, 1, 1, 1],
        },

        night: {
            time: Array(10).fill(NULL_STR),
            interval: Array(10).fill(1),
        },
    },

    {
        daytime: {
            time: [NULL_STR, NULL_STR, NULL_STR, "지리공간의 이해", NULL_STR, "사제동행세미나", "자료구조", NULL_STR, NULL_STR, NULL_STR],
            interval: [1, 1, 1, 7, 1, 1, 3, 1, 1, 1, 1, 1],
        },

        night: {
            time: Array(10).fill(NULL_STR),
            interval: Array(10).fill(1),
        },
    },
];

export const common_height = 60;
