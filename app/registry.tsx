'use client'

// to actually get to use styled components without it sh*tting out an error all the time ( >:[ )
// https://nextjs.org/docs/app/guides/css-in-js#styled-components
 
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleSheetManager, ServerStyleSheet } from 'styled-components'
 
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
 
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })
 
  if (typeof window !== 'undefined') return <>{children}</>
 
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}