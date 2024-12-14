import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ProblemSolution } from '../components/ProblemSolution';
import { HowItWorks } from '../components/HowItWorks';
import { TargetAudience } from '../components/TargetAudience';
import { AboutContact } from '../components/AboutContact';
import { Footer } from '../components/Footer';

export function Landing() {
  return (
    <div>
      <main>
        <Hero />
        <Features />
        <ProblemSolution />
        <HowItWorks />
        <TargetAudience />
        <AboutContact />
      </main>
      <Footer />
    </div>
  );
}
