import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import SocialShareMenu from './components/SocialShareMenu'

export default function Home() {
  return (
    <>
      <Navbar />
      <SocialShareMenu />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}