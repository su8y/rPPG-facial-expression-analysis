import {type ElementType, type ReactNode} from 'react';
import {Box, type MantineStyleProp} from "@mantine/core";

/**
 * Blur overlay component
 *
 * 해당 컴포넌트를 사용하기 위해서는 타깃(부모)컴포넌트의 style.position=relative 설정이 되어야합니다.
 */
export interface BlurOverlayProps {
    style?: MantineStyleProp;
    children?: ReactNode;
    component?: ElementType;
}

export const BlurOverlay = ({style}: BlurOverlayProps) => {

    return <Box
        style={{
            position: 'absolute',
            top: '-2%',
            left: '-3%',
            right: '0px',
            bottom: '0px',
            backdropFilter: 'blur(4px)',
            width: '106%',
            height: '104%',
            ...style
        }}/>
};