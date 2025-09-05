import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion"
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

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c4a7b] via-[#1e40af] to-[#3b82f6]" />
        <div className="absolute inset-0 bg-black/20" />
        <img src="/services-hero.jpg" alt="Servicios" className="w-full h-full object-cover mix-blend-overlay opacity-30" />
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
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-6">Servicios Inmobiliarios Especializados</h2>
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
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#0c4a7b] to-[#1e40af] hover:from-[#0a3d68] hover:to-[#1e3a8a] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link to="/contactanos">Solicitar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                <Link to="/contactanos">
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
                <Link to="/inmuebles">
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