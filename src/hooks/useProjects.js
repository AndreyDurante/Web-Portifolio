import { useEffect, useState } from 'react'
import { getProjects } from '../services/githubService.js'

export function useProjects() {
  const [state, setState] = useState({ status: 'loading', projects: [] })
  useEffect(() => { let active = true; getProjects().then((value) => { if (active) setState(value) }); return () => { active = false } }, [])
  return state
}
