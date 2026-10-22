import { useEffect, useState } from 'react'
import { getProjectReadme } from '../services/githubService.js'

export function useProjectReadme(repo, defaultBranch) {
  const [result, setResult] = useState({ repo: null, state: { status: 'loading', markdown: '' } })
  useEffect(() => { let active = true; getProjectReadme(repo, defaultBranch).then((state) => { if (active) setResult({ repo, state }) }); return () => { active = false } }, [repo, defaultBranch])
  return result.repo === repo ? result.state : { status: 'loading', markdown: '' }
}
