'use client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Home, User, Briefcase, Mail, Github, Linkedin, FileText, Coffee, Book, Lightbulb,Download, Sun,Moon } from 'lucide-react'
import { useState, useEffect} from 'react'
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from '@/components/ui/textarea'
import Proyects from './components/proyects'
import Certificados from './components/Certificados'


export default function Portfolio() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { toast } = useToast();
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDownloadCV = () => {
    // Replace with the actual URL of your CV file
    const cvUrl = 'https://drive.google.com/file/d/1KNlIfhc0YMpCUnENG6fF9p5DuG7zH_uQ/view';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Joel_David_Pena_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Mensaje enviado",
          description: "Gracias por contactarme. Te responderé pronto.",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={`flex  bg-white text-black`}>
       <button 
        onClick={toggleMenu} 
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 p-2  rounded-xl text-white">
        {/* Icono de hamburguesa */}
        {isMenuOpen ? 'X' : '☰'}
      </button>
     
      {/* Menú vertical */}
      <aside className={`w-64 h-screen 'bg-gray-100  z-10 p-6 fixed left-0 top-0 overflow-y-auto transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block`}>
        <nav className="space-y-2 ">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#home">
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#about">
              <User className="mr-2 h-4 w-4" />
              Sobre mí
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#projects">
              <Code className="mr-2 h-4 w-4" />
              Proyectos
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#experience">
              <Briefcase className="mr-2 h-4 w-4" />
              Experiencia
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#skills">
              <FileText className="mr-2 h-4 w-4" />
              Skills
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Contacto
            </a>
          </Button>
        </nav>
        <Button 
          variant="outline" 
          className="w-full mt-4 justify-start"
          onClick={handleDownloadCV}
        >
          <Download className="mr-2 h-4 w-4" />
          Descargar CV
        </Button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-[10px]  lg:ml-64  overflow-auto">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r  text-black">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">Joel David Peña</h1>
            <p className="text-2xl mb-8">Programando... 👨🏻‍💻</p>
            <Button size="lg" asChild>
              <a href="#contact">Contáctame</a>
            </Button>
          </div>
        </section>

        {/* Sobre mí */}
        <section id="about" className="py-20">
          <h2 className="text-4xl font-bold mb-10 text-center">Sobre mí</h2>
          <div className="flex flex-wrap justify-center items-center gap-10">
            <div className="flex-1 min-w-[300px] max-w-[500px]">
              <Image src="/Joel.webp" alt="Joel david" width={500} height={500} className="rounded-lg shadow-black" />
            </div>
            <div className="flex-1 min-w-[300px] max-w-[500px] space-y-6">
              <p className="text-lg">Soy un desarrollador apasionado por crear soluciones innovadoras y eficientes. Con experiencia en tecnologías front-end y back-end, disfruto enfrentando nuevos desafíos y aprendiendo constantemente.</p>
              <div className="flex justify-around">
                <div className="text-center">
                  <Coffee size={48} className="mx-auto mb-2 text-primary" />
                  <p>Amante del café</p>
                </div>
                <div className="text-center">
                  <Book size={48} className="mx-auto mb-2 text-primary" />
                  <p>Aprendizaje continuo</p>
                </div>
                <div className="text-center">
                  <Lightbulb size={48} className="mx-auto mb-2 text-primary" />
                  <p>Innovación</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proyectos */}
        <Proyects/>

        {/* Experiencia */}
        <section id="experience" className="py-20">
          <h2 className="text-4xl font-bold mb-10 text-center">Experiencia</h2>
          <div className="space-y-12">
          <Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="text-2xl">Cincinnatus Institute of Craftsmanship</CardTitle>
    <CardDescription className="text-lg">Programador Freelance (2022-2024)</CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="list-disc pl-5 space-y-2">
      <li>Formación en programación, adquiriendo habilidades en el desarrollo de aplicaciones.</li>
      <li>Colaboré en la creación de una app para la administración, mejorando el flujo de datos y la eficiencia operativa.</li>
      <li>Desarrollé una aplicación para una aerolínea, optimizando la gestión de vuelos y recursos.</li>
    </ul>
  </CardContent>
</Card>

          <Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="text-2xl">Desarrollador Freelance</CardTitle>
    <CardDescription className="text-lg">Programador Freelance (2022-2024)</CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="list-disc pl-5 space-y-2">
      <li>Desarrollo de soluciones a medida, adaptadas a las necesidades específicas de mis clientes.</li>
      <li>Familiarizado con prácticas de CI/CD, contribuyendo a una mejora continua en los procesos de entrega.</li>
      <li>Colaboración con otros desarrolladores, fomentando un ambiente de aprendizaje y crecimiento.</li>
    </ul>
  </CardContent>
</Card>

           
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 ">
          <h2 className="text-4xl font-bold mb-10 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="text-lg py-2 px-4">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
              </svg>
              JavaScript
            </Badge>
            <Badge className="text-lg py-2 px-4">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02  2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
              </svg>
              React
            </Badge>
            <Badge className="text-lg py-2 px-4">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
              </svg>
              Node.js
            </Badge>
            <Badge className="text-lg py-2 px-4">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 0C6.73 0 0 6.73 0 15s6.73 15 15 15 15-6.73 15-15S23.27 0 15 0zm-.007 27.707h-1.506v-3.623h1.506v3.623zm-1.506-5.72c-4.175 0-6.735-2.027-6.735-4.718s2.56-4.719 6.735-4.719h1.505v2.197h-1.505c-1.797 0-2.72.798-2.72 2.097 0 1.299.923 2.097 2.72 2.097h1.505v2.197h-1.505zm11.724 5.72h-1.506v-3.623h1.506v3.623zm-1.506-5.72c-1.797 0-2.72-.798-2.72-2.097 0-1.299.923-2.097 2.72-2.097h1.505v-2.197h-1.505c-4.175 0-6.735 2.027-6.735 4.718s2.56 4.719 6.735 4.719h1.505v2.197h-1.505zm3.471 5.72h-1.506v-3.623h1.506v3.623z"/>
