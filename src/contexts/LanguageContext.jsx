import { useEffect, useMemo, useState } from 'react'
import pt from '../data/pt.js'
import en from '../data/en.js'
import { readStorage, writeStorage } from '../utils/storage.js'
import { LanguageContext } from './LanguageContext.js'

const content = { pt, en }

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() =>
    readStorage('portfolio-language', 'pt') === 'en' ? 'en' : 'pt',
  )
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    writeStorage('portfolio-language', language)
  }, [language])
  const value = useMemo(() => ({ language, setLanguage, t: content[language] }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
