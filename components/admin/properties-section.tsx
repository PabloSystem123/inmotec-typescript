"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Search, Edit, Eye, Trash2, MapPin, Building } from "lucide-react"

interface Property {
  id: number
  title: string
  type: string
  operationType: "sale" | "rent"
  price: string
  bedrooms: number
  bathrooms: number
  garage: boolean
  stratum: number
  area: string
  location: string
  image: string
  status: "available" | "sold" | "rented"
}

const propertyTypes = [
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "aparta-estudio", label: "Aparta Estudio" },
  { value: "finca", label: "Finca" },
  { value: "terreno", label: "Terreno" },
  { value: "local-comercial", label: "Local Comercial" },
]

export function PropertiesSection() {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Casa Moderna en El Poblado",
      type: "casa",
      operationType: "sale",
      price: "$850,000",
      bedrooms: 4,
      bathrooms: 3,
      garage: true,
      stratum: 6,
      area: "280 m²",
      location: "El Poblado, Medellín",
      image: "/property-1.jpg",
      status: "available",
    },
    {
      id: 2,
      title: "Apartamento de Lujo",
      type: "apartamento",
      operationType: "sale",
      price: "$450,000",
      bedrooms: 3,
      bathrooms: 2,
      garage: true,
      stratum: 5,
      area: "150 m²",
      location: "Laureles, Medellín",
      image: "/property-2.jpg",
      status: "available",
    },
    {
      id: 3,
      title: "Penthouse con Vista Panorámica",
      type: "apartamento",
      operationType: "sale",
      price: "$1,200,000",
      bedrooms: 4,
      bathrooms: 4,
      garage: true,
      stratum: 6,
      area: "320 m²",
      location: "Envigado, Antioquia",
      image: "/property-3.jpg",
      status: "sold",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    operationType: "sale" as "sale" | "rent",
    price: "",
    bedrooms: 0,
    bathrooms: 0,
    garage: false,
    stratum: 1,
    area: "",
    location: "",
    image: "",
  })

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateProperty = () => {
    const newProperty: Property = {
      id: properties.length + 1,
      title: formData.title,
      type: formData.type,
      operationType: formData.operationType,
      price: formData.price,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      garage: formData.garage,
      stratum: formData.stratum,
      area: formData.area,
      location: formData.location,
      image: formData.image || "/placeholder.svg",
      status: "available",
    }
    setProperties([...properties, newProperty])
    setIsCreateModalOpen(false)
    resetForm()
  }

  const handleEditProperty = () => {
    if (selectedProperty) {
      setProperties(
        properties.map((property) =>
          property.id === selectedProperty.id
            ? {
                ...property,
                title: formData.title,
                type: formData.type,
                operationType: formData.operationType,
                price: formData.price,
                bedrooms: formData.bedrooms,
                bathrooms: formData.bathrooms,
                garage: formData.garage,
                stratum: formData.stratum,
                area: formData.area,
                location: formData.location,
                image: formData.image || property.image,
              }
            : property,
        ),
      )
      setIsEditModalOpen(false)
      resetForm()
    }
  }

  const handleDeleteProperty = (propertyId: number) => {
    setProperties(properties.filter((property) => property.id !== propertyId))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      type: "",
      operationType: "sale",
      price: "",
      bedrooms: 0,
      bathrooms: 0,
      garage: false,
      stratum: 1,
      area: "",
      location: "",
      image: "",
    })
    setSelectedProperty(null)
  }

  const openEditModal = (property: Property) => {
    setSelectedProperty(property)
    setFormData({
      title: property.title,
      type: property.type,
      operationType: property.operationType,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      garage: property.garage,
      stratum: property.stratum,
      area: property.area,
      location: property.location,
      image: property.image,
    })
    setIsEditModalOpen(true)
  }

  const openViewModal = (property: Property) => {
    setSelectedProperty(property)
    setIsViewModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">✅ Disponible</Badge>
      case "sold":
        return <Badge className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600">💰 Vendido</Badge>
      case "rented":
        return <Badge className="absolute top-3 right-3 bg-purple-500 hover:bg-purple-600">🏠 Arrendado</Badge>
      default:
        return (
          <Badge variant="secondary" className="absolute top-3 right-3">
            ❓ Desconocido
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Inmuebles</h2>
          <p className="text-gray-600">Administra el catálogo de propiedades</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#00457B] to-[#0066cc] hover:from-[#003b69] hover:to-[#0052a3] shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Crear Inmueble
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#00457B] flex items-center">
                <Building className="h-6 w-6 mr-2" />
                Crear Nuevo Inmueble
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Ingresa la información del nuevo inmueble.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                <Label htmlFor="title" className="text-lg font-semibold text-[#00457B] mb-2 block">
                  🏠 Título del Inmueble
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: Casa Moderna en El Poblado"
                  className="border-blue-300 focus:border-[#00457B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <Label htmlFor="type" className="text-sm font-semibold text-green-700 mb-2 block">
                    🏢 Tipo de Inmueble
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="border-green-300 focus:border-green-600">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                  <Label htmlFor="operationType" className="text-sm font-semibold text-purple-700 mb-2 block">
                    💼 Tipo de Operación
                  </Label>
                  <Select
                    value={formData.operationType}
                    onValueChange={(value: "sale" | "rent") => setFormData({ ...formData, operationType: value })}
                  >
                    <SelectTrigger className="border-purple-300 focus:border-purple-600">
                      <SelectValue placeholder="Seleccionar operación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">💰 Venta</SelectItem>
                      <SelectItem value="rent">🏠 Arriendo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200">
                  <Label htmlFor="price" className="text-sm font-semibold text-yellow-700 mb-2 block">
                    💵 Precio
                  </Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$850,000"
                    className="border-yellow-300 focus:border-yellow-600"
                  />
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
                  <Label htmlFor="area" className="text-sm font-semibold text-cyan-700 mb-2 block">
                    📐 Área
                  </Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="280 m²"
                    className="border-cyan-300 focus:border-cyan-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-200">
                  <Label htmlFor="bedrooms" className="text-sm font-semibold text-rose-700 mb-2 block">
                    🛏️ Habitaciones
                  </Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number.parseInt(e.target.value) || 0 })}
                    placeholder="4"
                    className="border-rose-300 focus:border-rose-600"
                  />
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-xl border border-teal-200">
                  <Label htmlFor="bathrooms" className="text-sm font-semibold text-teal-700 mb-2 block">
                    🚿 Baños
                  </Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number.parseInt(e.target.value) || 0 })}
                    placeholder="3"
                    className="border-teal-300 focus:border-teal-600"
                  />
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
                  <Label htmlFor="stratum" className="text-sm font-semibold text-indigo-700 mb-2 block">
                    📍 Estrato
                  </Label>
                  <Input
                    id="stratum"
                    type="number"
                    value={formData.stratum}
                    onChange={(e) => setFormData({ ...formData, stratum: Number.parseInt(e.target.value) || 1 })}
                    placeholder="6"
                    min="1"
                    max="6"
                    className="border-indigo-300 focus:border-indigo-600"
                  />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                <Label htmlFor="location" className="text-sm font-semibold text-orange-700 mb-2 block">
                  🗺️ Ubicación
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="El Poblado, Medellín"
                  className="border-orange-300 focus:border-orange-600"
                />
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="garage"
                    checked={formData.garage}
                    onChange={(e) => setFormData({ ...formData, garage: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#00457B] focus:ring-[#00457B]"
                  />
                  <Label htmlFor="garage" className="text-lg font-semibold text-gray-700 flex items-center">
                    🚗 Tiene Garaje
                  </Label>
                </div>
                <Label htmlFor="image" className="text-sm font-semibold text-gray-700 mb-2 block">
                  📸 URL de la Imagen
                </Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="border-gray-300 focus:border-gray-600"
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)} className="mr-2">
                Cancelar
              </Button>
              <Button
                onClick={handleCreateProperty}
                className="bg-gradient-to-r from-[#00457B] to-[#0066cc] hover:from-[#003b69] hover:to-[#0052a3]"
              >
                Crear Inmueble
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar inmuebles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300 focus:border-[#00457B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
          >
            <div className="relative h-56">
              <Image
                src={property.image || "/placeholder.svg?height=224&width=400"}
                alt={property.title}
                fill
                className="object-cover"
              />
              {getStatusBadge(property.status)}
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#00457B] to-[#0066cc] text-white">
                {property.operationType === "sale" ? "💰 Venta" : "🏠 Arriendo"}
              </Badge>
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">{property.title}</CardTitle>
                <p className="text-xl font-bold text-[#00457B] ml-2">{property.price}</p>
              </div>
              <div className="flex items-center text-gray-600 text-sm mt-2">
                <MapPin className="h-4 w-4 mr-2 text-[#00457B]" />
                <span className="font-medium">{property.location}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🏠</span>
                  <span className="font-medium text-gray-700">{property.area}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-2">🛏️</span>
                  <span className="font-medium text-gray-700">{property.bedrooms} Hab.</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg mr-2">🚿</span>
                  <span className="font-medium text-gray-700">{property.bathrooms} Baños</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {property.garage && (
                  <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    <span className="text-base mr-2">🚗</span>
                    <span className="font-medium">Con Garaje</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  <span className="text-base mr-2">📍</span>
                  <span className="font-medium">Estrato {property.stratum}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50 border-t">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openViewModal(property)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditModal(property)}
                  className="text-green-600 hover:text-green-800 hover:bg-green-100"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-100">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente el inmueble "{property.title}"
                        del sistema.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteProperty(property.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#00457B] flex items-center">
              <Edit className="h-6 w-6 mr-2" />
              Editar Inmueble
            </DialogTitle>
            <DialogDescription className="text-gray-600">Modifica la información del inmueble.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <Label htmlFor="editTitle" className="text-lg font-semibold text-[#00457B] mb-2 block">
                🏠 Título del Inmueble
              </Label>
              <Input
                id="editTitle"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Casa Moderna en El Poblado"
                className="border-blue-300 focus:border-[#00457B]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <Label htmlFor="editType" className="text-sm font-semibold text-green-700 mb-2 block">
                  🏢 Tipo de Inmueble
                </Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="border-green-300 focus:border-green-600">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
                <Label htmlFor="editOperationType" className="text-sm font-semibold text-purple-700 mb-2 block">
                  💼 Tipo de Operación
                </Label>
                <Select
                  value={formData.operationType}
                  onValueChange={(value: "sale" | "rent") => setFormData({ ...formData, operationType: value })}
                >
                  <SelectTrigger className="border-purple-300 focus:border-purple-600">
                    <SelectValue placeholder="Seleccionar operación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">💰 Venta</SelectItem>
                    <SelectItem value="rent">🏠 Arriendo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200">
                <Label htmlFor="editPrice" className="text-sm font-semibold text-yellow-700 mb-2 block">
                  💵 Precio
                </Label>
                <Input
                  id="editPrice"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="$850,000"
                  className="border-yellow-300 focus:border-yellow-600"
                />
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200">
                <Label htmlFor="editArea" className="text-sm font-semibold text-cyan-700 mb-2 block">
                  📐 Área
                </Label>
                <Input
                  id="editArea"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="280 m²"
                  className="border-cyan-300 focus:border-cyan-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-200">
                <Label htmlFor="editBedrooms" className="text-sm font-semibold text-rose-700 mb-2 block">
                  🛏️ Habitaciones
                </Label>
                <Input
                  id="editBedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number.parseInt(e.target.value) || 0 })}
                  placeholder="4"
                  className="border-rose-300 focus:border-rose-600"
                />
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-xl border border-teal-200">
                <Label htmlFor="editBathrooms" className="text-sm font-semibold text-teal-700 mb-2 block">
                  🚿 Baños
                </Label>
                <Input
                  id="editBathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number.parseInt(e.target.value) || 0 })}
                  placeholder="3"
                  className="border-teal-300 focus:border-teal-600"
                />
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
                <Label htmlFor="editStratum" className="text-sm font-semibold text-indigo-700 mb-2 block">
                  📍 Estrato
                </Label>
                <Input
                  id="editStratum"
                  type="number"
                  value={formData.stratum}
                  onChange={(e) => setFormData({ ...formData, stratum: Number.parseInt(e.target.value) || 1 })}
                  placeholder="6"
                  min="1"
                  max="6"
                  className="border-indigo-300 focus:border-indigo-600"
                />
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
              <Label htmlFor="editLocation" className="text-sm font-semibold text-orange-700 mb-2 block">
                🗺️ Ubicación
              </Label>
              <Input
                id="editLocation"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="El Poblado, Medellín"
                className="border-orange-300 focus:border-orange-600"
              />
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  id="editGarage"
                  checked={formData.garage}
                  onChange={(e) => setFormData({ ...formData, garage: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-[#00457B] focus:ring-[#00457B]"
                />
                <Label htmlFor="editGarage" className="text-lg font-semibold text-gray-700 flex items-center">
                  🚗 Tiene Garaje
                </Label>
              </div>
              <Label htmlFor="editImage" className="text-sm font-semibold text-gray-700 mb-2 block">
                📸 URL de la Imagen
              </Label>
              <Input
                id="editImage"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="border-gray-300 focus:border-gray-600"
              />
            </div>
          </div>
          <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="mr-2">
              Cancelar
            </Button>
            <Button
              onClick={handleEditProperty}
              className="bg-gradient-to-r from-[#00457B] to-[#0066cc] hover:from-[#003b69] hover:to-[#0052a3]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#00457B] flex items-center">
              <Building className="h-6 w-6 mr-2" />
              Detalles del Inmueble
            </DialogTitle>
            <DialogDescription className="text-gray-600">Información completa del inmueble.</DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-8">
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={selectedProperty.image || "/placeholder.svg?height=320&width=600"}
                  alt={selectedProperty.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{selectedProperty.title}</h3>
                  <p className="text-lg">{selectedProperty.price}</p>
                </div>
                <div className="absolute top-4 right-4">{getStatusBadge(selectedProperty.status)}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center mb-2">
                    🏢 Tipo de Inmueble
                  </Label>
                  <p className="text-xl font-bold text-[#00457B] capitalize">{selectedProperty.type}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                  <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center mb-2">
                    💼 Tipo de Operación
                  </Label>
                  <p className="text-xl font-bold text-purple-700">
                    {selectedProperty.operationType === "sale" ? "💰 Venta" : "🏠 Arriendo"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 text-center">
                  <div className="text-3xl mb-2">🏠</div>
                  <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Área</Label>
                  <p className="text-xl font-bold text-green-700">{selectedProperty.area}</p>
                </div>
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-200 text-center">
                  <div className="text-3xl mb-2">🛏️</div>
                  <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Habitaciones</Label>
                  <p className="text-xl font-bold text-rose-700">{selectedProperty.bedrooms}</p>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-200 text-center">
                  <div className="text-3xl mb-2">🚿</div>
                  <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Baños</Label>
                  <p className="text-xl font-bold text-teal-700">{selectedProperty.bathrooms}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center mb-2">
                  🗺️ Ubicación
                </Label>
                <p className="text-xl font-bold text-orange-700">{selectedProperty.location}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200">
                  <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center mb-2">
                    🚗 Garaje
                  </Label>
                  <p className="text-xl font-bold text-gray-700">
                    {selectedProperty.garage ? "✅ Sí tiene" : "❌ No tiene"}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                  <Label className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center mb-2">
                    📍 Estrato
                  </Label>
                  <p className="text-xl font-bold text-indigo-700">Estrato {selectedProperty.stratum}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)} className="w-full md:w-auto">
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
