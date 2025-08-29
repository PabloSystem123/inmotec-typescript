"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { RolesSection } from "@/components/admin/roles-section"
import { EmployeesSection } from "@/components/admin/employees-section"
import { PropertiesSection } from "@/components/admin/properties-section"
import { Bell, Building, Calendar, Clock, MessageSquare, TrendingUp, Users, Settings, BarChart3 } from "lucide-react"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/matriz-logo.png" alt="Matriz Inmobiliaria" width={120} height={40} />
              </Link>
              <Badge variant="outline" className="text-[#00457B] border-[#00457B]">
                Panel Administrativo
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#00457B]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="relative">
                <MessageSquare className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#00457B]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  5
                </span>
              </div>
              <div className="h-8 w-px bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/admin-avatar.png" alt="Administrador" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Admin Principal</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
                <p className="text-gray-500">Gestiona todos los aspectos de Matriz Inmobiliaria</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Button className="bg-[#00457B] hover:bg-[#003b69]">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver reportes
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 md:w-[500px]">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
                <TabsTrigger value="employees">Empleados</TabsTrigger>
                <TabsTrigger value="properties">Inmuebles</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Propiedades</p>
                          <h3 className="text-2xl font-bold mt-1">156</h3>
                        </div>
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building className="h-6 w-6 text-[#00457B]" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          12% más que el mes pasado
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Empleados Activos</p>
                          <h3 className="text-2xl font-bold mt-1">24</h3>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />2 nuevos esta semana
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Ventas del Mes</p>
                          <h3 className="text-2xl font-bold mt-1">18</h3>
                        </div>
                        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-purple-500" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-green-600 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          8% más que el mes anterior
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Citas Programadas</p>
                          <h3 className="text-2xl font-bold mt-1">42</h3>
                        </div>
                        <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-amber-500" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-amber-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          15 para esta semana
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="col-span-3">
                  <Card className="border-none shadow-md">
                    <CardHeader>
                      <CardTitle>Actividad Reciente</CardTitle>
                      <CardDescription>Últimas acciones en el sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <div key={index} className="flex items-start">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.iconBg}`}
                            >
                              {activity.icon}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-gray-500">{activity.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Roles Tab Content */}
            {activeTab === "roles" && <RolesSection />}

            {/* Employees Tab Content */}
            {activeTab === "employees" && <EmployeesSection />}

            {/* Properties Tab Content */}
            {activeTab === "properties" && <PropertiesSection />}
          </div>
        </main>
      </div>
    </div>
  )
}

// Data
const recentActivities = [
  {
    icon: <Building className="h-5 w-5 text-blue-500" />,
    iconBg: "bg-blue-100",
    title: "Nueva propiedad agregada",
    description: "Casa Moderna en El Poblado - $850,000",
    time: "Hace 2 horas",
  },
  {
    icon: <Users className="h-5 w-5 text-green-500" />,
    iconBg: "bg-green-100",
    title: "Nuevo empleado registrado",
    description: "Ana García - Agente Inmobiliario",
    time: "Hace 4 horas",
  },
  {
    icon: <Calendar className="h-5 w-5 text-purple-500" />,
    iconBg: "bg-purple-100",
    title: "Cita programada",
    description: "Visita a Penthouse - Cliente: Juan Pérez",
    time: "Hace 6 horas",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
    iconBg: "bg-amber-100",
    title: "Venta completada",
    description: "Apartamento de Lujo - $450,000",
    time: "Hace 1 día",
  },
]
