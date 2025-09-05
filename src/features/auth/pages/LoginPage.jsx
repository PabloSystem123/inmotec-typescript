import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Building2, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/shared/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors = {}

    if (!email) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida"
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Error en el formulario",
        description: "Por favor corrige los errores antes de continuar.",
      })
      return
    }

    setIsLoading(true)
    setErrors({})

    // Simulación de autenticación
    setTimeout(() => {
      // Simulamos un error ocasional para mostrar el manejo de errores
      if (email === "error@test.com") {
        setErrors({ general: "Credenciales incorrectas. Verifica tu email y contraseña." })
        setIsLoading(false)
        toast({
          variant: "destructive",
          title: "Error de autenticación",
          description: "Las credenciales proporcionadas no son válidas.",
        })
        return
      }

      setIsLoading(false)
      setShowSuccessAlert(true)
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00457B] via-[#0066cc] to-[#0080ff] flex">
      {/* Panel izquierdo - Información */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-md text-center">
          <div className="mb-8">
            <img src="/matriz-logo-white.png" alt="Matriz Inmobiliaria" className="h-16 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Bienvenido a tu Portal Inmobiliario</h1>
            <p className="text-blue-100 text-lg">
              Gestiona tus propiedades, citas y clientes desde un solo lugar
            </p>
          </div>
          
          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">Gestión de Propiedades</span>
              </div>
              <p className="text-sm text-blue-100">Administra tu catálogo completo</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">Control de Citas</span>
              </div>
              <p className="text-sm text-blue-100">Programa y gestiona visitas</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">Seguridad Avanzada</span>
              </div>
              <p className="text-sm text-blue-100">Protección total de datos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header del formulario */}
          <div className="text-center mb-8">
            <div className="lg:hidden mb-6">
              <img src="/matriz-logo.png" alt="Matriz Inmobiliaria" className="h-12 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Hola de nuevo!</h2>
            <p className="text-gray-600">Ingresa tus credenciales para acceder a tu cuenta</p>
          </div>
          {/* Alertas */}
          {errors.general && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-1">Credenciales incorrectas</h4>
                <p className="text-sm text-red-700">{errors.general}</p>
              </div>
            </div>
          )}

          {showSuccessAlert && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">¡Bienvenido!</h4>
                <p className="text-sm text-green-700">Has iniciado sesión correctamente como administrador.</p>
              </div>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className={`h-12 pl-11 rounded-lg border-2 transition-colors ${
                      errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#00457B]"
                    } focus:ring-0`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) {
                        setErrors({ ...errors, email: undefined })
                      }
                    }}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Contraseña
                  </Label>
                  <Link to="/recuperar-password" className="text-sm text-[#00457B] hover:underline font-medium">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`h-12 pl-11 pr-11 rounded-lg border-2 transition-colors ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-[#00457B]"
                    } focus:ring-0`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) {
                        setErrors({ ...errors, password: undefined })
                      }
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Iniciar Sesión
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>

            {/* Demo credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-800 font-medium mb-2">Credenciales de prueba:</p>
              <p className="text-xs text-blue-700">Email: demo@matriz.com</p>
              <p className="text-xs text-blue-700">Contraseña: cualquier cosa</p>
              <p className="text-xs text-red-700 mt-1">Para probar error: error@test.com</p>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link to="/registro" className="text-[#00457B] font-semibold hover:underline">
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  onClick={() =>
                    toast({ title: "Próximamente", description: "Login con Google estará disponible pronto." })
                  }
                >
                  <div className="w-5 h-5 bg-red-500 rounded mr-2"></div>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  onClick={() =>
                    toast({ title: "Próximamente", description: "Login con Facebook estará disponible pronto." })
                  }
                >
                  <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                  Facebook
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 space-y-4">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className="text-[#00457B] font-semibold hover:underline">
              Regístrate gratis
            </Link>
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <Link to="/terminos" className="hover:text-gray-700">
              Términos
            </Link>
            <span>•</span>
            <Link to="/privacidad" className="hover:text-gray-700">
              Privacidad
            </Link>
            <span>•</span>
            <Link to="/soporte" className="hover:text-gray-700">
              Soporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}