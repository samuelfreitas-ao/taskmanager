import React from 'react'
import  './style.scss'

type Props = React.HTMLAttributes<HTMLElement>

const SpinnerHorizontalCircle: React.FC<Props> = (props: Props) => {
    return (
        <div {...props} className="spinner">
            <div /><div /><div /><div />
        </div>
    )
}
export default SpinnerHorizontalCircle
