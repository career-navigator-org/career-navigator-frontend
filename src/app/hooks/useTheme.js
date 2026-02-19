import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark' 
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }, [darkMode])

  const toggleTheme = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    setClickPosition({ x, y });
    setIsAnimating(true);
    
    requestAnimationFrame(() => {
      setDarkMode(!darkMode);
    });
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }

  return { darkMode, toggleTheme, isAnimating, clickPosition }
}