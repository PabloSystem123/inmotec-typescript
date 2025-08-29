"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Building2,
  Users,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  DollarSign,
  Clock,
  Search,
  Bell,
  Settings,
  LogOut,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "¡Bienvenido!",
        description: "Dashboard cargado correctamente.",
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  // Datos simplificados
  const stats = [
    {
      title: "Propiedades",
      value: "24",
      change: "+12%",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "up",
    },
    {
      title: "Clientes",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "up",
    },
    {
      title: "Ventas",
      value: "$2.4M",
      change: "+23%",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "up",
    },
    {
      title: "Citas",
      value: "18",
      change: "+5%",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "up",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "success",
      title: "Nueva propiedad agregada",
      description: "Casa en Las Condes - $450,000",
      time: "Hace 2 horas",
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "warning",
      title: "Cita pendiente de confirmación",
      description: "Cliente: María González - Mañana 10:00 AM",
      time: "Hace 4 horas",
      icon: AlertTriangle,
    },
    {
      id: 3,
      type: "info",
      title: "Nuevo mensaje recibido",
      description: "Carlos Rodríguez está interesado en una propiedad",
      time: "Hace 6 horas",
      icon: Info,
    },
  ]

  const quickActions = [
    {
      title: "Nueva Propiedad",
      description: "Agregar una nueva propiedad al catálogo",
      icon: Building2,
      action: () => toast({ title: "Próximamente", description: "Función en desarrollo" }),
    },
    {
      title: "Nuevo Cliente",
      description: "Registrar un nuevo cliente",
      icon: Users,
      action: () => toast({ title: "Próximamente", description: "Función en desarrollo" }),
    },
    {
      title: "Programar Cita",
      description: "Agendar una visita o reunión",
      icon: Calendar,
      action: () => toast({ title: "Próximamente", description: "Función en desarrollo" }),
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-12 w-12 rounded-xl" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header simplificado */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Bienvenido de vuelta, aquí tienes un resumen de tu actividad</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar-user.jpg" alt="Usuario" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">Juan Pérez</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Alertas importantes */}
            <div className="space-y-3">
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Tienes 3 citas pendientes de confirmación para esta semana.{" "}
                  <Button variant="link" className="p-0 h-auto text-yellow-800 underline">
                    Ver citas
                  </Button>
                </AlertDescription>
              </Alert>
            </div>

            {/* Stats Cards - Simplificadas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-1 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {stat.change}
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contenido principal simplificado */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Acciones rápidas */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-4 hover:bg-gray-50"
                      onClick={action.action}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#00457B]/10 rounded-lg">
                          <action.icon className="h-5 w-5 text-[#00457B]" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{action.title}</p>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Actividad reciente */}
              <Card className="lg:col-span-2 border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="ghost" className="w-full text-[#00457B]">
                      Ver toda la actividad
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resumen de contactos recientes */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Contactos Recientes</CardTitle>
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "María González", email: "maria@email.com", phone: "+56 9 1234 5678", status: "Activo" },
                    {
                      name: "Carlos Rodríguez",
                      email: "carlos@email.com",
                      phone: "+56 9 8765 4321",
                      status: "Seguimiento",
                    },
                    { name: "Ana Silva", email: "ana@email.com", phone: "+56 9 5555 1234", status: "Cerrado" },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-[#00457B] rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          <Badge
                            className={
                              contact.status === "Activo"
                                ? "bg-green-100 text-green-800"
                                : contact.status === "Seguimiento"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {contact.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-1" />
                          Llamar
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
