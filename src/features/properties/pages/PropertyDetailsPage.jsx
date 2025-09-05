import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion"
import { AppointmentModal } from "../components/AppointmentModal"
import {
  Building2,
  Calendar,
  Car,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Heart,
  Home,
  Info,
  Landmark,
  Layers,
  MapPin,
  Maximize2,
  MessageSquare,
  Phone,
  Share2,
  ShowerHead,
  Star,
  ThumbsUp,
  Trees,
  Tv,
  Wifi,
} from "lucide-react"

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  // Simulamos obtener los datos de la propiedad basados en el ID
  const propertyId = parseInt(id)
  const property = properties.find((p) => p.id === propertyId) || properties[0]

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-[#00457B]">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/inmuebles" className="hover:text-[#00457B]">
              Inmuebles
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-900 font-medium">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Galería de imágenes */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Imagen principal y carrusel */}
            <div className="space-y-4">
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <img
                  src={property.mainImage || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/80 hover:bg-white">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-[#00457B]">{property.status}</Badge>
              </div>

              <Carousel className="w-full">
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index} className="basis-1/4 md:basis-1/5">
                      <div className="relative h-24 rounded-lg overflow-hidden cursor-pointer">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${property.title} - Imagen ${index + 1}`}
                          className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>

            {/* Información básica */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                    <div className="flex items-center mt-2 text-gray-500">
                      <MapPin className="h-5 w-5 mr-1 text-[#00457B]" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#00457B]">{property.price}</div>
                    {property.pricePerM2 && <div className="text-sm text-gray-500">{property.pricePerM2} / m²</div>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="flex flex-col items-center text-center p-3">
                  <Home className="h-6 w-6 text-[#00457B] mb-2" />
                  <span className="text-sm text-gray-500">Área</span>
                  <span className="font-bold">{property.area}</span>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <Building2 className="h-6 w-6 text-[#00457B] mb-2" />
                  <span className="text-sm text-gray-500">Habitaciones</span>
                  <span className="font-bold">{property.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <ShowerHead className="h-6 w-6 text-[#00457B] mb-2" />
                  <span className="text-sm text-gray-500">Baños</span>
                  <span className="font-bold">{property.bathrooms}</span>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <Car className="h-6 w-6 text-[#00457B] mb-2" />
                  <span className="text-sm text-gray-500">Estacionamientos</span>
                  <span className="font-bold">{property.parking}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#00457B]/10 flex items-center justify-center mr-3">
                    <Info className="h-5 w-5 text-[#00457B]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Código de la propiedad</h3>
                    <p className="text-gray-500">{property.code}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#00457B]/10 flex items-center justify-center mr-3">
                    <Landmark className="h-5 w-5 text-[#00457B]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tipo de propiedad</h3>
                    <p className="text-gray-500">{property.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#00457B]/10 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-[#00457B]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Antigüedad</h3>
                    <p className="text-gray-500">{property.age}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="flex-1 h-12 bg-[#00457B] hover:bg-[#003b69]">
                  <Phone className="h-5 w-5 mr-2" /> Contactar agente
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 border-[#00457B] text-[#00457B] hover:bg-[#00457B]/10"
                  onClick={() => setIsAppointmentModalOpen(true)}
                >
                  <Calendar className="h-5 w-5 mr-2" /> Agendar visita
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal con tabs */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs de información */}
            <Tabs defaultValue="descripcion" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-12 rounded-xl bg-white">
                <TabsTrigger value="descripcion" className="rounded-lg">
                  Descripción
                </TabsTrigger>
                <TabsTrigger value="caracteristicas" className="rounded-lg">
                  Características
                </TabsTrigger>
                <TabsTrigger value="ubicacion" className="rounded-lg">
                  Ubicación
                </TabsTrigger>
                <TabsTrigger value="video" className="rounded-lg">
                  Video
                </TabsTrigger>
              </TabsList>

              {/* Descripción */}
              <TabsContent value="descripcion" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Descripción de la propiedad</h2>
                    <div className="space-y-4 text-gray-700">
                      <p>{property.description}</p>
                      <p>
                        Esta espectacular propiedad se encuentra en una de las zonas más exclusivas y seguras de la
                        ciudad, con fácil acceso a centros comerciales, colegios, restaurantes y parques.
                      </p>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-bold mb-3">Destacados de la propiedad</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {property.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Características */}
              <TabsContent value="caracteristicas" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Características y amenidades</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-bold text-[#00457B] mb-3">Interiores</h3>
                        <div className="space-y-3">
                          {property.features.interior.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-[#00457B] mb-3">Exteriores</h3>
                        <div className="space-y-3">
                          {property.features.exterior.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Ubicación */}
              <TabsContent value="ubicacion" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Ubicación</h2>

                    <div className="relative h-[400px] rounded-xl overflow-hidden mb-6">
                      <img src="/property-map.png" alt="Mapa de ubicación" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button className="bg-[#00457B] hover:bg-[#003b69]">
                          <ExternalLink className="h-5 w-5 mr-2" /> Ver en Google Maps
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Video */}
              <TabsContent value="video" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Video y tour virtual</h2>

                    <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                      <img
                        src="/property-video-thumbnail.png"
                        alt="Video de la propiedad"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-[#00457B] flex items-center justify-center cursor-pointer hover:bg-[#003b69] transition-colors">
                          <div className="h-0 w-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button className="bg-[#00457B] hover:bg-[#003b69]">
                        <Maximize2 className="h-5 w-5 mr-2" /> Ver tour virtual 360°
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Columna lateral */}
          <div className="space-y-6">
            {/* Agente inmobiliario */}
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/avatar-agent-1.jpg" alt="Ana Rodríguez" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">Ana Rodríguez</h3>
                  <p className="text-[#00457B]">Agente Inmobiliario Senior</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm text-gray-500">(28 reseñas)</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center">
                    <Phone className="h-5 w-5 text-[#00457B] mr-2" />
                    <span>+123 456 7890</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-[#00457B] mr-2" />
                    <span>ana.rodriguez@matriz.com</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-[#00457B] hover:bg-[#003b69]">
                    <Phone className="h-5 w-5 mr-2" /> Llamar ahora
                  </Button>
                  <Button variant="outline" className="w-full border-[#00457B] text-[#00457B] hover:bg-[#00457B]/10">
                    <MessageSquare className="h-5 w-5 mr-2" /> Enviar mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Formulario de contacto */}
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">¿Interesado en esta propiedad?</h3>
                <p className="text-gray-600 mb-4">
                  Complete el formulario y nos pondremos en contacto con usted lo antes posible.
                </p>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00457B] focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00457B] focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00457B] focus:border-transparent"
                      placeholder="Tu número de teléfono"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00457B] focus:border-transparent"
                      placeholder="Me interesa esta propiedad y quisiera obtener más información..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-[#00457B] hover:bg-[#003b69]">
                    Enviar solicitud
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modal de agendar cita */}
      <AppointmentModal 
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        property={property}
      />
    </main>
  )
}

// Datos de ejemplo
const properties = [
  {
    id: 1,
    title: "Casa Moderna en El Poblado",
    price: "$850,000",
    pricePerM2: "$3,035",
    location: "El Poblado, Medellín",
    area: "280 m²",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    status: "Venta",
    type: "Casa",
    code: "PROP-1234",
    age: "5 años",
    mainImage: "/property-1.jpg",
    images: [
      "/property-1.jpg",
      "/property-2.jpg",
      "/property-3.jpg",
      "/property-4.jpg",
      "/property-5.jpg",
      "/property-6.jpg",
    ],
    description:
      "Espectacular casa moderna ubicada en el exclusivo sector de El Poblado, con acabados de lujo y amplios espacios. Perfecta para familias que buscan comodidad y elegancia en una de las mejores zonas de la ciudad.",
    highlights: [
      "Diseño arquitectónico moderno",
      "Amplios espacios con excelente iluminación natural",
      "Zona social integrada con vista panorámica",
      "Cocina tipo isla completamente equipada",
      "Habitación principal con vestier y baño privado",
      "Terraza con jacuzzi y zona BBQ",
    ],
    features: {
      interior: [
        "Cocina integral con electrodomésticos de alta gama",
        "Pisos en porcelanato importado",
        "Ventanales de piso a techo",
        "Sistema de domótica",
        "Calentador de agua a gas",
        "Vestier en habitación principal",
        "Estudio/biblioteca",
        "Sala de entretenimiento",
      ],
      exterior: [
        "Terraza con vista panorámica",
        "Jardín privado",
        "Zona BBQ",
        "Jacuzzi exterior",
        "Parqueadero para 2 vehículos",
        "Depósito",
      ],
    },
  },
]