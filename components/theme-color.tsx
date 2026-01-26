'use client'

import { useEffect } from 'react'

export function ThemeColor() {
  useEffect(() => {
    const updateThemeColor = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const color = isDark ? '#1a1a1d' : '#fcfcfc'
      
      // Update or create theme-color meta tag
      let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement
      if (meta) {
        meta.content = color
      } else {
        meta = document.createElement('meta')
        meta.name = 'theme-color'
        meta.content = color
        document.head.appendChild(meta)
      }
      
      // Update color-scheme on html element to trigger Safari
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
      
      // Force Safari to repaint by modifying a CSS custom property
      document.documentElement.style.setProperty('--theme-update', Date.now().toString())
    }
    
    // Initial update
    setTimeout(updateThemeColor, 0)
    
    // Watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // Slight delay to ensure theme has actually changed
          setTimeout(updateThemeColor, 50)
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  return null
}
