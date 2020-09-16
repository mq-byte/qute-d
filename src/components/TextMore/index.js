import React, { useState, useEffect, useRef } from 'react'

const TextMore = ({
  children,
  width,
  style,
  lineHeight = 20,
  lineClamp = 2,
  height,
  more = <span>MORE</span>,
  bg = '#fff'
}) => {
  const [showDot, setShowDot] = useState(true)
  const dom = useRef(null)
  useEffect(() => {
    if (dom.current) {
      const h = height ? parseInt(height) : lineHeight * lineClamp
      setShowDot(dom.current.scrollHeight > h)
    }
  }, [height, lineHeight, lineClamp, dom.current?.scrollHeight])
  return (
    <div
      ref={dom}
      style={{
        position: 'relative',
        width,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': lineClamp,
        '-webkit-box-orient': 'vertical',
        height: height || lineClamp * lineHeight + 'px',
        lineHeight: lineHeight + 'px',
        ...style
      }}
    >
      {children}
      {showDot ? (
        <span
          style={{
            backgroundColor: bg,
            position: 'absolute',
            right: 0,
            bottom: 0
          }}
        >
          ...{more}
        </span>
      ) : (
        more
      )}
    </div>
  )
}
export default TextMore
