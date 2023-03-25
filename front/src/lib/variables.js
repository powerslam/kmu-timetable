const null_str = "\u00A0";

export const week_data = [null_str, "월", "화", "수", "목", "금", "토", "일"];
export const time_data = {
    alpha: {
        time:
            {
                daytime: [ 
                    "1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B",
                    "6A", "6B", "7A", "7B", "8A", "8B", "9A", "9B",
                ],  
                night: [ "10A", "10B", "11A", "11B", "12A", "12B", "13A", "13B", "14A", "14B" ]
            },

        interval: {
            daytime: Array(18).fill(1),
            night: Array(10).fill(1),
        } 
    },

    number: {
        time: 
            { 
                daytime: [ 
                    "9시", "9시 30분", "10시", "10시 30분", "11시", "11시 30분", 
                    "12시", "12시 30분", "13시", "13시 30분", "14시", "14시 30분", 
                    "15시", "15시 30분", "16시", "16시 30분", "17시", "17시 30분" 
                ],
                // 주간 (30분 단위 - minutes 남기기)

                night: [ 
                    "18시", "18시 25분", "18시 55분", "19시 20분", "19시 50분", "20시 15분", 
                    "20시 45분", "21시 10분", "21시 40분", "22시 05분" 
                ]
                // 야간 (25분 단위)
            },

        interval: {
            daytime: Array(18).fill(1),
            night: Array(10).fill(1),
        }
    },
}

export const null_data = {
    time: {
            daytime: Array(18).fill(null_str),
            night: Array(10).fill(null_str),
        },

    interval: {
        daytime: Array(18).fill(1),
        night: Array(10).fill(1)
    }
};

export const weekly = [
    {
        time: {
                daytime: ["\u00A0", "\u00A0", "\u00A0", "지리공간의 이해", "\u00A0", "사제동행세미나", "자료구조", "\u00A0", "\u00A0", "\u00A0"],
                night: Array(10).fill(null_str),
            },

        interval: {
            daytime: [1, 1, 1, 7, 1, 1, 3, 1, 1, 1, 1, 1],
            night: Array(10).fill(1)
        }
    },

    {
        time: {
                daytime: ["\u00A0", "\u00A0", "\u00A0", "지리공간의 이해", "\u00A0", "사제동행세미나", "자료구조", "\u00A0", "\u00A0", "\u00A0"],
                night: Array(10).fill(null_str),
            },

        interval: {
            daytime: [1, 1, 1, 7, 1, 1, 3, 1, 1, 1, 1, 1],
            night: Array(10).fill(1)
        }
    },

    {
        time: {
                daytime: ["\u00A0", "\u00A0", "\u00A0", "C++ 프로그래밍", "\u00A0", "\u00A0", "\u00A0", "논리회로설계", "웹클라이언트컴퓨팅", "\u00A0", "\u00A0", "\u00A0"],
                night: Array(10).fill(null_str),
            },

        interval: {
            daytime: [1, 1, 1, 3, 1, 1, 1, 3, 3],
            night: Array(10).fill(1)
        }
    },

    {
        time: {
                daytime: ["\u00A0", "\u00A0", "\u00A0", "지리공간의 이해", "\u00A0", "사제동행세미나", "자료구조", "\u00A0", "\u00A0", "\u00A0"],
                night: Array(10).fill(null_str),
            },

        interval: {
            daytime: [1, 1, 1, 7, 1, 1, 3, 1, 1, 1, 1, 1],
            night: Array(10).fill(1)
        }
    },

    {
        time: {
                daytime: ["\u00A0", "\u00A0", "\u00A0", "지리공간의 이해", "\u00A0", "사제동행세미나", "자료구조", "\u00A0", "\u00A0", "\u00A0"],
                night: Array(10).fill(null_str),
            },

        interval: {
            daytime: [1, 1, 1, 7, 1, 1, 3, 1, 1, 1, 1, 1],
            night: Array(10).fill(1)
        }
    },

    {
        time: {
                daytime: ["\u00A0", "\u00A0", "\u00A0", "지리공간의 이해", "\u00A0", "사제동행세미나", "자료구조", "\u00A0", "\u00A0", "\u00A0"],
                night: Array(10).fill(null_str),
            },

        interval: {
            daytime: [1, 1, 1, 7, 1, 1, 3, 1, 1, 1, 1, 1],
            night: Array(10).fill(1)
        }
    },

]

export const common_height = 60;
