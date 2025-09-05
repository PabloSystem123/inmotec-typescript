import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Badge } from "@/shared/components/ui/badge"
import { Calendar, MapPin, X, Info } from "lucide-react"

export function AppointmentModal({ isOpen, onClose, property }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  // Generar calendario para junio 2025
  const generateCalendar = () => {
    const daysInMonth = 30
    const firstDay = 0 // Domingo
    const days = []
    
    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const handleDateSelect = (day) => {
    if (day) {
      setSelectedDate(day)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la cita
    console.log("Cita agendada:", { ...formData, date: selectedDate, property: property.title })
    onClose()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-white rounded-lg">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-[#00457B] flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Agendar Visita a la Propiedad
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {/* Propiedad seleccionada */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#00457B] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-[#00457B] font-medium">Propiedad seleccionada</p>
                  <h3 className="font-semibold text-gray-900">{property?.title || "Casa Moderna en Zona Exclusiva"}</h3>
                  <p className="text-sm text-gray-600">{property?.location || "Poblado, Medellín"}</p>
                  <p className="text-lg font-bold text-[#00457B] mt-1">{property?.price || "$850,000,000"}</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre completo"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+57 300 123 4567"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo electrónico *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                  className="mt-1"
                  required
                />
              </div>

              {/* Calendario */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Selecciona fecha y hora
                </Label>
                
                <div className="border rounded-lg p-4">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold">junio de 2025</h4>
                  </div>
                  
                  {/* Días de la semana */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                      <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Días del mes */}
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendar().map((day, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleDateSelect(day)}
                        disabled={!day || day < 11}
                        className={`
                          h-8 w-8 text-sm rounded flex items-center justify-center transition-colors
                          ${!day ? 'invisible' : ''}
                          ${day && day < 11 ? 'text-gray-300 cursor-not-allowed' : ''}
                          ${day && day >= 11 && day !== selectedDate ? 'hover:bg-gray-100 text-gray-700' : ''}
                          ${day === selectedDate ? 'bg-[#00457B] text-white' : ''}
                          ${day === 11 ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
                        `}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  
                  {/* Leyenda */}
                  <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#00457B] rounded mr-1"></div>
                      <span>Seleccionado</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-100 rounded mr-1"></div>
                      <span>Hoy</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
                      <span>No disponible</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensaje adicional */}
              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  Mensaje adicional (opcional)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="¿Hay algo específico que te gustaría saber sobre la propiedad?"
                  className="mt-1"
                  rows={3}
                />
              </div>

              {/* Información importante */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Información importante</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Te contactaremos en las próximas 2 horas para confirmar</li>
                      <li>• Duración aproximada: 30-45 minutos</li>
                      <li>• Puedes reagendar con 24 horas de anticipación</li>
                      <li>• Para visitas presenciales, lleva identificación</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-[#00457B] hover:bg-[#003b69]"
                  disabled={!selectedDate || !formData.name || !formData.phone || !formData.email}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Confirmar Cita
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}