import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Home,
  Key,
  Building2,
  TrendingUp,
  CheckCircle,
  Star,
  Users,
  Calculator,
  Shield,
  Handshake,
  Clock,
  Award,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

export default function ServiciosPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c4a7b] via-[#1e40af] to-[#3b82f6]" />
        <div className="absolute inset-0 bg-black/20" />
        <Image src="/services-hero.jpg" alt="Servicios" fill className="object-cover mix-blend-overlay opacity-30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Nuestros Servicios
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Soluciones inmobiliarias integrales para todas tus necesidades
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-lg bg-white/20 text-white border-white/30">
                <Star className="w-4 h-4 mr-2" />
                Más de 15 años de experiencia
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-lg bg-white/20 text-white border-white/30">
                <Users className="w-4 h-4 mr-2" />
                +500 clientes satisfechos
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0c4a7b] mb-6">Servicios Inmobiliarios Especializados</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos una amplia gama de servicios diseñados para satisfacer todas tus necesidades en el mercado
              inmobiliario con la más alta calidad y profesionalismo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {mainServices.map((service, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50"
              >
                <CardHeader className="pb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0c4a7b] to-[#1e40af] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white">
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-[#0c4a7b] mb-3 group-hover:text-[#1e40af] transition-colors">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#0c4a7b] to-[#1e40af] hover:from-[#0a3d68] hover:to-[#1e3a8a] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href="/contactanos">Solicitar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-3xl font-bold text-[#0c4a7b] mb-8 text-center">Servicios Adicionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0c4a7b] to-[#1e40af] flex items-center justify-center mx-auto mb-4">
                    {service.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-[#0c4a7b] to-[#1e40af] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">¿Cómo Trabajamos?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Nuestro proceso está diseñado para brindarte una experiencia inmobiliaria sin complicaciones, con
              resultados garantizados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < workProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-300/30 transform translate-x-4" />
                )}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white text-[#0c4a7b] flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                    {index + 1}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-blue-100 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0c4a7b] mb-6">¿Por Qué Elegirnos?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos líderes en el mercado inmobiliario con un compromiso inquebrantable hacia la excelencia y la
              satisfacción del cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0c4a7b] to-[#1e40af] flex items-center justify-center mx-auto mb-6">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0c4a7b] mb-4">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0c4a7b] mb-6">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Respuestas a las preguntas más comunes sobre nuestros servicios inmobiliarios.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-2xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-[#0c4a7b] hover:text-[#1e40af] py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0c4a7b] via-[#1e40af] to-[#3b82f6] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para Comenzar?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Nuestro equipo de expertos está listo para ayudarte con cualquiera de nuestros servicios inmobiliarios.
              ¡Contáctanos hoy mismo!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center justify-center space-x-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <Phone className="w-6 h-6" />
                <span className="font-semibold">+57 300 123 4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <Mail className="w-6 h-6" />
                <span className="font-semibold">info@matriz.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <MapPin className="w-6 h-6" />
                <span className="font-semibold">Bogotá, Colombia</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#0c4a7b] hover:bg-gray-100 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contactanos">
                  <Mail className="w-5 h-5 mr-2" />
                  Contáctanos Ahora
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0c4a7b] font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
              >
                <Link href="/inmuebles">
                  <Building2 className="w-5 h-5 mr-2" />
                  Ver Propiedades
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Data
const mainServices = [
  {
    title: "Compra y Venta",
    description:
      "Asesoramiento completo en el proceso de compra y venta de propiedades residenciales y comerciales con garantía de resultados.",
    icon: <Home className="h-8 w-8 text-white" />,
    badge: "Popular",
    duration: "2-3 meses",
    features: [
      "Valoración profesional gratuita",
      "Marketing digital especializado",
      "Negociación experta",
      "Acompañamiento legal completo",
      "Asesoría financiera incluida",
    ],
  },
  {
    title: "Gestión de Alquileres",
    description:
      "Administración integral de propiedades en alquiler, desde la búsqueda de inquilinos hasta el mantenimiento completo.",
    icon: <Key className="h-8 w-8 text-white" />,
    badge: "Rentable",
    duration: "Servicio continuo",
    features: [
      "Selección rigurosa de inquilinos",
      "Contratos legalmente blindados",
      "Cobro garantizado de rentas",
      "Mantenimiento 24/7",
      "Reportes mensuales detallados",
    ],
  },
  {
    title: "Tasaciones Profesionales",
    description: "Valoración técnica y comercial de inmuebles con metodología certificada y respaldo legal completo.",
    icon: <Calculator className="h-8 w-8 text-white" />,
    badge: "Certificado",
    duration: "3-5 días",
    features: [
      "Análisis comparativo de mercado",
      "Inspección técnica detallada",
      "Informe certificado",
      "Recomendaciones de mejora",
      "Validez legal garantizada",
    ],
  },
  {
    title: "Asesoría Legal",
    description:
      "Acompañamiento jurídico especializado en derecho inmobiliario para transacciones seguras y sin riesgos.",
    icon: <Shield className="h-8 w-8 text-white" />,
    badge: "Seguro",
    duration: "Todo el proceso",
    features: [
      "Revisión exhaustiva de documentos",
      "Redacción de contratos",
      "Gestión notarial completa",
      "Asesoría fiscal especializada",
      "Resolución de conflictos",
    ],
  },
  {
    title: "Inversiones Inmobiliarias",
    description:
      "Consultoría estratégica para inversores que buscan maximizar rentabilidad y minimizar riesgos en el mercado.",
    icon: <TrendingUp className="h-8 w-8 text-white" />,
    badge: "Premium",
    duration: "Asesoría continua",
    features: [
      "Análisis de oportunidades",
      "Proyecciones de rentabilidad",
      "Gestión de portafolios",
      "Estrategias de diversificación",
      "Seguimiento de inversiones",
    ],
  },
  {
    title: "Desarrollo de Proyectos",
    description:
      "Acompañamiento integral en proyectos de construcción y desarrollo inmobiliario desde la conceptualización hasta la entrega.",
    icon: <Building2 className="h-8 w-8 text-white" />,
    badge: "Nuevo",
    duration: "6-24 meses",
    features: [
      "Estudios de factibilidad",
      "Gestión de licencias",
      "Supervisión de construcción",
      "Marketing de preventa",
      "Entrega y postventa",
    ],
  },
]

const additionalServices = [
  {
    title: "Fotografía Profesional",
    description: "Sesiones fotográficas especializadas para inmuebles",
    icon: <Award className="h-6 w-6 text-white" />,
  },
  {
    title: "Tours Virtuales",
    description: "Recorridos 360° interactivos de alta calidad",
    icon: <Users className="h-6 w-6 text-white" />,
  },
  {
    title: "Home Staging",
    description: "Decoración y ambientación para venta rápida",
    icon: <Star className="h-6 w-6 text-white" />,
  },
  {
    title: "Seguros Inmobiliarios",
    description: "Protección integral para tu propiedad",
    icon: <Shield className="h-6 w-6 text-white" />,
  },
]

const workProcess = [
  {
    title: "Consulta Inicial",
    description:
      "Analizamos tus necesidades específicas y diseñamos una estrategia personalizada para alcanzar tus objetivos inmobiliarios.",
  },
  {
    title: "Planificación Estratégica",
    description:
      "Desarrollamos un plan de acción detallado con cronogramas, presupuestos y métricas de éxito claramente definidas.",
  },
  {
    title: "Ejecución Profesional",
    description:
      "Implementamos el plan con nuestro equipo especializado, manteniéndote informado en tiempo real de cada avance.",
  },
  {
    title: "Entrega y Seguimiento",
    description:
      "Garantizamos resultados exitosos y brindamos soporte continuo para asegurar tu completa satisfacción.",
  },
]

const whyChooseUs = [
  {
    title: "Experiencia Comprobada",
    description:
      "Más de 15 años en el mercado inmobiliario con cientos de transacciones exitosas y clientes satisfechos.",
    icon: <Award className="h-8 w-8 text-white" />,
  },
  {
    title: "Equipo Especializado",
    description: "Profesionales certificados en cada área: agentes, abogados, arquitectos y especialistas financieros.",
    icon: <Users className="h-8 w-8 text-white" />,
  },
  {
    title: "Tecnología Avanzada",
    description:
      "Utilizamos las últimas herramientas digitales para marketing, análisis de mercado y gestión de procesos.",
    icon: <TrendingUp className="h-8 w-8 text-white" />,
  },
  {
    title: "Atención Personalizada",
    description: "Cada cliente recibe un servicio único y personalizado, adaptado a sus necesidades específicas.",
    icon: <Handshake className="h-8 w-8 text-white" />,
  },
  {
    title: "Resultados Garantizados",
    description: "Respaldamos nuestro trabajo con garantías reales y compromisos de resultados medibles.",
    icon: <CheckCircle className="h-8 w-8 text-white" />,
  },
  {
    title: "Soporte 24/7",
    description: "Estamos disponibles cuando nos necesites, con atención inmediata para consultas y emergencias.",
    icon: <Clock className="h-8 w-8 text-white" />,
  },
]

const faqs = [
  {
    question: "¿Cuánto tiempo toma vender una propiedad?",
    answer:
      "El tiempo de venta varía según factores como ubicación, precio y condiciones del mercado. En promedio, una propiedad bien valorada se vende en 2-3 meses. Nuestro equipo utiliza estrategias de marketing digital avanzadas para acelerar el proceso y garantizar la mejor oferta posible.",
  },
  {
    question: "¿Qué documentos necesito para vender mi propiedad?",
    answer:
      "Necesitarás: título de propiedad, certificado de libertad y tradición, paz y salvo de impuestos y servicios, certificado de no afectación, planos actualizados y licencias de construcción si aplica. Nuestro equipo legal te ayudará a recopilar y verificar toda la documentación necesaria.",
  },
  {
    question: "¿Cómo determinan el precio de alquiler de mi propiedad?",
    answer:
      "Realizamos un análisis comparativo de mercado considerando ubicación, tamaño, estado, amenidades y demanda local. Utilizamos herramientas de análisis avanzadas y nuestra experiencia para establecer un precio competitivo que maximice tu rentabilidad y asegure ocupación rápida.",
  },
  {
    question: "¿Qué incluye el servicio de administración de propiedades?",
    answer:
      "Incluye: selección rigurosa de inquilinos, gestión de contratos, cobro de rentas, mantenimiento preventivo y correctivo, inspecciones periódicas, atención de emergencias 24/7, gestión de pagos de servicios e impuestos, y reportes financieros mensuales detallados.",
  },
  {
    question: "¿Ofrecen asesoramiento para inversores extranjeros?",
    answer:
      "Sí, tenemos un servicio especializado que incluye: asesoramiento legal sobre regulaciones locales, gestión de trámites migratorios relacionados, asesoría fiscal internacional, apertura de cuentas bancarias, y gestión integral de inversiones a distancia con reportes regulares.",
  },
  {
    question: "¿Cuáles son los costos de sus servicios?",
    answer:
      "Nuestras tarifas son competitivas y transparentes. Para ventas trabajamos con un porcentaje sobre el valor final. Para alquileres y administración, cobramos un porcentaje del canon mensual. Ofrecemos cotizaciones personalizadas sin compromiso. ¡Contáctanos para conocer nuestras tarifas especiales!",
  },
]
