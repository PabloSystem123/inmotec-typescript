import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Building, LayoutDashboard, ArrowRight, CheckCircle, Settings, BarChart3 } from "lucide-react"

export default function AdminIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#00457B]">Panel Administrativo</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard Administrativo</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Previsualización del sistema de gestión completo para Matriz Inmobiliaria
          </p>
        </div>

        {/* Quick Access */}
        <div className="mb-12">
          <Card className="border-none shadow-xl bg-gradient-to-r from-[#00457B] to-[#0066cc] text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Acceso Rápido al Dashboard</h2>
                  <p className="text-blue-100 mb-4">Explora todas las funcionalidades implementadas</p>
                  <Button asChild size="lg" className="bg-white text-[#00457B] hover:bg-gray-100">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-5 w-5" />
                      Ir al Dashboard
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="hidden md:block">
                  <LayoutDashboard className="h-24 w-24 text-white/20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Funcionalidades Implementadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Roles Management */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Gestión de Roles</CardTitle>
                <CardDescription>Sistema completo de roles y permisos granulares</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    CRUD completo con modales
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Permisos por módulo (6 módulos)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Acciones: crear, editar, eliminar, ver
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Tabla con búsqueda en tiempo real
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Alertas de confirmación
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Employee Management */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Gestión de Empleados</CardTitle>
                <CardDescription>Administración completa del personal</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Formularios completos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Campos: documento, nombre, apellido
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Correo y número de teléfono
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Estados activo/inactivo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Modales para todas las operaciones
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Property Management */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Gestión de Inmuebles</CardTitle>
                <CardDescription>Catálogo completo de propiedades</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Tarjetas visuales atractivas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />6 tipos de inmuebles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Venta y arriendo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Características completas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Carga de imágenes
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Características Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-[#00457B]" />
                  Funcionalidades del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Sidebar colapsible y responsivo</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Modales con scroll interno</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Búsqueda en tiempo real</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Alertas de confirmación</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Estados visuales con badges</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Diseño responsive completo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-[#00457B]" />
                  Dashboard Principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Métricas en tiempo real</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Actividad reciente del sistema</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Navegación por tabs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Estadísticas visuales</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Header con notificaciones</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>Accesos rápidos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Guide */}
        <div className="mb-12">
          <Card className="border-none shadow-lg bg-gray-50">
            <CardHeader>
              <CardTitle className="text-center">Guía de Navegación</CardTitle>
              <CardDescription className="text-center">Cómo explorar el dashboard administrativo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-4">
                  <div className="w-8 h-8 rounded-full bg-[#00457B] text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    1
                  </div>
                  <h4 className="font-medium mb-1">Accede al Dashboard</h4>
                  <p className="text-sm text-gray-600">Haz clic en "Ir al Dashboard"</p>
                </div>
                <div className="p-4">
                  <div className="w-8 h-8 rounded-full bg-[#00457B] text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    2
                  </div>
                  <h4 className="font-medium mb-1">Explora las Tabs</h4>
                  <p className="text-sm text-gray-600">Navega entre Resumen, Roles, Empleados e Inmuebles</p>
                </div>
                <div className="p-4">
                  <div className="w-8 h-8 rounded-full bg-[#00457B] text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    3
                  </div>
                  <h4 className="font-medium mb-1">Prueba los CRUDs</h4>
                  <p className="text-sm text-gray-600">Crea, edita, ve y elimina registros</p>
                </div>
                <div className="p-4">
                  <div className="w-8 h-8 rounded-full bg-[#00457B] text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    4
                  </div>
                  <h4 className="font-medium mb-1">Usa la Búsqueda</h4>
                  <p className="text-sm text-gray-600">Filtra resultados en tiempo real</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="border-none shadow-xl bg-gradient-to-r from-green-500 to-green-600 text-white inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">¿Listo para explorar?</h3>
              <p className="mb-6 text-green-100">
                Todas las funcionalidades están completamente implementadas y listas para usar
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-5 w-5" />
                    Explorar Dashboard
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/" className="flex items-center gap-2">
                    Volver al Sitio Principal
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
