import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Philosophy from '@/components/Philosophy';
import About from '@/components/About';
import SkillsRadial from '@/components/SkillsRadial';
import GitHubHeatmap from '@/components/GitHubHeatmap';
import ResumeAndCerts from '@/components/ResumeAndCerts';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-20 space-y-32">
        <Hero />
        <Projects />
        <Philosophy />
        <About />
        <SkillsRadial />
        <GitHubHeatmap />
        <ResumeAndCerts />
        <Contact />
      </main>
      <footer className="pb-10 text-center font-sans text-xs" style={{ color: '#8B7355' }}>
        Currently building &middot; Last updated May 2026
      </footer>
    </>
  );
}
