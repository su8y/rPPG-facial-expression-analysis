import {DonutChart} from "@mantine/charts";

const COLORS = ['#4C6EF5', '#22B8CF', '#FAB005', '#FF6B6B'];

const Needle = ({value, max, cx, cy, reverse}: {
    value: number,
    max: number,
    cx: number,
    cy: number,
    reverse?: boolean
}) => {
    if (value === null || cx === null || cy === null || isNaN(value)) {
        return <>데이터 없음</>;
    }

    // value를 0과 max 사이로 정규화 (0 ~ 1)
    const normalizedValue = value / max;

    // reverse 값에 따라 angle 계산 방식을 변경합니다.
    const angle = reverse
        ? 180 * normalizedValue         // reverse={true}: 0(0도) -> max(180도)
        : 180 * (1 - normalizedValue);  // reverse={false}: 0(180도) -> max(0도)

    const length = 40; // 바늘 길이
    const x2 = cx + length * Math.cos(-angle * Math.PI / 180);
    const y2 = cy + length * Math.sin(-angle * Math.PI / 180);

    return (
        <>
            {/* 바늘 선 */}
            <path d={`M ${cx} ${cy} L ${x2} ${y2}`} stroke="black" strokeWidth={2}/>
            {/* 바늘 중심축 */}
            <circle cx={cx} cy={cy} r={5} fill="black"/>
        </>
    );
};


export const Gauge = ({max, value, reverse = false}: { value: number; max: number, reverse?: boolean }) => {
    let gaugeData = [
        {name: 'Normal', value: 50, color: COLORS[1]},
        {name: 'High', value: 50, color: COLORS[2]},
        {name: 'Very High', value: 50, color: COLORS[3]},
    ];
    if (reverse) gaugeData = gaugeData.reverse();
    return (
        <DonutChart data={gaugeData}
                    startAngle={180}
                    endAngle={0}
                    size={140}
                    style={{root: {height: '70px'}}}
                    thickness={20}
        >
            <Needle value={value} max={max} cx={70} cy={70} reverse={reverse}/>
        </DonutChart>
    );
};