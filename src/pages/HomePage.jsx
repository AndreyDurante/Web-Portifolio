import { useLanguage } from '../hooks/useLanguage.js'
import Navigation from '../components/Navigation.jsx'
import Presentation from '../components/Presentation.jsx'
import ShowcaseTabs from '../components/ShowcaseTabs.jsx'
import Section from '../components/Section.jsx'
import SkillList from '../components/SkillList.jsx'
import Trajectory from '../components/Trajectory.jsx'
import Footer from '../components/Footer.jsx'
import ProjectShowcase from '../components/ProjectShowcase.jsx'

export default function HomePage() {
  const { t } = useLanguage()
  return <><a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--foreground)] focus:px-5 focus:py-3 focus:text-[var(--background)]" href="#conteudo">{languageSkipLabel(t)}</a><Navigation /><main id="conteudo"><Presentation /><Section id="projetos" eyebrow={t.showcase.eyebrow} title={t.showcase.title}><ShowcaseTabs projectsPanel={<ProjectShowcase />} technologiesPanel={<SkillList items={t.skills.technologies} />} competenciesPanel={<SkillList items={t.skills.competencies} />} /></Section><Section id="trajetoria" eyebrow={t.trajectory.eyebrow} title={t.trajectory.title}><Trajectory /></Section></main><Footer /></>
}

function languageSkipLabel(t) { return t.languageName === 'Português' ? 'Pular para o conteúdo' : 'Skip to content' }