</svg>

              Boostrap
            </Badge>
            <Badge className="text-lg py-2 px-4">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"/>
              </svg>
              Next.js
            </Badge>
            <Badge className="text-lg py-2 px-4">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2l-8 8 8 8 8-8-8-8zm0 2.93l6.31 6.31L12 19.08 5.69 11.24 12 4.93zm0 5.43l-2.12 2.12L12 18.16l2.12-2.12L12 10.36z"/>
</svg>

              Firebase
            </Badge>
            <Badge className="text-lg py-2 px-4">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2c5.525 0 10 4.475 10 10s-4.475 10-10 10-10-4.475-10-10S6.475 2 12 2zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm-.001 4h1.562l-.939 5.327-1.622-.079 1.03-5.248zm-.007 8.553l-1.424-.072.87-5.042 1.423.072-.87 5.042z"/>
</svg>


              Tailwind
            </Badge>
            <Badge className="text-lg py-2 px-4">
  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2c5.525 0 10 4.475 10 10s-4.475 10-10 10S2 17.525 2 12 6.475 2 12 2zm-.956 3.047c-1.293 0-2.058.12-2.928.353-.865.23-1.482.702-1.93 1.415-.447.712-.542 1.63-.542 2.904h3.841v.96H5.44c-1.826 0-3.308 1.596-3.308 3.613 0 1.728 1.332 3.246 3.006 3.52.225.038.454.055.682.055h1.247v-1.493c0-1.094.877-1.98 1.952-1.98h3.057c.932 0 1.68.72 1.68 1.66v1.606h1.193c2.133 0 3.408-1.538 3.408-3.493 0-1.896-1.29-3.572-3.175-3.572h-1.95v-.96h3.754c0-1.219-.09-2.132-.516-2.864-.428-.733-1.09-1.157-1.958-1.385-.87-.229-1.635-.345-2.928-.345h-.047zm-1.07 1.893a.73.73 0 11-.002 1.462.73.73 0 01.002-1.462zm4.12 7.92a.73.73 0 11-.002 1.462.73.73 0 01.002-1.462z"/>
  </svg>
  Python
</Badge>
<Badge className="text-lg py-2 px-4">
  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a10 10 0 00-7.07 17.07L12 22l7.07-2.93A10 10 0 0012 2zm0 2a8 8 0 015.66 13.66L12 20l-5.66-2.34A8 8 0 0112 4zm0 2a6 6 0 00-4.24 10.24L12 18l4.24-1.76A6 6 0 0012 6zm0 2a4 4 0 00-2.83 6.83L12 14l2.83-1.17A4 4 0 0012 8zm0 2a2 2 0 011.41 3.41L12 12l-1.41-.59A2 2 0 0112 10z"/>
  </svg>
  Seguridad en Redes
</Badge>
<Badge className="text-lg py-2 px-4">
  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 017.75 6h-1.5a6.5 6.5 0 10-12.5 0h-1.5A8 8 0 0112 4zm0 14a8 8 0 01-7.75-6h1.5a6.5 6.5 0 0012.5 0h1.5a8 8 0 01-7.75 6zm0-4a2 2 0 110-4 2 2 0 010 4z"/>
  </svg>
  Análisis de Vulnerabilidades
</Badge>


          </div>
        </section>
        {/*Certificados */}
        <Certificados/>

        {/* Contacto */}
        <section id="contact" className="py-20 px-4 relative overflow-hidden">
  {/* Elementos decorativos de fondo */}
  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  <div className="max-w-4xl mx-auto relative">
    <h2 className="text-4xl font-bold mb-2 text-center">Contacto</h2>
    <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">
      Estoy siempre abierto a nuevas oportunidades y colaboraciones
    </p>

    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
      <div className="md:flex">
        {/* Información de contacto */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4">¡Hablemos!</h3>
            <p className="mb-6 text-muted-foreground">
              Me encantaría saber de ti. Puedes contactarme a través de cualquiera de estos medios.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:ype0111@gmail.com"
                className="flex items-center gap-3 group p-2 -ml-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="group-hover:underline">ype0111@gmail.com</span>
              </a>

              <div className="flex items-center gap-3 p-2 -ml-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span>+1 829-332-1311</span>
              </div>

              <div className="flex items-center gap-3 p-2 -ml-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span>Santiago, Republica Dominicana</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-3">Sígueme en redes sociales</p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/Joel190321"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/joeldavid-peña/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mensaje directo */}
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-6">Envíame un mensaje</h3>
          <p className="mb-6 text-muted-foreground">
            Puedes contactarme directamente haciendo clic en el botón de abajo para enviarme un correo electrónico.
          </p>

          <a
            href="mailto:ype0111@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium transition-colors duration-200 border border-slate-200 dark:border-slate-700 w-full md:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-red-500 dark:text-red-400"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Enviar correo</span>
          </a>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-muted-foreground mb-4">O si prefieres, puedes programar una reunión conmigo:</p>
            <a
              href=""
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-slate-200 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-medium transition-colors duration-200 w-full md:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
              <span>Agendar una reunión</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      </main>
    </div>
  )
}